'use strict';

var MouseEventsHandler = function(object, callback){
    object.onmousedown = getCoordinates;

    function getCoordinates(event){
        //здесь this - это объект над которым произошло действие
        var x = event.pageX - this.offsetLeft;
        var y = event.pageY - this.offsetTop;
        callback(new Coordinates(x,y));
    }
};