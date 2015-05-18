'use strict';

//  GameController factory
var Application = function() {
    this.controller = {};

    this.view = new CanvasView();
    this.model = new GameModel();
    this.pageConstructor = new PageConstructor();

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
                        self.controller.process();
                        break;
                    case HASH_URI.count:
                        self.createPlayerCounter();
                        self.controller.process();
                        break;
                    case HASH_URI.pearls:
                        self.createPearlsConstructor();
                        self.controller.process();
                        break;
                    case HASH_URI.game:
                        self.createGame();
                        self.controller.process();
                        break;
                    default:
                        window.location.hash = HASH_URI.zone;
                        break;
                }
            }

        }, 100);
    };

    this.createZoneConstructor = function() {
        this.controller = new ZoneConstructor(this.view, this.model, this.pageConstructor);
    };
    this.createPlayerCounter = function() {
        this.controller = new PlayerCounterConstructor(this.view, this.model, this.pageConstructor);
    };
    this.createPearlsConstructor = function() {
        this.controller = new PearlsConstructor(this.view, this.model, this.pageConstructor);
    };
    this.createGame = function() {
        this.controller = new Game(this.view, this.model, this.pageConstructor);
    };
};