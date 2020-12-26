'use strict';

var React = require("react");
var Profile$Yap = require("./components/profile/Profile.bs.js");

function App(Props) {
  return React.createElement(Profile$Yap.make, {});
}

var make = App;

exports.make = make;
/* react Not a pure module */
