'use strict';

var Rectangle = function(x1, y1, x2, y2){
    this.left = new Coordinates(x1 - 3, y1 - 3);
    this.right = new Coordinates(x2 + 3, y2 + 3);
    this.width = this.right.x - this.left.x ;
    this.height = this.right.y - this.left.y;
};
