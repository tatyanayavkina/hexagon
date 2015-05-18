'use strict';
/*
    Coordinates
 */

var Coordinates = function(x,y){
    this.x = x;
    this.y = y;

    this.toString = function(){
        return (this.x + ':' + this.y);
    }
};

Coordinates.prototype.equalCopy = function(copy){
   return (this.x == copy.x && this.y == copy.y);
};

Coordinates.prototype.copyFrom = function(copy){
  this.x = copy.x;
  this.y = copy.y;
};

