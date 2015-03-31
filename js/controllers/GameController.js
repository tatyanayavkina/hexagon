'use strict';

var GameController = function(view, model, pageConstructor) {

    this.view = view;
    this.model = model;
    this.pageConstructor = pageConstructor;

    //this.handlerHexagonClicked = function() {};
    //this.handlerPearlMoved = function() {};
    //this.handlerPearlClicked = function() {};


    /////////////////////////////////////////////////////////

    this.setHandlerOnCanvasClick = function(handler){
        this.view.setHandlerOnCanvas(CANVAS_EVENTS.mousedown, handler.bind(this));
    };

    this.deleteAllHandlersOnCanvas = function(){
      this.view.deleteAllHandlersOnCanvas();
    };

/////////////////////////////////////////////////////////

    this.handleMouseDown = function(point) {
        // при необходимости вызвать this.handlerHexagonClicked и/или this.handlerPearlClicked
    };

    this.handleMouseMove = function(point) {
        // просто обработать
    };

    this.handleMouseUp = function(point) {
        // при необходимости вызвать this.handlerPearlMoved
    };



    // то, что осталось в классе Game разделить и поместить либо сюда, либо в Model
    // в Model лежат Board, Hexagons, Pearls

    this.insertPage = function(page){
        var element = document.getElementById(INFO);
        element.innerHTML = page;
    };
};



