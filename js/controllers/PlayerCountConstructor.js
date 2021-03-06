'use strict';
/*
    PlayersCountConstructor - controller, parent - GameController
    This controller manages game player count
 */

var PlayerCounterConstructor = function(view, model, pageConstructor) {
    GameController.call(this, view, model, pageConstructor);
};
PlayerCounterConstructor.prototype = new GameController();
PlayerCounterConstructor.prototype.constructor = PlayerCounterConstructor;


PlayerCounterConstructor.prototype.process = function() {
    var page = this.pageConstructor.createPagePlayersCountConstructor();
    this.insertPage(page);

    this.model.reduceHexagons();
    this.view.showHexagons(this.model.hexagons);
    this.deleteAllHandlersOnCanvas();
    this.setHandlerOnRadioButton(this.handlerPlayerCounter.bind(this));
    this.setHandlerOnCheckboxButton(this.handlerComputerPlays.bind(this));
};

PlayerCounterConstructor.prototype.handlerPlayerCounter = function(playerCount) {
    this.model.players = PLAYERS_CONFIG.slice(0, playerCount);
};

PlayerCounterConstructor.prototype.handlerComputerPlays = function(plays){
    this.model.computerPlays = plays;
};

PlayerCounterConstructor.prototype.setHandlerOnRadioButton = function(handler){
    var radios = document.getElementsByName(RADIO_PLAYERS_COUNT);

    for(var i = 0, count = radios.length; i < count; i++){
        radios[i].onclick = function(){
            if(this.checked){
                handler(this.value);
            }
        }
    }
};

PlayerCounterConstructor.prototype.setHandlerOnCheckboxButton = function(handler){
    var checkbox = document.getElementById(COMPUTER);

    checkbox.onclick = function(){
        handler(this.checked);
    }
};