'use strict';

var GameConstructor = function(view){
    this.canvasView = view;
    // по умолчанию 2 игрока
    this.players = 2;

    // генерация игровых клеток, их отрисовка: активных и неактивных
    this.initStadium = function(){
        this.hexagons = HexagonFactory();
        this.canvasView.initViewConstructor(this.hexagons);
    };

    //перерисовка при изменении активности игровых клеток
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
            this.canvasView.drawHexagons(this.hexagons);
        }
    };

    this.changePlayersCount = function(count){
       this.players = count;
    };

    //генерация стартовых фишек и их произвольное расположение на игровой зоне
    this.initPearls = function(){
        var self = this;
        this.chooseActiveHexagons();
        this.pearls = PearlsFactory(this.activeHexagons, this.players);
        this.canvasView.initViewPlayer(this.activeHexagons, this.pearls);

        this.selected =  -1;
    };

    //выборка активных игровых клеток из всего множества клеток
    this.chooseActiveHexagons = function(){
        this.activeHexagons = [];

        for(var i = 0, count = this.hexagons.length; i < count; i++){
            if(this.hexagons[i].active){
                this.activeHexagons.push(this.hexagons[i]);
            }
        }
    };

    // обработка нажатия клавиши мыши на фишку
    this.downPearl = function(point) {
        for (var i = 0, count = this.pearls.length; i < count; i++) {
            if (this.pearls[i].containPoint(point)) {
                this.selected = i;
                this.initCenter = new Coordinates(this.pearls[i].center.x, this.pearls[i].center.y);
                break;
            }
        }

    };

    // обработка таскания фишки
    this.movePearl = function(point){
        var index;
        if(this.selected != -1){
            index = this.selected;
            this.pearls[index].center.x = point.x;
            this.pearls[index].center.y = point.y;
            this.canvasView.drawPearls(this.pearls);
        }
    };

    // обработка отпускания клавиши мыши при выбранной фишке
    this.upPearl = function(point){
        var index;
        if(this.selected != -1){
            var inBoard = false;
            index = this.selected;
            for(var i = 0, count = this.activeHexagons.length; i < count; i++){
                if(this.activeHexagons[i].containPoint(point) && !this.activeHexagons[i].containPearl(this.pearls)){
                    this.pearls[index].center = new Coordinates(this.activeHexagons[i].center.x, this.activeHexagons[i].center.y);
                    this.pearls[index].place = new Coordinates(this.activeHexagons[i].place.x, this.activeHexagons[i].place.y);
                    inBoard = true;
                    break;
                }
            }

            if(!inBoard){
                this.pearls[index].center = new Coordinates(this.initCenter.x, this.initCenter.y);
            }
            this.canvasView.drawPearls(this.pearls);

            this.selected = -1;
            this.initCenter = {};
        }
    };

};
