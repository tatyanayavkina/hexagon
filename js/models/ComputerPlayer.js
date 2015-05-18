'use strict';
/*
    ComputerPlayer represents computer in game
    has 2 different strategies to find best move
    one is used when players count is 2, another -
    when players count is more than 2
 */

var ComputerPlayer = function(color, playersCount){
    this.color = color;
    if (playersCount == 2){
        this.algorithm = new AlphaBetaAI(2);
    }
    else{
        this.algorithm = new SimpleAI();
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

