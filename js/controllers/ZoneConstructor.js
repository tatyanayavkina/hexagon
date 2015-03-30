'use strict';

var ZoneConstructor = function(view, model, pageConstructor) {
    GameController.call(this, view, model, pageConstructor);

    var page = this.pageConstructor.createPageZoneConstructor();
    this.InsertPage(page);
};

ZoneConstructor.prototype = GameController;

ZoneConstructor.prototype.HandlerHexagonClicked = function(hexagon) {
    hexagon.active = !hexagon.active;
};

ZoneConstructor.prototype.Process = function() {
    this.model.initHexagons();
    this.view.ShowHexagons(this.model.hexagons);
    this.setHandlerHexagonClicked(this.HandlerHexagonClicked);
};