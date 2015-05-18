'use strict';

var Move = function(from, hexagon, type, affected){
    this.from = from;
    this.to = hexagon.place;
    this.hexagon = hexagon;
    this.type = type;
    this.affected = affected;
    this.value = - BIG_VALUE;
};
