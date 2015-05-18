'use strict';
/*
    AlphaBetaAI provides a strategy of computer in game when players count is only 2
 */

// use only when 2-players game !!!!!
var AlphaBetaAI = function(depth){
    BaseAI.call(this);
    this.depth = depth;
};

AlphaBetaAI.prototype = new BaseAI();
AlphaBetaAI.prototype.constructor = AlphaBetaAI;

AlphaBetaAI.prototype.evaluateMoves = function(model, moves, player, alpha, beta, depth){

    var enemyPlayer = model.getEnemy(player);
    // if not any moves
    if (moves.length == 0){
        var counts = PointCounterService.count(model.board);
        var ownCount = counts[player.color[0]];
        var enemyCount = counts[enemyPlayer.color[0]];
        var freeCount = model.countFreeCells();

        return (enemyCount + freeCount >= ownCount) ? -BIG_VALUE : BIG_VALUE;
    }

    if (depth == 0){
        Object.getPrototypeOf(AlphaBetaAI.prototype).evaluateMoves.call(this, model, player, moves);
        var bestMove = Object.getPrototypeOf(AlphaBetaAI.prototype).getBestMove.call(this, moves);

        return bestMove.value;
    }

    var score = beta;
    var modelCopy;

    for(var i = 0, count = moves.length; i <count; i++){
        modelCopy = clone(model);
        modelCopy.move(moves[i], player.color);
        var enemyMoves = modelCopy.getPossibleMovesForPlayer(enemyPlayer);
        moves[i].value = -this.evaluateMoves(modelCopy, enemyMoves, enemyPlayer, -score, -alpha, depth - 1);
        if (moves[i].value < score) {score  = moves[i].value;}
        if (score <= alpha) {
            return score;}
    }

    return score;
};

AlphaBetaAI.prototype.getBestMove = function(model, player){
    var moves = model.getPossibleMovesForPlayer(player);
    this.evaluateMoves(model, moves, player, -BIG_VALUE, BIG_VALUE, this.depth);
    return Object.getPrototypeOf(AlphaBetaAI.prototype).getBestMove.call(this, moves);
};
