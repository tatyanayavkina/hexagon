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
Canvas.prototype.clear = function(start, end){
    var left = start || new Coordinates(0,0);
    var right = end || new Coordinates(this.canvas.width,this.canvas.height);

    this.context.clearRect(left.x, left.y, right.x, right.y);
};

/* накладывает градиент, если задано */
Canvas.prototype.setGradientFillStyle = function(color, rectangle){
    var gradient;

    if (color){
       gradient = this.context.createLinearGradient(rectangle.left.x, rectangle.left.y, rectangle.right.x, rectangle.right.y);
        gradient.addColorStop(0.4, color[0]);
        gradient.addColorStop(0.8, color[1]);
    }

    return gradient;
};

/*
рисование шестиугольника
 */
Canvas.prototype.drawHexagon = function(hexagon, stroken, filled){
    var points = hexagon.vertexes;
    var rectangle = new Rectangle(points[0].x, points[0].y, points[2].x, points[5].y);
    this.context.fillStyle = this.setGradientFillStyle(hexagon.color, rectangle) || this.color;

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
  var rectangle = new Rectangle(pearl.center.x - pearl.radius, pearl.center.y - pearl.radius, pearl.center.x + pearl.radius, pearl.center.y + pearl.radius);
  this._drawSector(pearl, rectangle, 0, 2*Math.PI);
};

/*
    рисование сектора
*/
Canvas.prototype.drawSectorsTimeout = function(pearl){
    var startAngle = ANGLES[0];
    var rectangle = new Rectangle(pearl.center.x - pearl.radius, pearl.center.y - pearl.radius, pearl.center.x + pearl.radius, pearl.center.y + pearl.radius);
    for( var i = 1, count = ANGLES.length; i < count; i++){
        this.timeoutWrapper(i, pearl, rectangle, startAngle, ANGLES[i]);
    }

};

Canvas.prototype.timeoutWrapper = function(i, pearl, rectangle, startAngle, endAngle){
  var self = this;
  setTimeout(function(i){self._drawSector(pearl, rectangle, startAngle, endAngle)}, i*100);
};

Canvas.prototype._drawSector = function(pearl, rectangle, startAngle, endAngle){
    this.context.fillStyle = this.setGradientFillStyle(pearl.color, rectangle);

    this.context.beginPath();
    this.context.moveTo(pearl.center.x, pearl.center.y);
    this.context.arc(pearl.center.x, pearl.center.y, pearl.radius, startAngle, endAngle, false);
    this.context.lineTo(pearl.center.x, pearl.center.y);
    this.context.closePath();

    this.context.fill();
};
