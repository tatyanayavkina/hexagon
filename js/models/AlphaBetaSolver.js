'use strict';
// use only when 2-players game !!!!!
var AlphaBetaSolver = function(depth){
    BaseSolver.call(this);
    this.depth = depth;
};
AlphaBetaSolver.prototype = new BaseSolver();
AlphaBetaSolver.prototype.constructor = AlphaBetaSolver;

AlphaBetaSolver.prototype.evaluateMoves = function(board, moves, player, alpha, beta, depth){
    // find enemy
    var enemyPlayer = - player;
    // if not any moves
    if (Object.keys(moves.to).length == 0){

        var counts = PointCounterService.count();
    }
};
