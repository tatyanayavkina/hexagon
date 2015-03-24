'use strict';

var PageConstructor = function(){
    this.createPageZoneConstructor = function(){
        var html = '<div class="title"><div class="title-inner">HEXAGON</div></div>';
        html += '<div class="game-table">';
        html += '<div class="game-table-canvas">' +
                    '<div class="canvas-wrapper">' +
                        '<canvas id="stadium" width="700" height="550" ></canvas>' +
                    '</div>' +
                '</div>';
        html += '<div class="game-table-info">' +
                    '<div class="game-table-info-title">Настройка игры</div>' +
                    '<div>' +
                        'Выберите клетки поля, которые будут игровыми. (Закрашенные клетки являются игровыми).' +
                    '</div>' +
                    '<div class="game-table-info-title">Выбрать количество игроков</div>' +
                    '<div class="game-table-info-radio">' +
                        '<input class="radio" name="players" type="radio" value="2" checked><label class="radio-label">2</label>'+
                        '<input class="radio" name="players" type="radio" value="3"><label class="radio-label">3</label>'+
                    '</div>' +
                    '<div class="button-a-wrapper"><a class="button-a" href="#constructPlayers">Расставить фишки</a></div>' +
                '</div>';

        html += '</div>';

        return html;
    };

    this.createPagePlayersConstructor = function(){
        var html = '<div class="title"><div class="title-inner">HEXAGON</div></div>';
        html += '<div class="game-table">';
        html += '<div class="game-table-canvas">' +
                    '<div class="canvas-wrapper">' +
                        '<canvas id="stadium" width="700" height="550" ></canvas>' +
                        '<canvas id="pearls" width="700" height="550"></canvas>' +
                    '</div>' +
                '</div>';
        html += '<div class="game-table-info">' +
                    '<div class="game-table-info-title">Настройка игры</div>' +
                    '<div>' +
                        'Расставьте фишки на игровом поле. (Фишки переносятся мышью).' +
                    '</div>' +
                    '<div class="button-a-wrapper"><a class="button-a" href="#game">Начать игру</a></div>' +
                '</div>';

        html += '</div>';

        return html;

    };

    this.createPageGamePlay = function(){
        var html = '<div class="title"><div class="title-inner">HEXAGON</div></div>';
        html += '<div class="game-table">';
        html += '<div class="game-table-canvas">' +
                    '<div class="canvas-wrapper">' +
                        '<canvas id="stadium" width="700" height="550" ></canvas>' +
                        '<canvas id="selected" width="700" height="550"></canvas>' +
                        '<canvas id="pearls" width="700" height="550"></canvas>' +
                    '</div>' +
                '</div>';
        html += '<div class="game-table-info">' +
                    '<div class="game-table-info-title">Игра</div>' +
                    '<div id="game-info">' +
                    '</div>' +
                '</div>';

        html += '</div>';
        html += '<div id="winner-banner" class="banner">' +
                    '<div class="banner-inner">' +
                        '<div id="result"></div>' +
                        '<div class="button-a-wrapper"><a class="button-a" href="#constructor">Новая игра</a></div>' +
                    '</div>' +
                '</div>';

        return html;
    };

    this.insertPage = function(html){
        var element = document.getElementById('page');
        element.innerHTML = html;
    };

};
