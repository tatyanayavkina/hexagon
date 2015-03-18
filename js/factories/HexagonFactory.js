'use strict';
function HexagonFactory(){
    var startX = START_POINT.x, startY = START_POINT.y;
    var hexagon, place;
    var hexagonArray = [];

    for(var i = 0, row = HEXAGON_ROW_COUNT.length; i< row; i++){
        if(HEXAGON_ROW_COUNT[i-1] && HEXAGON_ROW_COUNT[i-1] < HEXAGON_ROW_COUNT[i]){
            startX = startX - (Math.sqrt(3)/2) * SIZE;
        }
        else{
            startX = startX + (Math.sqrt(3)/2) * SIZE;
        }

        startY = startY + 1.5*SIZE;

        for(var j = 0; j < HEXAGON_ROW_COUNT[i]; j++){
            place = new Coordinates(i, j + MATRIX_TRANSLATION[i]);
            hexagon = new Hexagon(new Coordinates(startX + Math.sqrt(3)*j*SIZE, startY), SIZE, place);
            hexagonArray.push(hexagon);
        }
    }

    return hexagonArray;

}
