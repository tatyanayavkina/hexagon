'use strict';

var ComputerPlayer = function(color, algorithm){
    this.color = color;
    this.algorithm = algorithm;
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

//ComputerPlayer.prototype.makeMove = function(gameModel, view){
//    this.lockMouse();
//
//    var clickedPearl, clickedHexagon;
//    var bestMove = this.findBestMove(gameModel);
//
//    clickedPearl = bestMove.pearl;
//    clickedHexagon = bestMove.move.hexagon;
//
//    var self = this;
//    setTimeout(function(){view.simulateClick(clickedPearl.center);}, 1000);
//    setTimeout( function(){view.simulateClick(clickedHexagon.center); self.unlockMouse();}, 2000);
//};
//
//ComputerPlayer.prototype.findBestMove = function(gameModel){
//    var pearl, pearlMoves, bestPearlMove;
//    var bestPearl = {}, bestMove = {};
//
//    for( var i = 0, lenX = gameModel.board.length; i < lenX; i++){
//        for( var j = 0, lenY = gameModel.board[i].length; j < lenY; j++){
//            if(gameModel.board[i][j] && gameModel.board[i][j].pearl && gameModel.board[i][j].pearl.color == this.color){
//                pearl = gameModel.board[i][j].pearl;
//                pearlMoves = gameModel.getMoves(pearl);
//                bestPearlMove = gameModel.findBestPearlMove(pearlMoves);
//
//                if(Object.keys(bestMove).length == 0 || (bestPearlMove.affected && bestPearlMove.affected.length > bestMove.affected.length)){
//                    bestPearl = pearl;
//                    bestMove = bestPearlMove;
//                }
//            }
//        }
//    }
//
//    return {pearl: bestPearl, move: bestMove}
//
//};

ComputerPlayer.prototype.lockMouse = function (){
   document.getElementsByTagName('html')[0].style.cursor = 'none';
   document.getElementById('pointer').style.display = 'block';
};

ComputerPlayer.prototype.unlockMouse = function(){
    document.getElementsByTagName('html')[0].style.cursor = 'default';
    document.getElementById('pointer').style.display = 'none';
};

