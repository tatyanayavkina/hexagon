'use strict';
/*
PageConstructor provides html for all page of the application
 */

var PageConstructor = function(){
    this.createPageZoneConstructor = function(){
        var html ='';

        html += '<div class="game-table-info-title">' + GameSettings[locale] + '</div>' +
                '<div>' +
                    ChoosePlayingCells[locale] +
                '</div>';

        html += '<div class="button-a-wrapper"><a class="button-a" href="'+ HASH_URI.count+'">'+ ChoosePlayersCount[locale] +'</a></div>';

        return html;
    };

    this.createPagePlayersCountConstructor = function(){
        var html ='';

        html +='<div class="game-table-info-title">' + ChoosePlayersCount[locale] +'</div>' +
                '<div>' +
                    DefaultPlayersCount[locale] +
                '</div>' +
                '<div class="game-table-info-radio">';

        html += '<input class="radio" name="players" type="radio" value="2"  checked><label class="radio-label">2</label>';
        for( var i = 3; i <= PlAYERS_COUNT; i++){
            html += '<input class="radio" name="players" type="radio" value="'+ i +'"><label class="radio-label">'+ i +'</label>';
        }

        html += '</div>' +
                '<div><input class="checkbox" id="computer" type="checkbox"><label class="radio-label">'+ ComputerPlays[locale] +'</label></div>' +
                '<div class="button-a-wrapper"><a class="button-a" href="'+ HASH_URI.pearls+'">' + PlacePearls[locale] +'</a></div>';

        return html;
    };

    this.createPagePlayersConstructor = function(){
        var html = '';
        html += '<div class="game-table-info-title">' + GameSettings[locale] + '</div>' +
                '<div>' +
                    PlacePearlsDescription[locale] +
                '</div>' +
                '<div class="button-a-wrapper"><a class="button-a" href="'+ HASH_URI.game+'">' + StartGame[locale] +'</a></div>';

        return html;

    };

    this.createPageGamePlay = function(){
        var html = '';

        html += '<div class="game-table-info-title">' + Game[locale] +'</div>' +
                '<div id="game-statistic" class="game-statistic">' +
                '</div>';


        html += '<div id="winner-banner" class="banner">' +
                    '<div class="banner-inner">' +
                        '<div>' + EndGame[locale] +'</div>' +
                        '<div id="result"></div>' +
                        '<div class="button-a-wrapper"><a class="button-a" href="./">'+ NewGame[locale] +'</a></div>' +
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
        var html = '<div class="current-player" style="background-color: '+ player[0] +'">'+ CurrentPlayer[locale] +'</div>';

        html += '<div class="wrapper">';
        for(var key in count){
            html += '<div class="statistic" style="width:'+ width + '%;background-color: '+ key +';">' + count[key] + '</div>'
        }

        html += '</div>';

        if(computer){
            html += '<div class="current-player" style="background-color: '+ computer.color[0] +'">' + Computer[locale] +'</div>';
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
