'use strict';

var View = function(){

    this.buildStatistic = function(player, count){
        var width = 100/Object.keys(count).length;
        var html = '<div class="current-player" style="background-color: '+ player[0] +'">Сейчас ходят</div>';

        html += '<div class="wrapper">';
        for(var key in count){
            html += '<div class="statistic ' + key + '" style="width:'+ width + '%;">' + count[key] + '</div>'
        }

        html += '</div>';

        return html;
    };

    this.buildGameOver = function(count){
        var width = 100/Object.keys(count).length;
        var html = '<div class="wrapper">';

        for(var key in count){
            html += '<div class="statistic ' + key + '" style="width:'+ width + '%;">' + count[key] + '</div>'
        }
        html += '</div>';

        return  html;
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
