'use strict';

var PointCounterService = function(){

    this.count = function(pearls){
        var points = {}, color;

        for( var i = 0, count = pearls.length; i < count; i++){
            color = pearls[i].color[0];
            if (points[color]){
                points[color] ++;
            }
            else{
                points[color] = 1;
            }
        }
        return points;
    }
};
