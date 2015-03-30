'use strict';

var Rectangle = function(x1, y1, x2, y2){
    this.left = new Coordinates(x1, y1);
    this.right = new Coordinates(x2, y2);
    this.width = x2 - x1;
    this.height = y2 - y1;
};
