'use strict';

var Game = function(){
    this.board = [];
    this.view = new View();
    this.hexagons = HexagonFactory();

    this.initStadium = function(){
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
        // заполняем поле жемчужинами
        var pearls = PearlsFactory(this.board);
        for(i = 0, len = pearls.length; i < len; i++){
            x = pearls[i].place.x;
            y = pearls[i].place.y;
            this.board[x][y].pearl = pearls[i];
        }

        //записываем последний ход: ходили красные, следующий ход за синими
        this.lastStep = new LastStep();
        this.currentPlayer = COLOR.BLUE;
        this.count = {
            red: START_COUNT.RED.length,
            blue: START_COUNT.BLUE.length
        };

        // рисуем
        this.view.initView(this.hexagons, pearls);

        //показываем статистику
        this.view.insertStatistic(this.currentPlayer, this.count);
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
       if(this.board[x][y].pearl && this.board[x][y].pearl.color == this.currentPlayer){
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
        this.count.red = 0; this.count.blue = 0;
        for(var i = 0, row = this.board.length; i < row; i++){
            for (var j = 0, col =  this.board[i].length; j < col; j++){
                if(this.board[i][j] && this.board[i][j].pearl){
                    this.pearls.push(this.board[i][j].pearl);
                    //считаем очки
                    this.board[i][j].pearl.color == COLOR.RED ? this.count.red++ : this.count.blue++;
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

            if(this.inBoard(new Coordinates(placeX, placeY)) && this.board[placeX][placeY] && this.board[placeX][placeY].pearl && this.board[placeX][placeY].pearl.color != this.currentPlayer){
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
            this.board[place.x][place.y].pearl.color = this.currentPlayer;
        }
    };

    // обработка выбора жемчужины для хода
    this.selectPearl = function(place){
        //ткнули на ту же фишку - нужно отменить выделение фишки
        if(this.lastStep.isSame(place)){
            this.lastStep = new LastStep(this.currentPlayer, MOVE_TYPES.unselected, place);
            this.view.drawSelected([]);
            return;
        }

        this.lastStep = new LastStep(this.currentPlayer, MOVE_TYPES.selected, place);
        this.getAvailableCells(place);
        this.view.drawSelected(this.availableHexagons);
        this.clearHexagonColor();
    };

    // совершение хода для выбранной жемчужины
    this.moveSelected = function(place){
        var hexagon = this.board[place.x][place.y].hexagon;
        this.board[place.x][place.y].pearl = new Pearl(hexagon.center, hexagon.radius, hexagon.place, this.lastStep.player);

        if(this.availableCells[place].type == POSITIONS.jump.type){
            var deletedPlace = this.lastStep.place;
            delete this.board[deletedPlace.x][deletedPlace.y].pearl;
        }

        this.reColorPearls(this.availableCells[place].affected);
        this.getPearls();
        this.view.drawPearls(this.pearls);
        this.changePlayer();

        if(!this.countFreeCells() || !this.playerHasMoveCells()){
            this.whenPlayerHasNoMoves();
            this.view.insertGameOver(this.count);
        }
        else{
            this.view.insertStatistic(this.currentPlayer, this.count);
        }
    };

    // переход хода
    this.changePlayer = function(){
        switch(this.currentPlayer){
            case COLOR.RED:
                this.currentPlayer = COLOR.BLUE;
                break;
            case COLOR.BLUE:
                this.currentPlayer = COLOR.RED;
                break;
            default:
                console.log('unexpected error');
        }
    };

    // проверка - у игрока есть возможность хода
    this.playerHasMoveCells = function(){
        var has = false;

        for( var i = 0, count = this.pearls.length; i < count; i++ ){
           if(this.pearls[i].color == this.currentPlayer){
               this.getAvailableCells(this.pearls[i].place);

               if (Object.keys(this.availableCells).length > 0){
                   has = true;
                   break;
               }
           }
        }

        return has;
    };

    // выполняется, если у игрока нет ходов, а свобоные клетки еще есть
    this.whenPlayerHasNoMoves = function(){
        if(this.countFreeCells()){
            this.changePlayer();
            this.addPearlsCountToPlayer();
            this.timeoutDraw();
        }
    };

    //добавляет очки текущему игроку (очки - количество пустых клеток на поле)
    this.addPearlsCountToPlayer = function(){
        switch(this.currentPlayer){
            case COLOR.RED:
                this.count.red += this.countFreeCells();
                break;
            case COLOR.BLUE:
                this.count.blue += this.countFreeCells();
                break;
            default:
                console.log('unexpected error');
        }
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
            pearls.push(new Pearl(hexagons[i].center, hexagons[i].radius, hexagons[i].place, this.currentPlayer) );
        }
        // поочередная отрисовка жемчужин в произвольном порядке
        this.view.drawPearlsTimeout(pearls);
    }
};
