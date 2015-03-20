'use strict';

var View = function(){
    //this.selected = new Canvas(CANVAS_ELEMENTS.selected);
    //this.pearls = new Canvas(CANVAS_ELEMENTS.pearls);

    this.initView = function(hexagons, pearls){
        this.stadium.clear();
        this.selected.clear();
        this.pearls.clear();

        for( var i = 0, count = hexagons.length; i < count; i++){
            this.stadium.drawHexagon(hexagons[i], true);
        }


        for(i = 0, count = pearls.length; i < count; i++){
            this.pearls.drawCircle(pearls[i]);
        }
    };

    this.initViewConstructor = function (hexagons){
        this.stadium = new Canvas(CANVAS_ELEMENTS.stadium, CANVAS_COLORS.stadium );
        this.drawHexagons(hexagons);
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
        this.selected.clear();
        this.pearls.clear();

        for( var i = 0, count = pearls.length; i < count; i++){
            this.pearls.drawCircle(pearls[i]);
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

    this.buildStatistic = function(player, count){
        var html = '<div class="current-player" style="background-color: '+ player[0] +'">Сейчас ходят</div>';

        html += '<div class="wrapper">'+
                    '<div class="statistic red">' + count.red + '</div>' +
                    '<div class="statistic blue">' + count.blue + '</div>' +
                '</div>';
        html += '<div class="new-game">'+
                    '<a href="">Новая игра</a>'+
                '</div>';

        return html;
    };

    this.buildGameOver = function(count){
        var widthRed = 100*count.red/(count.red + count.blue);
        var widthBlue = 100 - widthRed;
        return  '<div class="wrapper">'+
                    '<div class="count red" style="width:'+ widthRed +'%;" >' + count.red + '</div>' +
                    '<div class="count blue" style="width:'+ widthBlue +'%;" >' + count.blue + '</div>' +
                '</div>';
    };

    this.insertStatistic = function(player, count){
        var statisticDiv = document.getElementById('game-info');
        statisticDiv.innerHTML = this.buildStatistic(player, count);
    };

    this.insertGameOver = function(count){
        //удаляем статистику с основной страницы
        var statisticDiv = document.getElementById('game-info');
        statisticDiv.parentNode.removeChild(statisticDiv);

        //добавляем информацию о завершении на баннер
        var gameOver = document.getElementById('result');
        gameOver.innerHTML = this.buildGameOver(count);

        document.getElementById('winner-banner').style.display = 'block';
    }


};