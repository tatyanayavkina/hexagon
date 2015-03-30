'use strict';

var CanvasView = function(){
    this.stadium = new Canvas(CANVAS_ELEMENTS.stadium, CANVAS_COLORS.stadium );
    this.selected = new Canvas(CANVAS_ELEMENTS.selected);
    this.pearls = new Canvas(CANVAS_ELEMENTS.pearls);


    this.ShowHexagons = function(hexagons){
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

    this.ShowSelected = function(hexagons){
        this.selected.clear();

        for( var i = 0, count = hexagons.length; i < count; i++){
            this.selected.drawHexagon(hexagons[i], false, true);
        }
    };

    this.ShowPearls = function(pearls){
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
            this.pearls.clear(deletedP.rectangle.left, deletedP.rectangle.width, deletedP.rectangle.height);
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
