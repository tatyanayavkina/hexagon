'use strict';
/*
need methods
 */

function addPropertyToObject(obj, properties){
    for(var key in properties){
        obj[key] = properties[key];
    }
    return obj;
}

function clone(obj){
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
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

function objToArray (obj){
    var arr = [];
    for(var key in obj){
        arr.push(obj[key]);
    }
    return arr;
}
