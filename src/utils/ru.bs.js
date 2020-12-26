'use strict';

var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

function s(value) {
  return value;
}

var map = Belt_Array.map;

var mapi = Belt_Array.mapWithIndex;

exports.s = s;
exports.map = map;
exports.mapi = mapi;
/* No side effect */
