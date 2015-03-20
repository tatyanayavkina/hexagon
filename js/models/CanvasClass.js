'use strict';

var Canvas = function(id, colors){
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext("2d");

    if (colors){
        this.context.strokeStyle =  colors.strokeStyle;
        this.color = colors.fillStyle;
    }
};

/*
очищение канвы
*/
Canvas.prototype.clear = function(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
};

/* накладывает градиент, если задано */
Canvas.prototype.setGradientFillStyle = function(color, points){
    var gradient;

    if (color){
       gradient = this.context.createLinearGradient(points[0].x, points[0].y, points[2].x, points[5].y);
        gradient.addColorStop(0.1, color[0]);
        gradient.addColorStop(0.5, color[1]);
    }

    return gradient;
};

/*
рисование шестиугольника
 */
Canvas.prototype.drawHexagon = function(hexagon, stroken, filled){
    var points = hexagon.vertexes;
    this.context.fillStyle = this.setGradientFillStyle(hexagon.color, points) || this.color;

    this.context.beginPath();
    this.context.moveTo(points[0].x,points[0].y);

    for( var i = 1, count = points.length; i < count; i++){
        this.context.lineTo(points[i].x,points[i].y);
    }
    this.context.lineTo(points[0].x,points[0].y);
    this.context.closePath();

    if(stroken){
        this.context.stroke();
    }

    if(filled){
        this.context.fill();
    }
};

/*
рисование круга с центром center и радиуса radius цвета color
*/
Canvas.prototype.drawCircle = function(pearl){

  var gradient = this.context.createLinearGradient(pearl.center.x - pearl.radius, pearl.center.y - pearl.radius, pearl.center.x + pearl.radius, pearl.center.y + pearl.radius);
  gradient.addColorStop(0.4, pearl.color[0]);
  gradient.addColorStop(0.8, pearl.color[1]);

  this.context.fillStyle = gradient;

  this.context.beginPath();
  this.context.arc(pearl.center.x, pearl.center.y, pearl.radius, 0, 2*Math.PI, false);
  this.context.closePath();

  this.context.fill();
};
