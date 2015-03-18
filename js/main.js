'use strict';

document.addEventListener('DOMContentLoaded', init, false);

function init(){
    var game = new Game();
    game.init();
    new MouseEventsHandler(game.view.pearls.canvas,game.process.bind(game));
}

