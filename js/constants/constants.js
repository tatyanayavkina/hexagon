'use strict';

// настройки цветов для рисования
var CANVAS_COLORS ={
  stadium:{
      strokeStyle: "rgba(235, 10, 254, 0.5)",
      fillStyle  : "rgba(235, 10, 254, 0.3)"
  }
};


// id тегов с canvas
var CANVAS_ELEMENTS ={
  stadium : 'stadium',
  selected: 'selected',
  pearls  : 'pearls'
};

// размер игрового поля
var GAME_SIZE = 9;
//массив, показывающий, сколько шестиугольников в каждом ряду
var HEXAGON_ROW_COUNT = [7,8,9,10,11,10,9,8,7];
//сдвиг при добавлении шестиугольников в игровую доску
var MATRIX_TRANSLATION = [0,0,0,0,0,1,2,3,4];

//цвета игроков-фишек
var COLOR = {
    RED: ["rgb(255, 87, 66)", "rgb(191, 0, 50)"],
    BLUE: ["rgb(144, 140, 254)", "rgb(0, 61, 193)"],
    WHITE: ["rgb(255, 255, 255)", "rgb(207, 204, 196)"]
};
//стартовые позиции жемчужин на игровой доске
var START_COUNT = {
  RED: 3,
  BLUE: 3,
  WHITE: 3
};

//точкА, от которой рисуется самый первый шестиугольник
var START_POINT = new Coordinates(150, 0);
// размер стороны шестиугольника
var SIZE = 50;

var POSITIONS = {
  copy:{
      // позиции, на которые можно размножиться
      positions:  [
          new Coordinates(-1, 0),
          new Coordinates(-1, -1),
          new Coordinates(0, -1),

          new Coordinates(1, 0),
          new Coordinates(1, 1),
          new Coordinates(0, 1)

      ],
      color: ['rgb(3, 194, 63)', 'rgb(5, 173, 55)'],
      type: 1
  },

  jump: {
      // позиции, на которые можно прыгнуть
      positions:  [
          new Coordinates(-2, -1),
          new Coordinates(-2, -2),
          new Coordinates(-1, -2),

          new Coordinates(0, -2),
          new Coordinates(1, -1),
          new Coordinates(2, 0),

          new Coordinates(2, 1),
          new Coordinates(2, 2),
          new Coordinates(1, 2),

          new Coordinates(0, 2),
          new Coordinates(-1, 1),
          new Coordinates(-2, 0)
      ],
      color: ['rgb(250, 254, 139)','rgb(243, 247, 133)'],
      type: 2
  }
};

// типы хода
var MOVE_TYPES = {
    unselected: 'unselected',
    selected  : 'selected',
    move      : 'move'
};





