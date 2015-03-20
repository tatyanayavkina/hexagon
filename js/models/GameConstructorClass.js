'use strict';

var GameConstructor = function(view){
    this.view = view;

    this.initStadium = function(){
        this.hexagons = HexagonFactory();
        this.view.initViewConstructor(this.hexagons);
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
            this.view.drawHexagons(this.hexagons);
        }
    };

    this.initPearls = function(){
        var self = this;
        this.chooseActiveHexagons();
        this.pearls = PearlsFactory(this.activeHexagons);
        this.view.initViewPlayer(this.activeHexagons, this.pearls);

        this.selected =  -1;
    };

    this.chooseActiveHexagons = function(){
        this.activeHexagons = [];

        for(var i = 0, count = this.hexagons.length; i < count; i++){
            if(this.hexagons[i].active){
                this.activeHexagons.push(this.hexagons[i]);
            }
        }
    };

    this.downPearl = function(point) {
        for (var i = 0, count = this.pearls.length; i < count; i++) {
            if (this.pearls[i].containPoint(point)) {
                this.selected = i;
                this.initCenter = new Coordinates(this.pearls[i].center.x, this.pearls[i].center.y);
                break;
            }
        }

    };

    this.movePearl = function(point){
        var index;
        if(this.selected != -1){
            index = this.selected;
            this.pearls[index].center.x = point.x;
            this.pearls[index].center.y = point.y;
            this.view.drawPearls(this.pearls);
        }
    };

    this.upPearl = function(point){
        var index;
        if(this.selected != -1){
            var inBoard = false;
            index = this.selected;
            for(var i = 0, count = this.activeHexagons.length; i < count; i++){
                if(this.activeHexagons[i].containPoint(point) && this.activeHexagons[i].active){
                    this.pearls[index].center = new Coordinates(this.activeHexagons[i].center.x, this.activeHexagons[i].center.y);
                    this.pearls[index].place = new Coordinates(this.activeHexagons[i].place.x, this.activeHexagons[i].place.y);
                    inBoard = true;
                    break;
                }
            }

            if(!inBoard){
                this.pearls[index].center = new Coordinates(this.initCenter.x, this.initCenter.y);
            }
            this.view.drawPearls(this.pearls);

            this.selected = -1;
            this.initCenter = {};
        }
    };

};
