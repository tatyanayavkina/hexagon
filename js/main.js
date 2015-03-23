'use strict';

document.addEventListener('DOMContentLoaded', checkHash, false);

var hashHistory;

function checkHash (){
    setInterval (function(){
        var hash = window.location.hash;
        if(hash != hashHistory){
            // запоминаем hash, что обновляться только при изменении hash-а
            hashHistory = hash;
            switch (hash){
                case '#constructor':
                    constructZone();
                    break;
                case '#constructPlayers':
                    constructPlayers();
                    break;
                case '#game':
                    play();
                    break;
                default:
                    constructZone();
            }
        }

    }, 1000);
}


//объект, отвечающий за содержимое страницы
var pageConstructor = new PageConstructor();
// объект, отвечающий за работу с canvas
var view = new View();
//объект, отвечающий за конструирование параметров игры
var gameConstructor = new GameConstructor(view);
//document.addEventListener('DOMContentLoaded', initStadium, false);

function constructZone(){
    var zoneConstructor = pageConstructor.createPageZoneConstructor();
    pageConstructor.insertPage(zoneConstructor);
    gameConstructor.initStadium();

    CanvasEventsHandler(view.stadium.canvas, 'onmousedown',gameConstructor.reconstructHexagon.bind(gameConstructor));
    ButtonClickHandler('playersCount');
}

function constructPlayers(){
    var playersConstructor = pageConstructor.createPagePlayersConstructor();
    pageConstructor.insertPage(playersConstructor);
    gameConstructor.initPearls();
    CanvasEventsHandler(view.pearls.canvas, 'onmousedown',gameConstructor.downPearl.bind(gameConstructor));
    CanvasEventsHandler(view.pearls.canvas, 'onmousemove',gameConstructor.movePearl.bind(gameConstructor));
    CanvasEventsHandler(view.pearls.canvas, 'onmouseup',gameConstructor.upPearl.bind(gameConstructor));
}

function play(){
    var playConstructor = pageConstructor.createPageGamePlay();
    pageConstructor.insertPage(playConstructor);
    var game = new Game(view, gameConstructor.activeHexagons);
    game.initStadium(gameConstructor.pearls);
    CanvasEventsHandler(view.pearls.canvas, 'onmousedown', game.process.bind(game));
}
