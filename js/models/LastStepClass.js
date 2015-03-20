'use strict';

var LastStep = function(player, moveType, place){
    this.player = player || COLOR.RED;
    this.type = moveType || MOVE_TYPES.move;
    this.place = place || START_COUNT.RED[0];

};

LastStep.prototype.isSame = function(place){
      return (this.place == place) && (this.type == MOVE_TYPES.selected);
};
