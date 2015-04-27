'use strict';

var GameModel = function(){
    this.board = [];
    this.hexagons = [];
    this.pearls = [];
    this.players = PLAYERS_CONFIG.slice(0,2);
    this.computerPlays = false;

    this.initHexagons = function(){
        var startX = START_POINT.x, startY = START_POINT.y;
        var hexagon, place, active;

        for(var i = 0, row = HEXAGON_ROW_COUNT.length; i< row; i++){
            if(HEXAGON_ROW_COUNT[i-1] && HEXAGON_ROW_COUNT[i-1] < HEXAGON_ROW_COUNT[i]){
                startX = startX - (Math.sqrt(3)/2) * SIZE;
            }
            else{
                startX = startX + (Math.sqrt(3)/2) * SIZE;
            }

            startY = startY + 1.5*SIZE;

            for(var j = 0; j < HEXAGON_ROW_COUNT[i]; j++){
                place = new Coordinates(i, j + MATRIX_TRANSLATION[i]);
                active = ( j > 0 && j < HEXAGON_ROW_COUNT[i] - 1);
                hexagon = new Hexagon(new Coordinates(startX + Math.sqrt(3)*j*SIZE, startY), SIZE, place, active);

                this.hexagons.push(hexagon);
            }
        }
    };

    this.initPearls = function(){
        var  index, hexagon, pearl, count;
        var hexagons = this.hexagons.slice();//копирование без ссылок

        for(var i = 0, len = this.players.length; i < len; i++){
            for( var j = 0; j < this.players[i].count; j++){
                count = hexagons.length;
                index = Math.floor(Math.random()* count);
                hexagon = hexagons[index];

                pearl = new Pearl(hexagon);
                pearl.color = this.players[i].color;
                this.pearls.push(pearl);

                hexagons.splice(index, 1);
            }
        }
    };

    this.initBoard = function(){
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

        for(i = 0, len = this.pearls.length; i < len; i++){
            x = this.pearls[i].place.x;
            y = this.pearls[i].place.y;
            this.board[x][y].pearl = this.pearls[i];
        }
    };

    this.reduceHexagons =function(){
        var count = this.hexagons.length;

        for(var i = count - 1; i >= 0; i--){
            if( !this.hexagons[i].active){
                this.hexagons.splice(i, 1);
            }
        }
    };

    this.findPearlIndexByPoint = function(point){
        var index = -1;
        for (var i = 0, count = this.pearls.length; i < count; i++) {
            if (this.pearls[i].containPoint(point)) {
                index = i;
                break;
            }
        }

        return index;
    };

    this.findHexagonByPoint = function(point){
        var hexagon = null;
        for(var i = 0, count = this.hexagons.length; i < count; i++){
            if (this.hexagons[i].containPoint(point)){
                hexagon = this.hexagons[i];
                break;
            }
        }

        return hexagon;
    };

    this.findPlaceByHexagon = function(hexagon){
        var place = hexagon.place;
        var found = false;

        for(var i = 0, count = this.pearls.length; i < count; i++){
            if(this.pearls[i].place.equalCopy(place)){
                found = true;
                break;
            }
        }

        return found;
    };

    this.findBoardPlaceByPoint = function(point){
        var place = null;

        for(var i = 0, count = this.hexagons.length; i < count; i++){
            if(this.hexagons[i].containPoint(point)){
                place = this.hexagons[i].place;
                break;
            }
        }

        return place;
    };

    this.hasPearl = function(place){
        return this.board[place.x][place.y].pearl? true : false;
    };

    // проверка, что не вышли за границы доски
    this.inBoard = function(place){
        var x = place.x, y = place.y;
        return  (x >= 0 && x < this.board.length && y >= 0 && y < this.board[0].length && this.board[x][y]);
    };


    this.getMoves = function(pearl){
        var  newPlace, affected;
        var  availableMoves = {};
        var place = pearl.place;

        var hexagon = clone(this.board[place.x][place.y].hexagon);
        hexagon.color = POSITIONS.jump.color;
        availableMoves.hexagons = [hexagon];
        availableMoves.to = {};

        for(var key in POSITIONS){
            for(var i = 0, count = POSITIONS[key].positions.length, positions = POSITIONS[key].positions; i <count; i++){
                newPlace = new Coordinates(place.x + positions[i].x, place.y + positions[i].y);

                if(this.inBoard(newPlace) && !this.hasPearl(newPlace)){
                    affected = this.getAffectedPearls(newPlace, pearl.color);
                    availableMoves.to[newPlace] = new Move(pearl.place, this.board[newPlace.x][newPlace.y].hexagon, POSITIONS[key].type, affected);
                    hexagon = clone(this.board[newPlace.x][newPlace.y].hexagon);
                    hexagon.color = POSITIONS[key].color;

                    availableMoves.hexagons.push(hexagon);
                }
            }
        }

        return availableMoves;
    };

    this.getAffectedPearls = function(place, color){
        var placeX, placeY, newPlace, affected = [];

        for(var i = 0, count = POSITIONS.copy.positions.length; i <count; i++){
            placeX = place.x + POSITIONS.copy.positions[i].x;
            placeY = place.y + POSITIONS.copy.positions[i].y;

            newPlace = new Coordinates(placeX, placeY);

            if(this.inBoard(newPlace) && this.hasPearl(newPlace) && this.board[newPlace.x][newPlace.y].pearl.color != color){
                affected.push(newPlace);
            }
        }

        return affected;
    };

    this.addPearlToBoard = function(pearl){
        var place = pearl.place;
        this.board[place.x][place.y].pearl = pearl;
    };

    this.recolorPearls = function(positions, color){
        var place, recolored = [];

        for(var i = 0, count = positions.length; i < count; i++){
            place = positions[i];
            this.board[place.x][place.y].pearl.color = color;
            recolored.push(this.board[place.x][place.y].pearl);
        }
        return recolored;
    };


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

    // проверка - у игрока есть возможность хода
    this.playerHasMoves = function(player){
        var has = false; var moves;

        for( var i = 0, count = this.pearls.length; i < count; i++ ){
            if(this.pearls[i].color == player.color){
                moves = this.getMoves(this.pearls[i]);

                if (Object.keys(moves.to).length > 0){
                    has = true;
                    break;
                }
            }
        }

        return has;
    };

    this.createPearls = function(color){
        var pearl, pearls = [];
        for(var i = 0; i < GAME_SIZE; i++ ){
            for (var j = 0; j < GAME_SIZE; j++){
                if (this.board[i][j] && !this.board[i][j].pearl){
                    pearl = (new Pearl(this.board[i][j].hexagon));
                    pearl.color = color;
                    pearls.push(pearl);
                }
            }
        }

        return pearls;
    };

    this.findBestPearlMove = function(moves){
        var bestMove = {};

        for(var key in moves){
            if (key != 'hexagons'){
                if(Object.keys(bestMove).length == 0 || moves[key].affected.length > bestMove.affected.length){
                    bestMove = moves[key];
                }
            }
        }

        return bestMove;
    };

    this.move = function(moveCell, color){
        var newPearl = new Pearl(moveCell.hexagon);
        newPearl.color = color;
        this.addPearlToBoard(newPearl);
        var recolored = this.recolorPearls(moveCell.affected, color);

        var deleted = null;
        // if moveType is "jump", delete old pearl
        if (moveCell.type == POSITIONS.jump.type) {
            // находим позицию удаляемой жемчужины
            var deletedPlace = moveCell.from;
            deleted = new Pearl(this.board[deletedPlace.x][deletedPlace.y].hexagon);
            deleted.getRectangle();
            // удаляем ее из списка
            delete this.board[deletedPlace.x][deletedPlace.y].pearl;
        }

        return {pearl: newPearl , recolored: recolored, deleted: deleted};
    };

    //return count of pearls with color
    this.getValue = function(player){
        var enemyPlayer = this.getEnemy(player);
        var counts = PointCounterService.count(this.board);
        var ownCount = counts[player.color[0]];
        var enemyCount = counts[enemyPlayer.color[0]];
        return ownCount > 0 ? ownCount - enemyCount : -BIG_VALUE;
    };

    this.getEnemy = function(player){
        for(var i = 0, count = this.players.length; i < count; i++){
            if( player.color[0] == this.players[i].color[0]){
                var ind = i + 1;
                if (ind == count){
                    ind = 0;
                }
            }
        }

        return this.players[ind];
    };

    this.getPossibleMovesForPlayer = function(player){
        var pearlMoves, moves = [];
        for(var i = 0, countI = this.board.length; i < countI; i++ ){
            for (var j = 0, countJ = this.board[i].length; j < countJ; j++){
                if(this.board[i][j] && this.board[i][j].pearl && this.board[i][j].pearl.color[0] == player.color[0]){
                    pearlMoves = this.getMoves(this.board[i][j].pearl);
                    if(Object.keys(pearlMoves.to).length > 0 ){
                        moves = moves.concat(objToArray(pearlMoves.to));
                    }
                }
            }
        }

        return moves;
    };



};
