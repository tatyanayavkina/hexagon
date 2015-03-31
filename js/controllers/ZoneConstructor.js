'use strict';

var ZoneConstructor = function(view, model, pageConstructor) {

    this.init = function(view, model, pageConstructor){
        GameController.call(this, view, model, pageConstructor);

        this.process();
    };

    this.handlerHexagonClicked = function(hexagon) {
        hexagon.active = !hexagon.active;
    };

    this.handleCanvasClicked = function(point){
        var hexagon = this.model.findHexagonByPoint(point);
        if(hexagon){
            this.handlerHexagonClicked(hexagon);
            this.view.showHexagons(this.model.hexagons);
        }
    };

    this.process = function() {
        var page = this.pageConstructor.createPageZoneConstructor();
        this.insertPage(page);

        this.model.initHexagons();
        this.view.showHexagons(this.model.hexagons);
        this.deleteAllHandlersOnCanvas();
        this.setHandlerOnCanvasClick(this.handleCanvasClicked);
    };


    this.init(view, model, pageConstructor);
};

ZoneConstructor.prototype = GameController;

