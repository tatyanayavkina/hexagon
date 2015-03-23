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
                    hashHistory = window.location.hash = '#constructor';

            }
        }

    }, 1000);
}


//объект, отвечающий за содержимое страницы
var pageConstructor = new PageConstructor();
// объект, отвечающий за работу с canvas
var canvasView = new CanvasView();
//объект, отвечающий за конструирование параметров игры
var gameConstructor = new GameConstructor(canvasView);

function constructZone(){
    var zoneConstructor = pageConstructor.createPageZoneConstructor();
    pageConstructor.insertPage(zoneConstructor);
    gameConstructor.initStadium();

    CanvasEventsHandler(canvasView.stadium.canvas, 'onmousedown',gameConstructor.reconstructHexagon.bind(gameConstructor));
    ButtonClickHandler(BUTTON_SELECT_PLAYERS);
    RadioClickHandler(RADIO_PLAYERS_COUNT, gameConstructor.changePlayersCount.bind(gameConstructor));
}

function constructPlayers(){
    var playersConstructor = pageConstructor.createPagePlayersConstructor();
    pageConstructor.insertPage(playersConstructor);
    gameConstructor.initPearls();
    CanvasEventsHandler(canvasView.pearls.canvas, 'onmousedown',gameConstructor.downPearl.bind(gameConstructor));
    CanvasEventsHandler(canvasView.pearls.canvas, 'onmousemove',gameConstructor.movePearl.bind(gameConstructor));
    CanvasEventsHandler(canvasView.pearls.canvas, 'onmouseup',gameConstructor.upPearl.bind(gameConstructor));
}

function play(){
    var playConstructor = pageConstructor.createPageGamePlay();
    pageConstructor.insertPage(playConstructor);
    var game = new Game(canvasView, gameConstructor.activeHexagons);
    game.initStadium(gameConstructor.pearls);
    CanvasEventsHandler(canvasView.pearls.canvas, 'onmousedown', game.process.bind(game));
}
