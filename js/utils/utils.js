'use strict';

function addPropertyToObject(obj, properties){
    for(var key in properties){
        obj[key] = properties[key];
    }
    return obj;
}

function mixArray(array){
    var index, mixedArray = [];
    var count = array.length;

    for( var i = 0; i < count; i++){

        index = Math.floor(Math.random() * array.length);
        mixedArray.push(array[index]);
        array.splice(index,1);

    }

    return mixedArray;
}
