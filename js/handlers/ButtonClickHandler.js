'use strict';

function ButtonClickHandler(id){
    var button = document.getElementById(id);
    button.onclick = function(){
        var modal = document.getElementById(BANNER_SELECT_PLAYERS);
        modal.style.display = 'block';
    }
}