'use strict';

var ZoneConstructor = function(view, model, pageConstructor) {
    GameController.call(this, view, model, pageConstructor);
};

ZoneConstructor.prototype = new GameController();
ZoneConstructor.prototype.constructor = ZoneConstructor;

ZoneConstructor.prototype.process = function() {
    var page = this.pageConstructor.createPageZoneConstructor();
    this.insertPage(page);

    this.model.initHexagons();
    this.view.showHexagons(this.model.hexagons);

    Object.getPrototypeOf(ZoneConstructor.prototype).process.call(this);
};

ZoneConstructor.prototype.handlerHexagonClicked = function(hexagon) {
    hexagon.active = !hexagon.active;
    this.view.showHexagons(this.model.hexagons);
};

