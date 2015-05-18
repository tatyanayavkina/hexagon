'use strict';

/*
    SimpleAI provides a strategy of computer in game when players count is more than 2
 */

var SimpleAI = function(){
    BaseAI.call(this);
};

SimpleAI.prototype = new BaseAI();
SimpleAI.prototype.constructor = SimpleAI;


SimpleAI.prototype.getBestMove = function(model, player){
    var moves = model.getPossibleMovesForPlayer(player);
    Object.getPrototypeOf(SimpleAI.prototype).evaluateMoves.call(this, model, player, moves);
    return Object.getPrototypeOf(SimpleAI.prototype).getBestMove.call(this, moves);
};
