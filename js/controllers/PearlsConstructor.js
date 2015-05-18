'use strict';
/*
    PearlsConstructor - controller, parent - GameController
    This controller manages where pearls will be at the start of game
 */

var PearlsConstructor = function(view, model, pageConstructor) {
    GameController.call(this, view, model, pageConstructor);
};

PearlsConstructor.prototype = new GameController();
PearlsConstructor.prototype.constructor = PearlsConstructor;

PearlsConstructor.prototype.handlerPearlPartialMoved = function(pearl, point){
    pearl.center.copyFrom(point);
    this.view.showPearls(this.model.pearls);
};

PearlsConstructor.prototype.handlerPearlMoved = function(pearl, sourceHexagon, destinationHexagon) {
    if (destinationHexagon == null) {
        // if there is not game zone then return to source hexagon
        this.returnPearl(pearl, sourceHexagon);
        return;
    }
    if (this.model.findPlaceByHexagon(destinationHexagon)) {
        // if there is another pearl then return to sourceHexagon
        this.returnPearl(pearl, sourceHexagon);
        return;
    }

    pearl.center.copyFrom(destinationHexagon.center);
    pearl.place.copyFrom(destinationHexagon.place);
    this.view.showPearls(this.model.pearls);
};

PearlsConstructor.prototype.returnPearl = function(pearl, sourceHexagon){
    pearl.center.copyFrom(sourceHexagon.center);
};

PearlsConstructor.prototype.process = function() {
    var page = this.pageConstructor.createPagePlayersConstructor();
    this.insertPage(page);

    this.model.initPearls();

    this.view.showHexagons(this.model.hexagons);
    this.view.showPearls(this.model.pearls);

    Object.getPrototypeOf(PearlsConstructor.prototype).process.call(this);
};


