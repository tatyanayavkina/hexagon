'use strict';

var PearlsConstructor = function(view, model, pageConstructor) {
    // вызвать конструктор базового класса, передать view, model
    this.init = function(view, model, pageConstructor){
        GameController.call(this, view, model, pageConstructor);
        this.index = -1;

        this.process();
    };

    this.handlerPearlDown = function(point){
        this.index = this.model.findPearlIndexByPoint(point);
        if (this.index != -1){
            this.sourceHexagon = this.model.findHexagonByPoint(point);
        }
    };

    this.handlerPearlMove = function(point){
        if (this.index != -1){
            this.model.pearls[this.index].center.copyFrom(point);
            this.view.showPearls(this.model.pearls);
        }
    };

    this.handlerPearlUp = function(point){
        if(this.index != -1){
            this.destinationHexagon = this.model.findHexagonByPoint(point);
            this.handlerPearlMoved(this.model.pearls[this.index], this.sourceHexagon, this.destinationHexagon);

            this.view.showPearls(this.model.pearls);

            this.index = -1;
        }
    };

    this.handlerPearlMoved = function(pearl, sourceHexagon, destinationHexagon) {
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

        this.setHandlerOnCanvasMouseDown(this.handlerPearlDown.bind(this));
        this.setHandlerOnCanvasMouseMove(this.handlerPearlMove.bind(this));
        this.setHandlerOnCanvasMouseUp(this.handlerPearlUp.bind(this));
    };


    this.init(view, model, pageConstructor);
};
PearlsConstructor.prototype = GameController;
