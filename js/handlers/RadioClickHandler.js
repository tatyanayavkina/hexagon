'use strict';

function RadioClickHandler(name, callback) {
    var radios = document.getElementsByName(name);

    for(var i = 0, count = radios.length; i < count; i++){
        radios[i].onclick = function(){
            console.log('handle');
            if(this.checked){
                callback(this.value);
            }
        }
    }
}
