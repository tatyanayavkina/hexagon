'use strict';

var ComputerPlayer = function(color){
    this.color = color;
};

ComputerPlayer.prototype.makeMove = function(gameModel){
    var clickedPearl, clickedHexagon;
    var bestMove = this.findBestMove(gameModel);

    clickedPearl = bestMove.pearl;
    clickedHexagon = bestMove.move.hexagon;

    var self = this;

    setTimeout(function(){self.simulateClick(clickedPearl.center)}, 1000);

    setTimeout( function() {self.simulateClick(clickedHexagon.center)}, 2000);
};

ComputerPlayer.prototype.findBestMove = function(gameModel){
    var pearl, pearlMoves, bestPearlMove;
    var bestPearl = {}, bestMove = {};

    for( var i = 0, lenX = gameModel.board.length; i < lenX; i++){
        for( var j = 0, lenY = gameModel.board[i].length; j < lenY; j++){
            if(gameModel.board[i][j] && gameModel.board[i][j].pearl && gameModel.board[i][j].pearl.color == this.color){
                pearl = gameModel.board[i][j].pearl;
                pearlMoves = gameModel.getMoves(pearl);
                bestPearlMove = gameModel.findBestPearlMove(pearlMoves);

                if(Object.keys(bestMove).length == 0 || (bestPearlMove.affected && bestPearlMove.affected.length > bestMove.affected.length)){
                    bestPearl = pearl;
                    bestMove = bestPearlMove;
                }
            }
        }
    }

    return {pearl: bestPearl, move: bestMove}

};

ComputerPlayer.prototype.simulateClick = function(point){
    var element = document.elementFromPoint(point.x + 8, point.y + 117);
    var evt = new MouseEvent('mousedown',{
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': point.x + 8,
        'clientY': point.y + 117,
        'screenX': point.x + 8,
        'screenY': point.y + 117
    });

   element.dispatchEvent(evt);
};
