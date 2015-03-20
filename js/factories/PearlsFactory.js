'use strict';

function PearlsFactory (hexagons){
    var index, hexagon, pearl, count;
    hexagons = hexagons.slice();//копирование без ссылок

    var pearlArray = [];
       //create Red pearls
    for( var key in START_COUNT){
        for( var i = 0; i < START_COUNT[key]; i++){
            count = hexagons.length;
            index = Math.floor(Math.random()* count);
            hexagon = hexagons[index];

            pearl = new Pearl(hexagon.center, hexagon.radius, hexagon.place, COLOR[key]);
            pearlArray.push(pearl);

            hexagons.slice(index, 1);
        }
    }

    return pearlArray;
}
