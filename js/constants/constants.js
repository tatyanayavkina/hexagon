'use strict';
//localization
var Localization = {
    en: 'en',
    ru: 'ru'
};

// html elements ids
var INFO = 'info';
var STATISTIC = 'game-statistic';
var GAME_RESULT = 'result';
var BLOCKING_DIV = 'blocking';
var BANNER_SELECT_PLAYERS = 'player-banner';
var RADIO_PLAYERS_COUNT = 'players';
var COMPUTER = 'computer';

// page hash uri
var HASH_URI = {
    zone    : '#construct-zone',
    count   : '#construct-players-count',
    pearls  : '#construct-players-position',
    game    : '#play'
};

//start point for the first hexagon vertex
var START_POINT = new Coordinates(100, 0);
// hexagon side length
var SIZE = 35;

// color settings for canvas
var CANVAS_COLORS ={
  stadium:{
      strokeStyle: "rgba(235, 10, 254, 0.5)",
      fillStyle  : "rgba(235, 10, 254, 0.3)"
  }
};


// canvas html elements ids
var CANVAS_ELEMENTS ={
  stadium : 'stadium',
  selected: 'selected',
  pearls  : 'pearls'
};

var CANVAS_EVENTS = {
  mousedown : 'onmousedown',
  mousemove : 'onmousemove',
  mouseup   : 'onmouseup',
  mouseclick: 'onmouseclick'
};

// playground size
var GAME_SIZE = 11;
//array - how much hexagons in each row
var HEXAGON_ROW_COUNT = [7,8,9,10,11,10,9,8,7];
//array - translation of hexagons in each row
var MATRIX_TRANSLATION = [0,0,0,0,0,1,2,3,4];

var COLORS ={
   RED  : 'red',
   BLUE : 'blue',
   WHITE: 'white'
} ;
//start info about players' colors and pearls count
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
      // copy positions
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
      // jump positions
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

var BIG_VALUE = 1000000;








