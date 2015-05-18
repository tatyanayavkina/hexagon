'use strict';

/*
* Vector
*/
var Vector = function(initial, terminal){
    this.coordinates = new Coordinates(terminal.x - initial.x, terminal.y - initial.y);
};

/*
 * This method calculates vector product
 */

Vector.prototype.vectorMultiply = function(vector){
    return this.coordinates.x * vector.coordinates.y - this.coordinates.y * vector.coordinates.x;
};
