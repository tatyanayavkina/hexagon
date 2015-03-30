'use strict';

var PageConstructor = function(){
    this.createPageZoneConstructor = function(){
        var html ='';

        html += '<div class="game-table-info-title">Настройка игры</div>' +
                '<div>' +
                    'Выберите клетки поля, которые будут игровыми. (Закрашенные клетки являются игровыми).' +
                '</div>';

        html += '<div class="button-a-wrapper"><a class="button-a" href="#construct-players-count">Выбрать количество игроков</a></div>';

        return html;
    };

    this.createPagePlayersCountConstructor = function(){
        var html ='';

        html +='<div class="game-table-info-title">Выбрать количество игроков</div>' +
                '<div>' +
                'По умолчанию число игроков равно 2-м' +
                '</div>' +
                '<div class="game-table-info-radio">';

        for( var i = 2; i <= PlAYERS_COUNT; i++){
            html += '<input class="radio" name="players" type="radio" value="'+ i +'"><label class="radio-label">'+ i +'</label>';
        }

        html += '</div>' +
                '<div class="button-a-wrapper"><a class="button-a" href="#construct-players-position">Расставить фишки</a></div>';

        return html;
    };

    this.createPagePlayersConstructor = function(){
        var html = '';
        html += '<div class="game-table-info-title">Настройка игры</div>' +
                '<div>' +
                    'Расставьте фишки на игровом поле. (Фишки переносятся мышью).' +
                '</div>' +
                '<div class="button-a-wrapper"><a class="button-a" href="#play">Начать игру</a></div>';

        return html;

    };

    this.createPageGamePlay = function(){
        var html = '';

        html += '<div class="game-table-info-title">Игра</div>' +
                    '<div id="game-info">' +
                '</div>';


        html += '<div id="winner-banner" class="banner">' +
                    '<div class="banner-inner">' +
                        '<div>Игра завершена</div>' +
                        '<div id="result"></div>' +
                        '<div class="button-a-wrapper"><a class="button-a" href="#construct-zone">Новая игра</a></div>' +
                    '</div>' +
                '</div>';

        return html;
    };

    this.insertPage = function(html){
        var element = document.getElementById('page');
        element.innerHTML = html;
    };

};
