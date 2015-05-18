'use strict';
/*
    Base app controller
    Children: ZoneConstructor, PlayersCountConstructor, PearlsConstructor, Game
    Provide common handle for user interactions
 */

var GameController = function(view, model, pageConstructor) {

    this.view = view;
    this.model = model;
    this.pageConstructor = pageConstructor;

    this.index = -1;
};

GameController.prototype.process = function() {
    this.model.initBoard();

    this.deleteAllHandlersOnCanvas();
    this.setHandlerOnCanvasMouseDown(this.handlerMouseDown.bind(this));
    this.setHandlerOnCanvasMouseMove(this.handlerMouseMove.bind(this));
    this.setHandlerOnCanvasMouseUp(this.handlerMouseUp.bind(this));
};

GameController.prototype.handlerHexagonClicked = function() {};
GameController.prototype.handlerPearlPartialMoved = function() {};
GameController.prototype.handlerPearlMoved = function() {};
GameController.prototype.handlerPearlClicked = function() {};

GameController.prototype.setHandlerOnCanvasMouseDown = function(handler){
    this.view.setHandlerOnCanvas(CANVAS_EVENTS.mousedown, handler.bind(this));
};

GameController.prototype.setHandlerOnCanvasMouseMove = function(handler) {
    this.view.setHandlerOnCanvas(CANVAS_EVENTS.mousemove, handler.bind(this));
};

GameController.prototype.setHandlerOnCanvasMouseUp = function(handler) {
    this.view.setHandlerOnCanvas(CANVAS_EVENTS.mouseup, handler.bind(this));
};

GameController.prototype.deleteAllHandlersOnCanvas = function(){
    this.view.deleteAllHandlersOnCanvas();
};

GameController.prototype.handlerMouseDown = function(point){
    var place = this.model.findBoardPlaceByPoint(point);

    if(!place){
        return;
    }

    if(this.model.hasPearl(place)){
        this.index = this.model.findPearlIndexByPoint(point);
        this.sourceHexagon = this.model.findHexagonByPoint(point);
        this.handlerPearlClicked(this.model.board[place.x][place.y].pearl);
    }
    else{
        this.handlerHexagonClicked(this.model.board[place.x][place.y].hexagon);
    }

};

GameController.prototype.handlerMouseMove = function(point){
    if (this.index != -1){
        this.handlerPearlPartialMoved(this.model.pearls[this.index], point);
    }
};

GameController.prototype.handlerMouseUp = function(point){
    if(this.index != -1){
        this.destinationHexagon = this.model.findHexagonByPoint(point);
        this.handlerPearlMoved(this.model.pearls[this.index], this.sourceHexagon, this.destinationHexagon);
        delete this.model.board[this.sourceHexagon.place.x][this.sourceHexagon.place.y].pearl;
        this.model.board[this.destinationHexagon.place.x][this.destinationHexagon.place.y].pearl = this.model.pearls[this.index];

        this.index = -1;
    }
};

GameController.prototype.insertPage = function(page){
    var element = document.getElementById(INFO);
    element.innerHTML = page;
};

