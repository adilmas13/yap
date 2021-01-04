'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var App = require("firebase/app");

function make(apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId) {
  return {
          apiKey: apiKey,
          authDomain: authDomain,
          projectId: projectId,
          storageBucket: storageBucket,
          messagingSenderId: messagingSenderId,
          appId: appId,
          measurementId: measurementId
        };
}

var FirebaseConfig = {
  make: make
};

var DocRef = {};

var Query = {};

var DocumentSnapshot = {};

function mapDataTo(t, callback) {
  var result = {
    contents: []
  };
  t.forEach(function (doc) {
        var temp = Curry._2(callback, doc.data(), doc.id);
        result.contents = Belt_Array.concat(result.contents, [temp]);
        
      });
  return result.contents;
}

var QuerySnapshot = {
  mapDataTo: mapDataTo
};

var Firestore = {
  DocRef: DocRef,
  Query: Query,
  DocumentSnapshot: DocumentSnapshot,
  QuerySnapshot: QuerySnapshot
};

var firebase = App.default;

exports.FirebaseConfig = FirebaseConfig;
exports.Firestore = Firestore;
exports.firebase = firebase;
/* firebase Not a pure module */
