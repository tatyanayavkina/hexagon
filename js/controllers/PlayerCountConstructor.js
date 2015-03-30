'use strict';

var PlayerCounterConstructor = function(view, model, pageConstructor) {
    this.init = function(view, model, pageConstructor){
        GameController.call(this, view, model, pageConstructor);

        this.process();
    };

    this.process = function() {
        var page = this.pageConstructor.createPagePlayersCountConstructor();
        this.insertPage(page);

        this.model.reduceHexagons();
        this.view.showHexagons(this.hexagons);
        // создать PlayerCounterView (там только количество игроков выбирается
        // попросить объект PlayerCounterView уведомить об окончании выбора (передаст количество игроков)
    };

    this.handlerPlayerCounter = function(playerCount) {
        this.model.players = PLAYERS_CONFIG.slice(0, playerCount);
    };

    this.init(view, model, pageConstructor);
};
PlayerCounterConstructor.prototype = GameController;
