'use strict';

var ZoneConstructor = function(view, model, pageConstructor) {

    this.init = function(view, model, pageConstructor){
        GameController.call(this, view, model, pageConstructor);

        this.process();
    };

    this.handlerHexagonClicked = function(hexagon) {
        hexagon.active = !hexagon.active;
    };

    this.process = function() {
        var page = this.pageConstructor.createPageZoneConstructor();
        this.insertPage(page);

        this.model.initHexagons();
        this.view.showHexagons(this.model.hexagons);
        this.setHandlerHexagonClicked(this.handlerHexagonClicked);
    };


    this.init(view, model, pageConstructor);
};

ZoneConstructor.prototype = GameController;

