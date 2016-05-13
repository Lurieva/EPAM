'use strict';

function deleteRowTable (parent, index) {
    parent.deleteRow(index);
}

function removeChildren (elem) {
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }
}

function lastChild (element) {
    var i, last = 0,
        children = element.children,
        length = children.length;

    for (i = length - 1; i >= 0; i -= 1) {
        last = children[i];
        return last.nodeType === 1 ? last : null;
    }
}

function extend (first, second) {
    var key;

    for (key in first) {
        first[key] = second[key];
    }
    return first;
}

function generateId (key) {
    return key + '-'  + Math.random().toString().substr(2,3);
}


function forEach(list, callback) {
    Array.prototype.forEach.call( list, callback );
}

function slice (list, col) {
    return Array.prototype.slice.call(list, col);
}

function hasClass(el, cls) {
  return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}