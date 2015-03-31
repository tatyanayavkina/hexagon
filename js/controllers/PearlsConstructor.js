'use strict';

var PearlsConstructor = function(view, model, pageConstructor) {
    // вызвать конструктор базового класса, передать view, model
    this.init = function(view, model, pageConstructor){
          GameController.call(this, view, model, pageConstructor);
          this.process();
    };

    this.handlerPearlMoved = function(pearl, sourceHexagon, destinationHexagon) {
        if (destinationHexagon == null) {
            // потенциально можно было бы удалять фишку, но пока просто вернем ее на место
            this.returnPearl(pearl, sourceHexagon);
            return;
        }
        if (this.model.findByHexagon(destinationHexagon)) {
            // если в месте, куда нас перетащили, что-то есть, то верунться на исходное поле
            this.returnPearl(pearl, sourceHexagon);
            return;
        }

        pearl.center.copyFrom(destinationHexagon.center);
        pearl.place.copyFrom(destinationHexagon.place);
    };

    this.returnPearl = function(pearl, sourceHexagon){
        pearl.center.copyFrom(sourceHexagon.center);
    };

    this.process = function() {
        var page = this.pageConstructor.createPagePlayersConstructor();
        this.insertPage(page);

        this.model.initPearls();

        this.view.showHexagons(this.model.hexagons);
        this.view.showPearls(this.model.pearls);

        this.deleteAllHandlersOnCanvas();
    };


    this.init(view, model, pageConstructor);
};
PearlsConstructor.prototype = GameController;
