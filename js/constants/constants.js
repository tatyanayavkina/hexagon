'use strict';
// id-ки элементов
var INFO = 'info';
var BUTTON_SELECT_PLAYERS = 'playersCount';
var BANNER_SELECT_PLAYERS = 'player-banner';
var RADIO_PLAYERS_COUNT = 'players';

// адреса для страниц
var HASH_URI = {
    zone    : '#construct-zone',
    count   : '#construct-players-count',
    pearls  : '#construct-players-position',
    game    : '#play'
};

var CANVAS_WIDTH = 700;
var CANVAS_HEIGHT = 550;

//точка, от которой рисуется самый первый шестиугольник
var START_POINT = new Coordinates(100, 0);
// размер стороны шестиугольника
var SIZE = 35;

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
var GAME_SIZE = 11;
//массив, показывающий, сколько шестиугольников в каждом ряду
var HEXAGON_ROW_COUNT = [7,8,9,10,11,10,9,8,7];
//сдвиг при добавлении шестиугольников в игровую доску
var MATRIX_TRANSLATION = [0,0,0,0,0,1,2,3,4];

var COLORS ={
   RED  : 'red',
   BLUE : 'blue',
   WHITE: 'white'
} ;
//Информация о стартовом количестве фишек и их цвете
var PLAYERS_CONFIG = [
    // RED
    {count: 3, color: ["rgb(255, 87, 66)", "rgb(191, 0, 50)"], description: COLORS.RED},
    // BLUE
    {count: 3, color: ["rgb(144, 140, 254)", "rgb(0, 61, 193)"], description: COLORS.BLUE},
    //WHITE
    {count: 3, color: ["rgb(207, 204, 196)", "rgb(255, 255, 255)"], description: COLORS.WHITE}
];

var PlAYERS_COUNT = PLAYERS_CONFIG.length;

var ANGLES = [0, Math.PI/6, Math.PI/3, Math.PI/2, 2*Math.PI/3, 5*Math.PI/6, Math.PI, 7*Math.PI/6, 4*Math.PI/3, 3*Math.PI/2, 5*Math.PI/3, 11*Math.PI/6, 2*Math.PI];

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





