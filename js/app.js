'use strict';

// фабрика для GameController
var Application = function() {
    this.controller = {};

    this.view = {};
    this.model = {};
    this.pageConstructor = {};

    this.checkPageURI = function() {
        var self = this;
        var hashHistory;
        setInterval (function(){
            var hash = window.location.hash;
            if(hash != hashHistory){
                // запоминаем hash, что обновляться только при изменении hash-а
                hashHistory = hash;
                switch (hash){
                    case HASH_URI.zone:
                        self.createZoneConstructor();
                        break;
                    case HASH_URI.count:
                        self.createPlayerCounter();
                        break;
                    case HASH_URI.pearls:
                        self.createPearlsConstructor();
                        break;
                    case HASH_URI.game:
                        self.createGame();
                        break;
                    default:
                        hashHistory = window.location.hash = HASH_URI.zone;
                        break;
                }
            }

        }, 100);
    };

    this.createZoneConstructor = function() {
        this.controller = new ZoneConstructor(this.view, this.model, this.pageConstructor);
    };
    this.createPlayerCounter = function() {
        this.controller = new PlayerCounter(this.view, this.model, this.pageConstructor);
    };
    this.createPearlsConstructor = function() {
        this.controller = new PearlsConstructor(this.view, this.model, this.pageConstructor);
    };
    this.createGame = function() {
        this.controller = new Game(this.view, this.model, this.pageConstructor);
    };
};