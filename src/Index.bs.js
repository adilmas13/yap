'use strict';

var React = require("react");
var App$Yap = require("./App.bs.js");
var ReactDOMRe = require("reason-react/src/legacy/ReactDOMRe.bs.js");
var Firebase$Yap = require("./data/firebase.bs.js");

var config = Firebase$Yap.FirebaseConfig.make("AIzaSyAWCwKVgPGtQPe1jMO_kEfY2BRViHrH9Yc", "yap-app-d4a5a.firebaseapp.com", "yap-app-d4a5a", "yap-app-d4a5a.appspot.com", "704927017435", "1:704927017435:web:0cdf608ab0eb0af39b1ffe", "G-R5EJ5R9XSF");

Firebase$Yap.firebase.initializeApp(config);

ReactDOMRe.renderToElementWithId(React.createElement(App$Yap.make, {}), "app");

exports.config = config;
/* config Not a pure module */
