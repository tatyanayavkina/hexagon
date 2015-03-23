'use strict';

var Game = function(canvasView, hexagons, players){
    this.board = [];
    this.canvasView = canvasView;
    this.hexagons = hexagons;
    this.players = PLAYERS_CONFIG.slice(0, players);

    this.initStadium = function(pearls){
        var len;
        var x, y;
        // формируем игровую зону
        for(var i = 0; i < GAME_SIZE; i++ ){
            this.board[i] = [];
            for (var j = 0; j < GAME_SIZE; j++){
                this.board[i][j] = null;
            }
        }

        // заполняем поле шестиугольниками
        for(i = 0, len = this.hexagons.length;i < len;  i++){
            var zone = {};
            x = this.hexagons[i].place.x;
            y = this.hexagons[i].place.y;
            zone.hexagon = this.hexagons[i];
            this.board[x][y] = zone;
        }

        for(i = 0, len = pearls.length; i < len; i++){
            x = pearls[i].place.x;
            y = pearls[i].place.y;
            this.board[x][y].pearl = pearls[i];
        }

        //записываем последний ход: ходили красные, следующий ход за синими
        this.lastStep = new LastStep();
        this.currentPlayer = this.players[1];
        // формируем первоначальное количество фишек
        this.count = {};
        for(i = 0, len = this.players.length; i < len; i++){
            this.count[this.players[i].description] = this.players[i].count;
        }
        // рисуем
        this.canvasView.initGame(this.hexagons, pearls);

        //показываем статистику
        this.canvasView.insertStatistic(this.currentPlayer.color, this.count);
    };

    // возвращает количество пустых зон
    this.countFreeCells = function(){
        var count = 0;

        for(var i = 0; i < GAME_SIZE; i++ ){
            for (var j = 0; j < GAME_SIZE; j++){
                if (this.board[i][j] && !this.board[i][j].pearl){
                    count ++;
                }
            }
        }

        return count;
    };

    // обработка хода
    this.process = function(position){
       var place = this.findBoardPosition(position);
       if (!place){
           return;
       }
       var x = place.x, y = place.y;
       var newStep;
       // если это выбор фишки для перемещения
       if(this.board[x][y].pearl && this.board[x][y].pearl.color == this.currentPlayer.color){
            this.selectPearl(place);
       }

       //если это ход - ход на клетку из возможных
       if(!this.board[x][y].pearl && this.lastStep.type == MOVE_TYPES.selected && this.availableCells[place]){
           this.moveSelected(place);
       }


    };

    // по координатам места, куда кликнули мышкой,
    // ищется соответствующий шестиугольник и возвращается позиция игровой доски
    this.findBoardPosition = function(position){
        var place;

        for(var i = 0, count = this.hexagons.length; i < count; i++){
            if(this.hexagons[i].containPoint(position)){
                place = this.hexagons[i].place;
                break;
            }
        }

        return place;
    };

    // пробегается по игровой доске и находит все жемчужины
    this.getPearls = function(){
        this.pearls = [];
        for(var key in this.count){
            this.count[key] = 0;
        }

        for(var i = 0, row = this.board.length; i < row; i++){
            for (var j = 0, col =  this.board[i].length; j < col; j++){
                if(this.board[i][j] && this.board[i][j].pearl){
                    this.pearls.push(this.board[i][j].pearl);
                    //считаем очки
                    for(var k = 0, playersCount = this.players.length; k < playersCount; k++){
                        if(this.board[i][j].pearl.color == this.players[k].color){
                            this.count[this.players[k].description] ++;
                        }
                    }
                }
            }
        }
    };

    // пробегаемся по шестиугольникам и удаляем у них цвета, если есть
    this.clearHexagonColor = function(){

        for(var i = 0, row = this.board.length; i < row; i++){
            for (var j = 0, col =  this.board[i].length; j < col; j++){
                if(this.board[i][j] && this.board[i][j].hexagon){
                    delete this.board[i][j].hexagon.color;
                }
            }
        }

    };

    // проверка, что не вышли за границы доски
    this.inBoard = function(place){
        var x = place.x, y = place.y;
        return (x >= 0 && x < this.board.length && y >= 0 && y < this.board[0].length)
    };

    // поиск возможных ходов для размножения
    this.getAvailableCells = function(place){
        this.availableCells = {};
        var  newPlace, affected;

        var hexagon = addPropertyToObject(this.board[place.x][place.y].hexagon, {color: POSITIONS.jump.color});
        this.availableHexagons = [hexagon];

        for(var key in POSITIONS){
            for(var i = 0, count = POSITIONS[key].positions.length, positions = POSITIONS[key].positions; i <count; i++){
                newPlace = new Coordinates(place.x + positions[i].x, place.y + positions[i].y);

                if(this.inBoard(newPlace) &&  this.board[newPlace.x][newPlace.y] && !this.board[newPlace.x][newPlace.y].pearl){
                    affected = this.getAffectedCells(newPlace);
                    this.availableCells[newPlace] = new MoveCell(this.board[newPlace.x][newPlace.y].hexagon,POSITIONS[key].type, affected);
                    this.availableHexagons.push(addPropertyToObject(this.board[newPlace.x][newPlace.y].hexagon, {color: POSITIONS[key].color}));
                }
            }
        }
    };

    // поиск ячеек, в которых будет перекрашивание жемчужин
    this.getAffectedCells = function(place){
        var placeX, placeY, affected = [];

        for(var i = 0, count = POSITIONS.copy.positions.length; i <count; i++){
            placeX = place.x + POSITIONS.copy.positions[i].x;
            placeY = place.y + POSITIONS.copy.positions[i].y;

            if(this.inBoard(new Coordinates(placeX, placeY)) && this.board[placeX][placeY] && this.board[placeX][placeY].pearl && this.board[placeX][placeY].pearl.color != this.currentPlayer.color){
                affected.push(new Coordinates(placeX, placeY));
            }
        }

        return affected;
    };

    //перекрашивание жемчужин
    this.reColorPearls = function(positions){
        var place;

        for(var i = 0, count = positions.length; i < count; i++){
            place = positions[i];
            this.board[place.x][place.y].pearl.color = this.currentPlayer.color;
        }
    };

    // обработка выбора жемчужины для хода
    this.selectPearl = function(place){
        //ткнули на ту же фишку - нужно отменить выделение фишки
        if(this.lastStep.isSame(place)){
            this.lastStep = new LastStep(this.currentPlayer, MOVE_TYPES.unselected, place);
            this.canvasView.drawSelected([]);
            return;
        }

        this.lastStep = new LastStep(this.currentPlayer, MOVE_TYPES.selected, place);
        this.getAvailableCells(place);
        this.canvasView.drawSelected(this.availableHexagons);
        this.clearHexagonColor();
    };

    // совершение хода для выбранной жемчужины
    this.moveSelected = function(place){
        var hexagon = this.board[place.x][place.y].hexagon;
        this.board[place.x][place.y].pearl = new Pearl(hexagon.center, hexagon.radius, hexagon.place, this.lastStep.player.color);

        if(this.availableCells[place].type == POSITIONS.jump.type){
            var deletedPlace = this.lastStep.place;
            delete this.board[deletedPlace.x][deletedPlace.y].pearl;
        }

        this.reColorPearls(this.availableCells[place].affected);
        this.getPearls();
        this.canvasView.drawPearls(this.pearls);
        this.changePlayer();

        this.postMoveSelected();
    };

    // пост обработка хода жемчужины
    this.postMoveSelected = function(){
        // нет свободных клеток
        if(!this.countFreeCells()){
            this.canvasView.insertGameOver(this.count);
            return;
        }
        // нет ходов у текущего игрока
        if(!this.playerHasMoveCells()){
            this.whenPlayerHasNoMoves();
            return;
        }
        // игра продолжается
        this.canvasView.insertStatistic(this.currentPlayer.color, this.count);
    };

    // переход хода
    this.changePlayer = function(){
        // находим индекс следующего игрока в массиве
        var index = this.players.indexOf(this.currentPlayer) + 1;
        //если вышли за пределы, возвращаемся к началу
        if(index == this.players.length){
            index = 0;
        }
        this.currentPlayer = this.players[index];
    };

    // проверка - у игрока есть возможность хода
    this.playerHasMoveCells = function(){
        var has = false;

        for( var i = 0, count = this.pearls.length; i < count; i++ ){
           if(this.pearls[i].color == this.currentPlayer.color){
               this.getAvailableCells(this.pearls[i].place);

               if (Object.keys(this.availableCells).length > 0){
                   has = true;
                   break;
               }
           }
        }

        return has;
    };

    // выполняется, если у игрока нет ходов, а свободные клетки еще есть
    this.whenPlayerHasNoMoves = function(){
            var index = this.players.indexOf(this.currentPlayer);
            this.changePlayer();
            //если сейчас больше 2-х игроков, то игрок, у которого нет ходов, удаляется из списка
            if(this.players.length > 2){
                this.players.splice(index, 1);
                this.postMoveSelected();
                return;
            }
            this.addPearlsCountToPlayer();
            this.timeoutDraw();

            this.canvasView.insertGameOver(this.count);
    };

    //добавляет очки текущему игроку (очки - количество пустых клеток на поле)
    this.addPearlsCountToPlayer = function(){
        var color = this.currentPlayer.description;
        this.count[color] += this.countFreeCells();
    };

    // ищет пустые клетки и заполняет их жемчужинами текущего игрока
    this.timeoutDraw = function(){
        var hexagons = [];
        for(var i = 0; i < GAME_SIZE; i++ ){
            for (var j = 0; j < GAME_SIZE; j++){
                if (this.board[i][j] && !this.board[i][j].pearl){
                    hexagons.push(this.board[i][j].hexagon);
                }
            }
        }

        var pearls = [];

        for(i = 0; i < hexagons.length; i++){
            pearls.push(new Pearl(hexagons[i].center, hexagons[i].radius, hexagons[i].place, this.currentPlayer.color) );
        }
        // поочередная отрисовка жемчужин в произвольном порядке
        this.canvasView.drawPearlsTimeout(pearls);
    }
};
