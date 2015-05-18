'use strict';
/*
    BaseAI is a base class for computer strategies
    provides common used methods
 */

var BaseAI = function(){

};

BaseAI.prototype.evaluateMoves = function(model, player, moves){
    var baseValue = model.getValue(player);

    for(var i = 0, count = moves.length; i <count; i++){
        moves[i].value = baseValue + moves[i].affected.length;
    }
};

BaseAI.prototype.getBestMove = function(moves){
    var bestMove = null;
    var bestValue = -BIG_VALUE;
    var bests = [];

    for(var i = 0, count = moves.length; i <count; i++){
        if(moves[i].value > bestValue){
            bestValue = moves[i].value;
            bests = [];
            bests.push(moves[i]);
        }
        else if(moves[i].value == bestValue){
            bests.push(moves[i]);
        }
    }

    if(bests.length > 0){
        var ind = Math.floor(Math.random() * bests.length);
        bestMove = bests[ind];
    }
    return bestMove;
};