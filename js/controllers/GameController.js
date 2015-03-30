'use strict';

var GameController = function(view, model, pageConstructor) {

    this.view = view;
    this.model = model;
    this.pageConstructor = pageConstructor;

    this.handlerHexagonClicked = function() {};
    this.handlerPearlMoved = function() {};
    this.handlerPearlClicked = function() {};

    this.ensureSharedObjectsInitialized = function (view, model, pageConstructor) {
        if(Object.keys(view).length == 0){
            this.view = new CanvasView();
        }

        if(Object.keys(model).length == 0){
            this.model = new GameModel();
        }

        if(Object.keys(pageConstructor).length == 0){
            this.pageConstructor = new PageConstructor();
        }
    };

    this.ensureSharedObjectsInitialized(view, model, pageConstructor);

    /////////////////////////////////////////////////////////
    this.setHandlerHexagonClicked = function(handler) {
        this.handlerHexagonClicked = handler;
    };

    this.setHandlerPearlMoved = function(handler) {
        this.handlerPearlMoved = handler;
    };

    this.setHandlerPearlClicked = function(handler) {
        this.handlerPearlClicked = handler;
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



