'use strict';

var Coordinates = function(x,y){
    this.x = x;
    this.y = y;

    this.toString = function(){
        return (this.x + ':' + this.y);
    }
};

Coordinates.prototype.equal = function(point){
    return (this.x == point.x) && (this.y == point.y);
};

