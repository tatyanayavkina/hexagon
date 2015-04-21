'use strict';
// use only when 2-players game !!!!!
var AlphaBetaSolver = function(depth){
    BaseSolver.call(this);
    this.depth = depth;
};
AlphaBetaSolver.prototype = new BaseSolver();
AlphaBetaSolver.prototype.constructor = AplhaBetaSolver;

AlphaBetaSolver.prototype.evaluateMoves = function(board, moves, player, alpha, beta, depth){

};
