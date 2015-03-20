'use strict';
//объект, отвечающий за содержимое страницы
var pageConstructor = new PageConstructor();
// объект, отвечающий за работу с canvas
var view = new View();
//объект, отвечающий за конструирование параметров игры
var gameConstructor = new GameConstructor();
//document.addEventListener('DOMContentLoaded', init, false);

function init(){
    var game = new Game();
    game.init();
    //new CanvasEventsHandler(game.view.pearls.canvas,game.process.bind(game));
}

page('/', page.redirect('/constructor'));
page('/constructor', constructZone);
page('/players', players);
page();
//page('game', game);

function constructZone(){
    var zoneConstructor = pageConstructor.createPageZoneConstructor();
    pageConstructor.insertPage(zoneConstructor);
    var hexagons = HexagonFactory();
    gameConstructor.init(view, hexagons);
    CanvasEventsHandler(view.stadium.canvas, gameConstructor.reconstructHexagon.bind(gameConstructor));
    ButtonClickHandler('playersCount');
}

function players(){
    var playersConstructor = pageConstructor.createPagePlayersConstructor();
    pageConstructor.insertPage(playersConstructor);

    alert('ty6uyu67i');
}
