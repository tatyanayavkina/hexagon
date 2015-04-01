'use strict';

var LastAction = function(player, moveType, place){
    this.player = player || PLAYERS_CONFIG[0];
    this.type = moveType || MOVE_TYPES.move;
    this.place = place || new Coordinates(-1,-1);

};

LastAction.prototype.isSame = function(place){
      return (this.place == place) && (this.type == MOVE_TYPES.selected);
};
