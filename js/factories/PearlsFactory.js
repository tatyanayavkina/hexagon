'use strict';

function PearlsFactory (hexagons, players){
    var  index, hexagon, pearl, count;
    hexagons = hexagons.slice();//копирование без ссылок

    var pearlArray = [];
    var playersCount = 0;

    for( var key in START_COUNT){
        playersCount ++;
        if (playersCount <= players){
            for( var i = 0; i < START_COUNT[key]; i++){
                count = hexagons.length;
                index = Math.floor(Math.random()* count);
                hexagon = hexagons[index];

                pearl = new Pearl(hexagon.center, hexagon.radius, hexagon.place, COLOR[key]);
                pearlArray.push(pearl);

                hexagons.splice(index, 1);
            }
        }
    }

    return pearlArray;
}
