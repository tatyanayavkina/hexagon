'use strict';
/*
CanvasView manages how user sees game zone at the current step of the game
 */

var CanvasView = function(){
    this.stadium = new Canvas(CANVAS_ELEMENTS.stadium, CANVAS_COLORS.stadium );
    this.selected = new Canvas(CANVAS_ELEMENTS.selected);
    this.pearls = new Canvas(CANVAS_ELEMENTS.pearls);

    this.showHexagons = function(hexagons){
        this.stadium.clear();

        for( var i = 0, count = hexagons.length; i < count; i++){
            //if cell is active then it is filled
            if(hexagons[i].active){
                this.stadium.drawHexagon(hexagons[i], true, true);
            }
            //else it is only bounded
            else{
                this.stadium.drawHexagon(hexagons[i], true, false);
            }
        }
    };

    this.showMoves = function(hexagons){
        this.selected.clear();
        hexagons = hexagons || [];

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

    this.showStep = function(newPearl, recolorPearls, deletedPearl){
        this.selected.clear();

        // draw new pearl
        this.pearls.drawCircle(newPearl);
        // recolor old pearls
        if(recolorPearls.length > 0){
            for(var i = 0, count = recolorPearls.length; i < count; i++){
                this.pearls.drawSectorsTimeout(recolorPearls[i]);
            }
        }
        // delete pearl if it is need
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
