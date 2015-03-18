'use strict';

function PearlsFactory (board){
    var position, hexagon, pearl;
    var pearlArray = [];
       //create Red pearls
    for( var key in START_POSITIONS){
        for( var i = 0, count = START_POSITIONS[key].length; i < count; i++){
            position = START_POSITIONS[key][i];
            hexagon = board[position.x][position.y].hexagon;
            pearl = new Pearl(hexagon.center, hexagon.radius, hexagon.place, COLOR[key]);
            pearlArray.push(pearl);
        }
    }

    return pearlArray;
}
