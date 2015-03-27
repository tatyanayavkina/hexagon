'use strict';

var CanvasView = function(){

    this.initViewConstructor = function (hexagons){
        this.stadium = new Canvas(CANVAS_ELEMENTS.stadium, CANVAS_COLORS.stadium );
        this.drawHexagons(hexagons);
    };

    this.initViewPlayer = function(hexagons, pearls){
        this.stadium = new Canvas(CANVAS_ELEMENTS.stadium, CANVAS_COLORS.stadium );
        this.pearls = new Canvas(CANVAS_ELEMENTS.pearls);

        for( var i = 0, count = hexagons.length; i < count; i++){
            this.stadium.drawHexagon(hexagons[i], true, true);
        }

        for(i = 0, count = pearls.length; i < count; i++){
            this.pearls.drawCircle(pearls[i]);
        }
    };

    this.initGame = function(hexagons, pearls){
        this.stadium = new Canvas(CANVAS_ELEMENTS.stadium, CANVAS_COLORS.stadium );
        this.selected = new Canvas(CANVAS_ELEMENTS.selected);
        this.pearls = new Canvas(CANVAS_ELEMENTS.pearls);

        this.drawHexagons(hexagons);
        this.drawPearls(pearls);
    };

    this.drawHexagons = function(hexagons){
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

    this.drawSelected = function(hexagons){
        this.selected.clear();

        for( var i = 0, count = hexagons.length; i < count; i++){
            this.selected.drawHexagon(hexagons[i], false, true);
        }
    };

    this.drawPearls = function(pearls){
        this.pearls.clear();

        for( var i = 0, count = pearls.length; i < count; i++){
            this.pearls.drawCircle(pearls[i]);
        }
    };

    this.drawStep = function(newP, recolorP, deletedP){
        this.selected.clear();

        // рисуем новую жемчужину
        this.pearls.drawCircle(newP);
        // перекрашиваем старые
        if(recolorP.length > 0){
            for(var i = 0, count = recolorP.length; i < count; i++){
                this.pearls.drawSectorsTimeout(recolorP[i]);
            }
        }
        // если нужно, убираем жемчужину
        if (deletedP){
            this.pearls.clear(deletedP.rectangle.left, deletedP.rectangle.right);
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

 };