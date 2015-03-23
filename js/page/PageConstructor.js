'use strict';

var PageConstructor = function(){
    this.createPageZoneConstructor = function(){
        var html = '<h1>Игровая зона</h1><div><button id="playersCount">Выбрать игроков</button></div>';
        html += '<div class="canvas-wrapper">' +
                    '<canvas id="stadium" width="980" height="800" ></canvas>' +
                '</div>';
        html += '<div id="player-banner" class="banner">'+
                    '<div class="banner-inner">'+
                        '<div>Выбрать количество игроков</div>' +
                        '<div>' +
                            '<input name="players" type="radio" value="2" checked>2'+
                            '<input name="players" type="radio" value="3">3'+
                        '</div>'+
                        '<div><a href="#constructPlayers">Расставить фишки</a></div>' +
                    '</div>' +
                '</div>';

        return html;
    };

    this.createPagePlayersConstructor = function(){
        var html = '<h1>Расстановка фишек</h1><div><a href="#game"><button>Начать игру</button></a></div>';
        html += '<div class="canvas-wrapper">' +
                    '<canvas id="stadium" width="980" height="800" ></canvas>' +
                    '<canvas id="pearls" width="980" height="800"></canvas>' +
                '</div>';

        return html;
    };

    this.createPageGamePlay = function(){
        var html =  '<div class="canvas-wrapper">' +
                        '<canvas id="stadium" width="980" height="800" ></canvas>' +
                        '<canvas id="selected" width="980" height="800"></canvas>' +
                        '<canvas id="pearls" width="980" height="800"></canvas>' +
                    '</div>';

        html += '<div id="game-info"></div>';
        html += '<div id="winner-banner" class="banner">' +
                    '<div class="banner-inner">' +
                        '<div>' +
                            '<a href="./">Новая игра</a>' +
                        '</div>' +
                        '<div id="result"></div>' +
                    '</div>' +
                '</div>';

        return html;
    };

    this.insertPage = function(html){
        var element = document.getElementById('page');
        element.innerHTML = html;
    };

};
