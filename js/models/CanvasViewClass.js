'use strict';

var CanvasView = function(){
    this.stadium = new Canvas(CANVAS_ELEMENTS.stadium, CANVAS_COLORS.stadium );
    this.selected = new Canvas(CANVAS_ELEMENTS.selected);
    this.pearls = new Canvas(CANVAS_ELEMENTS.pearls);

    this.showHexagons = function(hexagons){
        this.stadium.clear();

        for( var i = 0, count = hexagons.length; i < count; i++){
            //если клетка активна - она закрашенная
            if(hexagons[i].active){
                this.stadium.drawHexagon(hexagons[i], true, true);
            }
            //если неактивна - то есть только граница
            else{
                this.stadium.drawHexagon(hexagons[i], true, false);
            }
        }
    };

    this.showSelected = function(hexagons){
        this.selected.clear();

        for( var i = 0, count = hexagons.length; i < count; i++){
            this.selected.drawHexagon(hexagons[i], false, true);
        }
    };

    this.showPearls = function(pearls){
        this.pearls.clear();

        for( var i = 0, count = pearls.length; i < count; i++){
            this.pearls.drawCircle(pearls[i]);
        }
    };

    this.drawStep = function(newPearl, recolorPearls, deletedPearl){
        this.selected.clear();

        // рисуем новую жемчужину
        this.pearls.drawCircle(newPearl);
        // перекрашиваем старые
        if(recolorPearls.length > 0){
            for(var i = 0, count = recolorPearls.length; i < count; i++){
                this.pearls.drawSectorsTimeout(recolorPearls[i]);
            }
        }
        // если нужно, убираем жемчужину
        if (deletedPearl){
            this.pearls.clear(deletedPearl.rectangle.left, deletedPearl.rectangle.width, deletedPearl.rectangle.height);
        }
    };

    this.drawPearlsTimeout = function(pearls){
        pearls = mixArray(pearls);

        for( var i = 0, count = pearls.length; i < count; i++){
            this._drawPearlTimeout(pearls[i], i);
        }
    };

    this._drawPearlTimeout = function(pearl, i){
        var self = this;
        setTimeout(function(){self.pearls.drawCircle(pearl)}, i*100);
    };


    this.setHandlerOnCanvas = function(eventType, handler){
        this.pearls.canvas[eventType] = getCoordinates;

        function getCoordinates(event){
            var x = event.pageX - this.getBoundingClientRect().left;
            var y = event.pageY - this.getBoundingClientRect().top;

            handler(new Coordinates(x,y));
        }
    };

    this.deleteAllHandlersOnCanvas = function(){
        var eventType;
        for(var key in CANVAS_EVENTS){
            if (CANVAS_EVENTS[key]){
                eventType = CANVAS_EVENTS[key];
                this.pearls.canvas[eventType] = "";
            }
        }

    };

 };
