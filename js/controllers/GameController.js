'use strict';

var GameController = function(view, model, pageConstructor) {

    this.view = view;
    this.model = model;
    this.pageConstructor = pageConstructor;

    this.EnsureSharedObjectsInitialized(view, model, pageConstructor);

    this.handlerHexagonClicked = function() {};
    this.handlerPearlMoved = function() {};
    this.handlerPearlClicked = function() {};

    this.EnsureSharedObjectsInitialized = function (view, model, pageConstructor) {
        if(view == {}){
            this.view = new CanvasView();
        }

        if(model == {}){
            this.model = new GameModel();
        }

        if(pageConstructor == {}){
            this.pageConstructor = new PageConstructor();
        }
    };

    /////////////////////////////////////////////////////////

    // то, что осталось в классе Game разделить и поместить либо сюда, либо в Model
    // в Model лежат Board, Hexagons, Pearls

};


GameController.prototype.setHandlerHexagonClicked = function(handler) {
    this.handlerHexagonClicked = handler;
};

GameController.prototype.setHandlerPearlMoved = function(handler) {
    this.handlerPearlMoved = handler;
};

GameController.prototype.setHandlerPearlClicked = function(handler) {
    this.handlerPearlClicked = handler;
};

/////////////////////////////////////////////////////////

GameController.prototype.HandleMouseDown = function(point) {
    // при необходимости вызвать this.handlerHexagonClicked и/или this.handlerPearlClicked
};

GameController.prototype.HandleMouseMove = function(point) {
    // просто обработать
};

GameController.prototype.HandleMouseUp = function(point) {
    // при необходимости вызвать this.handlerPearlMoved
};

/////////////////////////////////////////////////////////

GameController.prototype.InsertPage = function(page){
    var element = document.getElementById(INFO);
    element.innerHTML = page;
};
