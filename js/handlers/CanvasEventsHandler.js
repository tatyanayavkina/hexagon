'use strict';

function CanvasEventsHandler (object, action, callback){
    object[action] = getCoordinates;

    function getCoordinates(event){
        //здесь this - это объект над которым произошло действие
        var x = event.pageX - this.getBoundingClientRect().left;
        var y = event.pageY - this.getBoundingClientRect().top;
        callback(new Coordinates(x,y));
    }
}