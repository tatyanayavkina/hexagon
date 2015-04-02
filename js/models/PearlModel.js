'use strict';

var Pearl = function(hexagon){
    this.center = new Coordinates(-1,-1);
    this.place = new Coordinates(-1,-1);

    this.center.copyFrom(hexagon.center);
    this.radius = hexagon.radius;
    this.place.copyFrom(hexagon.place);
    this.color = null;
};

Pearl.prototype.getRectangle = function(){
    this.rectangle =  new Rectangle(this.center.x - this.radius, this.center.y - this.radius, this.center.x + this.radius, this.center.y + this.radius);
};

Pearl.prototype.containPoint = function(point){
  return Math.sqrt(Math.pow(this.center.x - point.x, 2) + Math.pow(this.center.y - point.y, 2)) < this.radius;
};