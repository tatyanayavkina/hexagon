'use strict';

var Game = function(view, model, pageConstructor){
    GameController.call(this, view, model, pageConstructor);
    this.points = {};
    this.currentPlayer = this.model.players[0];
    this.availableMoves = {};
    this.computer = null;

    if (this.model.computerPlays){
        this.computer = new ComputerPlayer(this.model.players[this.model.players.length - 1].color, this.model.players.length);
        this.model.players[this.model.players.length - 1] = this.computer;
    }
};

Game.prototype = new GameController();
Game.prototype.constructor = Game;

Game.prototype.process = function(){
    var page = this.pageConstructor.createPageGamePlay();
    this.pageConstructor.insertPage(page);

    Object.getPrototypeOf(Game.prototype).process.call(this);

    this.points = PointCounterService.count(this.model.board);
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

    var currentMoving = this.availableMoves.to[hexagon.place];
    if (!currentMoving) {
        return;
    }

    // make move
    var move = this.model.move(currentMoving, this.currentPlayer.color);
    // paint move
    this.view.showStep(move.pearl, move.recolored , move.deleted);
    delete this.selectedPearl;
    this.changePlayer();
    // check if game can be continued
    this.postMove();
};

Game.prototype.postMove = function(){
    // count scores
    this.points = PointCounterService.count(this.model.board);

    // no free cells in board
    if(!this.model.countFreeCells()){
        this.pageConstructor.insertGameOver(this.points);
        return;
    }
    // currentPlayer has no moves
    if(!this.model.playerHasMoves(this.currentPlayer)){
        this.whenPlayerHasNoMoves();
        return;
    }
    // game continue
    this.pageConstructor.insertStatistic(this.currentPlayer.color, this.points, this.computer);

    //если играет компьютер нужно, выполнить ход, обновить статистику, сменить игрока, отрисовать ход, -> сделать имитацию клика????
    if (this.computer && this.currentPlayer.color == this.computer.color) {
        var computerMove;

        this.pageConstructor.changeBlockingDivState(true);
        computerMove = this.computer.findMove(this.model);
        this.makeComputerMove(computerMove);
    }
};

Game.prototype.whenPlayerHasNoMoves = function(){
    var index = this.model.players.indexOf(this.currentPlayer);
    this.changePlayer();
    // if there is more than 2 players, then delete "player with no moves" from playerList
    if(this.model.players.length > 2){
        this.model.players.splice(index, 1);
        this.postMove();
        return;
    }
    PointCounterService.addPearlsCountToPlayer(this.points, this.currentPlayer.color, this.model.countFreeCells());
    this.timeoutDraw();

    this.pageConstructor.insertGameOver(this.points);
};

Game.prototype.timeoutDraw = function(){
    var pearls = this.model.createPearls(this.currentPlayer.color);
    this.view.drawPearlsTimeout(pearls);
};

Game.prototype.changePlayer = function(){
    // find next player index in array
    var index = this.model.players.indexOf(this.currentPlayer) + 1;
    // if index is more than array length then index will be 0
    if(index == this.model.players.length){
        index = 0;
    }
    this.currentPlayer = this.model.players[index];
};

Game.prototype.makeComputerMove = function(computerMove){
    var self = this;
    setTimeout(function(){self.view.showMoves(computerMove.hexagons)}, 1000);
    setTimeout(
        function(){
            var move = self.model.move(computerMove.best, self.computer.color);
            self.view.showStep(move.pearl, move.recolored , move.deleted);
            self.changePlayer();
            self.postMove();
            self.pageConstructor.changeBlockingDivState(false);
        }, 2000);

};