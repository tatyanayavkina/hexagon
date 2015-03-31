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
        this.view.showHexagons(this.model.hexagons);
        this.deleteAllHandlersOnCanvas();
        this.setHandlerOnRadioButton(this.handlerPlayerCounter.bind(this));
    };

    this.handlerPlayerCounter = function(playerCount) {
        this.model.players = PLAYERS_CONFIG.slice(0, playerCount);
    };

    this.setHandlerOnRadioButton = function(handler){
        var radios = document.getElementsByName(RADIO_PLAYERS_COUNT);

        for(var i = 0, count = radios.length; i < count; i++){
            radios[i].onclick = function(){
                if(this.checked){
                    handler(this.value);
                }
            }
        }
    };

    this.init(view, model, pageConstructor);
};
PlayerCounterConstructor.prototype = GameController;
