'use strict';

var Pearl = function(center, radius, place, color){
  this.center = new Coordinates(center.x, center.y);
  this.radius = radius;
  this.color = color;
  this.place = new Coordinates(place.x, place.y);
};


Pearl.prototype.containPoint = function(point){
  return Math.sqrt(Math.pow(this.center.x - point.x, 2) + Math.pow(this.center.y - point.y, 2)) < this.radius;
};