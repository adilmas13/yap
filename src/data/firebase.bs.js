'use strict';

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

var Firestore = {
  DocRef: DocRef
};

var firebase = App.default;

exports.FirebaseConfig = FirebaseConfig;
exports.Firestore = Firestore;
exports.firebase = firebase;
/* firebase Not a pure module */
