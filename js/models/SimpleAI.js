'use strict';
// use only when 2-players game !!!!!
var SimpleSolver = function(){
    BaseSolver.call(this);
};

SimpleSolver.prototype = new BaseSolver();
SimpleSolver.prototype.constructor = SimpleSolver;


SimpleSolver.prototype.getBestMove = function(model, player){
    var moves = model.getPossibleMovesForPlayer(player);
    Object.getPrototypeOf(SimpleSolver.prototype).evaluateMoves.call(this, model, player, moves);
    return Object.getPrototypeOf(SimpleSolver.prototype).getBestMove.call(this, moves);
};
