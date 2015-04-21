'use strict';
// use only when 2-players game !!!!!
var AlphaBetaSolver = function(depth){
    BaseSolver.call(this);
    this.depth = depth;
};
AlphaBetaSolver.prototype = new BaseSolver();
AlphaBetaSolver.prototype.constructor = AlphaBetaSolver;

AlphaBetaSolver.prototype.evaluateMoves = function(model, moves, player, alpha, beta, depth){
    // find enemy
    // todo: find way to enemyPlayer
    var enemyPlayer = - player;
    // if not any moves
    if (Object.keys(moves.to).length == 0){
        var counts = PointCounterService.count(model.board);
        var ownCount = counts[player.color[0]];
        var enemyCount = counts[enemyPlayer.color[0]];
        var freeCount = model.countFreeCells();

        return (enemyCount + freeCount >= ownCount) ? -BIG_VALUE : BIG_VALUE;
    }

    if (depth == 0){
        Object.getPrototypeOf(AlphaBetaSolver.prototype).evaluateMoves.call(this, model, player, moves);
        var bestMove = getBestMove(moves);
        return bestMove.value;
    }

    alpha = -BIG_VALUE;
    var copy = clone(model);

};
