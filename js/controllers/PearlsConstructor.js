'use strict';

var PearlsConstructor = function(view, model, pageConstructor) {
    // вызвать конструктор базового класса, передать view, model
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
        // потенциально можно было бы удалять фишку, но пока просто вернем ее на место
        this.returnPearl(pearl, sourceHexagon);
        return;
    }
    if (this.model.findPlaceByHexagon(destinationHexagon)) {
        // если в месте, куда нас перетащили, что-то есть, то верунться на исходное поле
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


