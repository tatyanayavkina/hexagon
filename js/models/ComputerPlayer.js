'use strict';

var ComputerPlayer = function(color, playersCount){
    this.color = color;
    if (playersCount == 2){
        this.algorithm = new AlphaBetaSolver(2);
    }
    else{
        this.algorithm = new SimpleSolver();
    }
};

ComputerPlayer.prototype.makeMove = function(gameModel, view) {
    var clickedPearl, clickedHexagon;
    this.lockMouse();

    var bestMove = this.algorithm.getBestMove(gameModel, this);
    clickedPearl = gameModel.board[bestMove.from.x][bestMove.from.y].pearl;
    clickedHexagon = bestMove.hexagon;

    var self = this;
    setTimeout(function(){view.simulateClick(clickedPearl.center);}, 1000);
    setTimeout( function(){view.simulateClick(clickedHexagon.center); self.unlockMouse();}, 2000);
};


ComputerPlayer.prototype.lockMouse = function (){
   document.getElementsByTagName('html')[0].style.cursor = 'none';
   document.getElementById('pointer').style.display = 'block';
};

ComputerPlayer.prototype.unlockMouse = function(){
    document.getElementsByTagName('html')[0].style.cursor = 'default';
    document.getElementById('pointer').style.display = 'none';
};

