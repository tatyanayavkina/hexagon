'use strict';

var PointCounterService = function(){
};

PointCounterService.count = function(pearls){
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
};

PointCounterService.addPearlsCountToPlayer = function(points, color, count){
    points[color[0]] += count;
};
