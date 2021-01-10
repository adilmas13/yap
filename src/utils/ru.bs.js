'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Rx_Operators = require("@ambientlight/bs-rx/src/Rx_Operators.bs.js");
var Rx_Observable = require("@ambientlight/bs-rx/src/internal/Rx_Observable.bs.js");

function s(value) {
  return value;
}

var map = Belt_Array.map;

var mapi = Belt_Array.mapWithIndex;

function tapNext(observable, func) {
  return Curry._1(Rx_Operators.tap(func, (function (param) {
                    
                  }), (function (param) {
                    
                  })), observable);
}

function onNextError(observable, next, error) {
  return Rx_Observable.Observable.subscribe(next, error, (function (param) {
                
              }), observable);
}

exports.s = s;
exports.map = map;
exports.mapi = mapi;
exports.tapNext = tapNext;
exports.onNextError = onNextError;
/* Rx_Operators Not a pure module */
