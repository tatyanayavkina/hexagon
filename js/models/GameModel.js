'use strict';

var GameModel = function(){
    this.board = [];
    this.hexagons = [];
    this.pearls = [];

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

        for(var i = 0; i < players; i++){
            for( var j = 0; j < PLAYERS_CONFIG[i].count; j++){
                count = hexagons.length;
                index = Math.floor(Math.random()* count);
                hexagon = hexagons[index];

                pearl = new Pearl(hexagon.center, hexagon.radius, hexagon.place, PLAYERS_CONFIG[i].color);
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
    }
};
