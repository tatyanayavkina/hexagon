'use strict';

var ComputerPlayer = function(color, playersCount){
    this.color = color;
    if (playersCount == 2){
        this.algorithm = new AlphaBetaSolver(2);
    }
    else{
        this.algorithm = new SimpleSolver();
    }
};

ComputerPlayer.prototype.findMove = function(gameModel) {
    var selectedPearl, selectedHexagon, pearlMoves, pearlHexagons;

    var bestMove = this.algorithm.getBestMove(gameModel, this);
    selectedPearl = gameModel.board[bestMove.from.x][bestMove.from.y].pearl;
    pearlMoves = gameModel.getMoves(selectedPearl);
    pearlHexagons = pearlMoves.hexagons;

    return {best: bestMove, pearl: selectedPearl, hexagons: pearlHexagons};
};

