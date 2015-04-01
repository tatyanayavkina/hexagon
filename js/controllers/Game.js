'use strict';

var PearlsConstructor = function(view, model, pageConstructor){

    this.init = function(view, model, pageConstructor){
        GameController.call(this, view, model, pageConstructor);
        this.currentPlayer = this.model.players[1];
        this.availableMoves = {};

        this.process();
    };

    this.process = function(){
        this.model.initBoard();
        //вставить статистику ...
        this.setHandlerOnCanvasMouseDown(this.handlerCanvasClicked.bind(this));
    };

    this.handlerCanvasClicked = function(point){
        var place = this.model.findBoardPlaceByPoint(point);

        if(!place){
            return;
        }

        if(this.model.hasPearl(place)){
            this.handlerPearlClicked(this.model.board[place.x][place.y].pearl);
        }
        else{
            this.handlerHexagonClicked(this.model.board[place.x][place.y].hexagon);
        }
    };

    this.handlerPearlClicked = function(pearl) {
        pearl = clone(pearl);

        if (this.currentPlayer.color != pearl.color) {
            // можно было бы потенциально противный звук издавать
            return;
        }

        if (this.selectedPearl == pearl) {
            this.selectedPearl = null;
            this.availableMoves = {};
            this.view.showMoves();
        } else {
            this.selectedPearl = pearl;
            this.availableMoves = this.model.getMoves(pearl);
            this.view.showMoves(this.availableMoves.hexagons);
        }
    };

    this.handlerHexagonClicked = function(hexagon) {
        if (this.selectedPearl == null) {
            return;
        }

        var currentMoving = this.availableMoves[hexagon.place];
        if (!currentMoving) {
            return;
        }

        var pearl = new Pearl(hexagon);
        pearl.color = this.currentPlayer.color;

        var deleted;
        if (currentMoving.type == POSITIONS.jump.type) {
            // находим позицию удаляемой жемчужины
            var deletedPlace = this.selectedPearl.place;
            deleted = new Pearl(this.model.board[deletedPlace.x][deletedPlace.y]);
            deleted.getRectangle();
            // удаляем ее из списка
            delete this.board[deletedPlace.x][deletedPlace.y].pearl;
        }

        this.view.showStep(pearl,this.recolorPearls(currentMoving.affected), deleted);
        this.changePlayer();

        this.selectedPearl = null;
        // подсчитать очки
        // проверить на возможность продолжения игры
        this.postMove();
    };

    this.postMove = function(){
        // нет свободных клеток
        if(!this.model.countFreeCells()){
            this.page.insertGameOver(this.count);
            return;
        }
        // нет ходов у текущего игрока
        if(!this.model.playerHasMoves()){
            this.whenPlayerHasNoMoves();
            return;
        }
        // игра продолжается
        this.page.insertStatistic(this.currentPlayer.color, this.count);
    };

    this.whenPlayerHasNoMoves = function(){
        var index = this.model.players.indexOf(this.currentPlayer);
        this.changePlayer();
        //если сейчас больше 2-х игроков, то игрок, у которого нет ходов, удаляется из списка
        if(this.model.players.length > 2){
            this.model.players.splice(index, 1);
            this.postMove();
            return;
        }
        //this.addPearlsCountToPlayer();
        //this.timeoutDraw();

        this.view.insertGameOver(this.count);  
    };

    this.changePlayer = function(){
        // находим индекс следующего игрока в массиве
        var index = this.model.players.indexOf(this.currentPlayer) + 1;
        //если вышли за пределы, возвращаемся к началу
        if(index == this.model.players.length){
            index = 0;
        }
        this.currentPlayer = this.model.players[index];
    };

    this.init(view, model, pageConstructor);
};

PearlsConstructor.prototype = GameController;
