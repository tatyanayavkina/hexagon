'use strict';

var PageConstructor = function(){
    this.createPageZoneConstructor = function(){
        var html ='';

        html += '<div class="game-table-info-title">Настройка игры</div>' +
                '<div>' +
                    'Выберите клетки поля, которые будут игровыми. (Закрашенные клетки являются игровыми).' +
                '</div>';

        html += '<div class="button-a-wrapper"><a class="button-a" href="'+ HASH_URI.count+'">Выбрать количество игроков</a></div>';

        return html;
    };

    this.createPagePlayersCountConstructor = function(){
        var html ='';

        html +='<div class="game-table-info-title">Выбрать количество игроков</div>' +
                '<div>' +
                'По умолчанию число игроков равно 2-м' +
                '</div>' +
                '<div class="game-table-info-radio">';

        html += '<input class="radio" name="players" type="radio" value="2"  checked><label class="radio-label">2</label>';
        for( var i = 3; i <= PlAYERS_COUNT; i++){
            html += '<input class="radio" name="players" type="radio" value="'+ i +'"><label class="radio-label">'+ i +'</label>';
        }

        html += '</div>' +
                '<div><input class="checkbox" id="computer" type="checkbox"><label class="radio-label">Игра с компьютером</label></div>' +
                '<div class="button-a-wrapper"><a class="button-a" href="'+ HASH_URI.pearls+'">Расставить фишки</a></div>';

        return html;
    };

    this.createPagePlayersConstructor = function(){
        var html = '';
        html += '<div class="game-table-info-title">Настройка игры</div>' +
                '<div>' +
                    'Расставьте фишки на игровом поле. (Фишки переносятся мышью).' +
                '</div>' +
                '<div class="button-a-wrapper"><a class="button-a" href="'+ HASH_URI.game+'">Начать игру</a></div>';

        return html;

    };

    this.createPageGamePlay = function(){
        var html = '';

        html += '<div class="game-table-info-title">Игра</div>' +
                '<div id="game-statistic" class="game-statistic">' +
                '</div>';


        html += '<div id="winner-banner" class="banner">' +
                    '<div class="banner-inner">' +
                        '<div>Игра завершена</div>' +
                        '<div id="result"></div>' +
                        '<div class="button-a-wrapper"><a class="button-a" href="./">Новая игра</a></div>' +
                    '</div>' +
                '</div>';

        return html;
    };

    this.insertPage = function(html){
        var element = document.getElementById(INFO);
        element.innerHTML = html;
    };

    this.buildStatistic = function(player, count, computer){
        var width = 100/Object.keys(count).length;
        var html = '<div class="current-player" style="background-color: '+ player[0] +'">Сейчас ходят</div>';

        html += '<div class="wrapper">';
        for(var key in count){
            html += '<div class="statistic" style="width:'+ width + '%;background-color: '+ key +';">' + count[key] + '</div>'
        }

        html += '</div>';

        if(computer){
            html += '<div class="current-player" style="background-color: '+ computer.color[0] +'">Компьютер</div>';
        }

        return html;
    };

    this.buildGameOver = function(count){
        var width = 100/Object.keys(count).length;
        var html = '<div class="wrapper">';

        for(var key in count){
            html += '<div class="statistic" style="width:'+ width + '%;background-color: '+ key +';">' + count[key] + '</div>'
        }
        html += '</div>';



        return  html;
    };

    this.insertStatistic = function(player, count, computer){
        var statisticDiv = document.getElementById(STATISTIC);
        statisticDiv.innerHTML = this.buildStatistic(player, count, computer);
    };

    this.insertGameOver = function(count){
        //удаляем статистику с основной страницы
        var statisticDiv = document.getElementById(STATISTIC);
        statisticDiv.parentNode.removeChild(statisticDiv);

        //добавляем информацию о завершении на баннер
        var gameOver = document.getElementById(GAME_RESULT);
        gameOver.innerHTML = this.buildGameOver(count);

        document.getElementById('winner-banner').style.display = 'block';
    };

    this.changeBlockingDivState = function(block){
        var blockingDiv = document.getElementById(BLOCKING_DIV);
        if(block){
            blockingDiv.style.display = 'block';
        }
        else{
            blockingDiv.style.display = 'none';
        }
    }

};
