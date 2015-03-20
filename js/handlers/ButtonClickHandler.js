'use strict';

function ButtonClickHandler(id){
    var button = document.getElementById(id);
    button.onclick = function(){
        var modal = document.getElementById('player-banner');
        modal.style.display = 'block';
    }
}