'use strict';
/*
    PointerCounterService
    is used to calculate points at the current game step
 */

var PointCounterService = function(){
};

PointCounterService.count = function(board){
    var points = {}, color;

    for(var i = 0, countI = board.length; i < countI; i++){
        for(var j = 0, countJ = board[i].length; j < countJ; j++){
            if(board[i][j] && board[i][j].pearl){

                color = board[i][j].pearl.color[0];
                if (points[color]){
                    points[color] ++;
                }
                else{
                    points[color] = 1;
                }
            }
        }
    }

    return points;
};

PointCounterService.addPearlsCountToPlayer = function(points, color, count){
    points[color[0]] += count;
};
