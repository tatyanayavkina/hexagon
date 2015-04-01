'use strict';

var PearlsConstructor = function(view, model, pageConstructor) {
    // вызвать конструктор базового класса, передать view, model
    this.init = function(view, model, pageConstructor){
          GameController.call(this, view, model, pageConstructor);
          this.process();
    };

    this.handlerPearlDown = function(point){
        this.model.pearl = this.model.findPearlByPoint();
        if (this.model.pearl){
            this.model.sourceHexagon = this.model.findHexagonByPoint(point);
        }
    };

    this.handlerPearlMove = function(point){
        if (this.model.pearl){
            this.model.pearl.center.copyFrom(point);
            this.view.showHexagons(this.model.pearls);
        }
    };

    this.handlerPearlUp = function(point){
        if(this.model.pearl){
            this.model.destinationHexagon = this.model.findHexagonByPoint(point);
            this.handlerPearlMoved(this.model.pearl, this.model.sourceHexagon, this.model.destinationHexagon);

            this.model.pearl = null;
            this.model.sourceHexagon = null;
            this.model.destinationHexagon = null;
        }
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

        this.setHandlerOnCanvasMouseDown(this.handlerPearlDown.bind(this));
        this.setHandlerOnCanvasMouseMove(this.handlerPearlMove.bind(this));
        this.setHandlerOnCanvasMouseUp(this.handlerPearlUp.bind(this));
    };


    this.init(view, model, pageConstructor);
};
PearlsConstructor.prototype = GameController;
