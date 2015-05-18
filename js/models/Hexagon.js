'use strict';
/*
    Hexagon
    is a model of game zone piece
 */

var Hexagon = function(initial, size, place, active){
   this.vertexes = [initial];
   this.place = place;
   this.active = active;
   this.center = new Coordinates(initial.x + (Math.sqrt(3)/2)*size, initial.y + size/2);
   this.radius = (Math.sqrt(3)/2)*size - 10;

   /*
       compute other vertexes coordinates assuming that
       hexagon is a right figure and we know one vertex coordinates
       and side length
    */

   this.vertexes.push(new Coordinates(initial.x + (Math.sqrt(3)/2)*size, initial.y - size/2));
   this.vertexes.push(new Coordinates(initial.x + Math.sqrt(3)*size, initial.y));
   this.vertexes.push(new Coordinates(initial.x + Math.sqrt(3)*size,initial.y + size));
   this.vertexes.push(new Coordinates(initial.x + (Math.sqrt(3)/2)*size, initial.y + 1.5*size));
   this.vertexes.push(new Coordinates(initial.x, initial.y + size));

};

Hexagon.prototype.containPoint = function(point){
    /*
        How to decect if a hexagon contains point
        Algorithm is based on vectors

         Обход вершин многоугольника происходит по часовой стрелке,
         так что точка лежит внутри многоугольника, если она находится слева
         от всех векторов, образованных сторонами многоугольника
     */
    var contain = true, polygonVector, pointVector;
    //vertexes
    for( var i= 0, count = this.vertexes.length; i < count; i++){
        var j = i + 1;
        if (j == count){
            j = 0;
        }
        polygonVector = new Vector(this.vertexes[i], this.vertexes[j]);
        pointVector = new Vector(this.vertexes[i],point);

        // if point is on right side
        if (polygonVector.vectorMultiply(pointVector) < 0 ){
            contain = false;
            break;
        }
    }

    return contain;
};
