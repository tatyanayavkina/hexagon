'use strict';

var GameController = function(view, model, pageConstructor) {

    this.view = view;
    this.model = model;
    this.pageConstructor = pageConstructor;

    //this.handlerHexagonClicked = function() {};
    //this.handlerPearlMoved = function() {};
    //this.handlerPearlClicked = function() {};


    /////////////////////////////////////////////////////////
    //this.setHandlerHexagonClicked = function(handler) {
    //    this.handlerHexagonClicked = handler;
    //};
    //
    //this.setHandlerPearlMoved = function(handler) {
    //    this.handlerPearlMoved = handler;
    //};
    //
    //this.setHandlerPearlClicked = function(handler) {
    //    this.handlerPearlClicked = handler;
    //};

    this.setHandlerOnCanvasMouseDown = function(handler){
        this.view.setHandlerOnCanvas(CANVAS_EVENTS.mousedown, handler.bind(this));
    };

    this.setHandlerOnCanvasMouseMove = function(handler) {
        this.view.setHandlerOnCanvas(CANVAS_EVENTS.mousemove, handler.bind(this));
    };

    this.setHandlerOnCanvasMouseUp = function(handler) {
        this.view.setHandlerOnCanvas(CANVAS_EVENTS.mouseup, handler.bind(this));
    };


    // то, что осталось в классе Game разделить и поместить либо сюда, либо в Model
    // в Model лежат Board, Hexagons, Pearls

    this.insertPage = function(page){
        var element = document.getElementById(INFO);
        element.innerHTML = page;
    };
};



