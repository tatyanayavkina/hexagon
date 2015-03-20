'use strict';

var GameConstructor = function(){

    this.init = function(view, hexagons){
        this.hexagons = hexagons;
        view.initViewConstructor(this.hexagons);
    };

    this.reconstructHexagon = function(point){
        var repaint = false;
        for( var i = 0, count = this.hexagons.length; i < count; i++){
            if (this.hexagons[i].containPoint(point)){
                this.hexagons[i].active = !this.hexagons[i].active;
                repaint = true;
                break;
            }
        }

        if(repaint){
            view.drawHexagons(this.hexagons);
        }
    }

};
