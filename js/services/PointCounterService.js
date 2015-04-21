'use strict';

var PointCounterService = function(){
};

PointCounterService.count = function(board){
    var points = {}, color;

    for(var i = 0, countI = this.board.length; i < countI; i++){
        for(var j = 0, countJ = this.board[i].length; j < countJ; j++){
            if(this.board[i][j] && this.board[i][j].pearl){

                color = pearls[i].color[0];
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
