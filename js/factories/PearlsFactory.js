'use strict';

function PearlsFactory (hexagons, players){
    var  index, hexagon, pearl, count;
    hexagons = hexagons.slice();//копирование без ссылок

    var pearlArray = [];

    for(var i = 0; i < players; i++){
            for( var j = 0; j < PLAYERS_CONFIG[i].count; j++){
                count = hexagons.length;
                index = Math.floor(Math.random()* count);
                hexagon = hexagons[index];

                pearl = new Pearl(hexagon.center, hexagon.radius, hexagon.place, PLAYERS_CONFIG[i].color);
                pearlArray.push(pearl);

                hexagons.splice(index, 1);
            }
    }

    return pearlArray;
}
