'use strict';

var Coordinates = function(x,y){
    this.x = x;
    this.y = y;

    this.toString = function(){
        return (this.x + ':' + this.y);
    }
};


