'use strict';

/*
* Класс вектор
*/
var Vector = function(initial, terminal){
    this.coordinates = new Coordinates(terminal.x - initial.x, terminal.y - initial.y);
};

/*
 * Метод вычисляет векторное произведение двух векторов
 */

Vector.prototype.vectorMultiply = function(vector){
    return this.coordinates.x * vector.coordinates.y - this.coordinates.y * vector.coordinates.x;
};
