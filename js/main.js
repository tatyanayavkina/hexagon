'use strict';

page('/', page.redirect('/constructor'));
page('/constructor', constructZone);
page('/constructPlayers', constructPlayers);
//page('game', game);
page();

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
