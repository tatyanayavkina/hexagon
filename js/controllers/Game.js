'use strict';

var Game = function(view, model, pageConstructor){
    GameController.call(this, view, model, pageConstructor);
    this.pointCounterService = new PointCounterService();
    this.points = {};
    this.currentPlayer = this.model.players[0];
    this.availableMoves = {};
    this.computer = null;

    if (this.model.computerPlays){
        this.computer = new ComputerPlayer(this.model.players[this.model.players.length - 1].color);
    }
};

Game.prototype = new GameController();
Game.prototype.constructor = Game;

Game.prototype.process = function(){
    var page = this.pageConstructor.createPageGamePlay();
    this.pageConstructor.insertPage(page);

    Object.getPrototypeOf(Game.prototype).process.call(this);

    this.points = this.pointCounterService.count(this.model.pearls);
    this.postMove();
};

Game.prototype.handlerPearlClicked = function(pearl) {

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

Game.prototype.handlerHexagonClicked = function(hexagon) {
    if (this.selectedPearl == null) {
        return;
    }

    var currentMoving = this.availableMoves[hexagon.place];
    if (!currentMoving) {
        return;
    }

    var pearl = new Pearl(hexagon);
    pearl.color = this.currentPlayer.color;
    this.model.addPearlToBoard(pearl);

    var deleted;
    if (currentMoving.type == POSITIONS.jump.type) {
        // находим позицию удаляемой жемчужины
        var deletedPlace = this.selectedPearl.place;
        deleted = new Pearl(this.model.board[deletedPlace.x][deletedPlace.y].hexagon);
        deleted.getRectangle();
        // удаляем ее из списка
        delete this.model.board[deletedPlace.x][deletedPlace.y].pearl;
    }

    // обновили массив фишек
    this.model.refreshPearls();
    // отрисовали ход
    this.view.showStep(pearl,this.model.recolorPearls(currentMoving.affected, this.currentPlayer.color), deleted);
    this.changePlayer();

    delete this.selectedPearl;
    // подсчитать очки
    this.points = this.pointCounterService.count(this.model.pearls);
    // проверить на возможность продолжения игры
    this.postMove();
};

Game.prototype.postMove = function(){
    // нет свободных клеток
    if(!this.model.countFreeCells()){
        this.pageConstructor.insertGameOver(this.points);
        return;
    }
    // нет ходов у текущего игрока
    if(!this.model.playerHasMoves(this.currentPlayer)){
        this.whenPlayerHasNoMoves();
        return;
    }
    // игра продолжается
    this.pageConstructor.insertStatistic(this.currentPlayer.color, this.points, this.computer);

    //если играет компьютер нужно, выполнить ход, обновить статистику, сменить игрока, отрисовать ход, -> сделать имитацию клика????
    if (this.computer && this.currentPlayer.color == this.computer.color){
        this.computer.makeMove(this.model);
    }
};

Game.prototype.whenPlayerHasNoMoves = function(){
    var index = this.model.players.indexOf(this.currentPlayer);
    this.changePlayer();
    //если сейчас больше 2-х игроков, то игрок, у которого нет ходов, удаляется из списка
    if(this.model.players.length > 2){
        this.model.players.splice(index, 1);
        this.postMove();
        return;
    }
    this.pointCounterService.addPearlsCountToPlayer(this.points, this.currentPlayer.color, this.model.countFreeCells());
    this.timeoutDraw();

    this.pageConstructor.insertGameOver(this.points);
};

Game.prototype.timeoutDraw = function(){
    var pearls = this.model.createPearls(this.currentPlayer.color);
    this.view.drawPearlsTimeout(pearls);
};

Game.prototype.changePlayer = function(){
    // находим индекс следующего игрока в массиве
    var index = this.model.players.indexOf(this.currentPlayer) + 1;
    //если вышли за пределы, возвращаемся к началу
    if(index == this.model.players.length){
        index = 0;
    }
    this.currentPlayer = this.model.players[index];
};
