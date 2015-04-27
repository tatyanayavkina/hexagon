'use strict';
// use only when 2-players game !!!!!
var AlphaBetaSolver = function(depth){
    BaseSolver.call(this);
    this.depth = depth;
};

AlphaBetaSolver.prototype = new BaseSolver();
AlphaBetaSolver.prototype.constructor = AlphaBetaSolver;

AlphaBetaSolver.prototype.evaluateMoves = function(model, moves, player, alpha, beta, depth){

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
        Object.getPrototypeOf(AlphaBetaSolver.prototype).evaluateMoves.call(this, model, player, moves);
        var bestMove = Object.getPrototypeOf(AlphaBetaSolver.prototype).getBestMove.call(this, moves);

        return bestMove.value;
    }

    var score = beta;
    var modelCopy;

    for(var i = 0, count = moves.length; i <count; i++){
        modelCopy = clone(model);
        modelCopy.move(moves[i], player.color);
        var enemyMoves = modelCopy.getPossibleMovesForPlayer(enemyPlayer);
        moves[i].value = -this.evaluateMoves(modelCopy, enemyMoves, enemyPlayer, -score, -alpha, depth - 1);
        console.log('alpha',alpha);
        if (moves[i].value < score) {score  = moves[i].value;}
        if (score <= alpha) {
            console.log('this return!!!!!');
            return score;}
    }

    return score;
};

AlphaBetaSolver.prototype.getBestMove = function(model, player){
    var moves = model.getPossibleMovesForPlayer(player);
    this.evaluateMoves(model, moves, player, -BIG_VALUE, BIG_VALUE, this.depth);
    return Object.getPrototypeOf(AlphaBetaSolver.prototype).getBestMove.call(this, moves);
};
