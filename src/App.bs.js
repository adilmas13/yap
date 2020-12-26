'use strict';

var React = require("react");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Profile$Yap = require("./components/profile/Profile.bs.js");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.bs.js");

function App(Props) {
  var url = ReasonReactRouter.useUrl(undefined, undefined);
  console.log("route", Belt_List.length(url.path));
  var match = url.path;
  if (match && match.hd === "profile" && !match.tl) {
    return React.createElement(Profile$Yap.make, {});
  }
  return React.createElement(Profile$Yap.make, {});
}

var make = App;

exports.make = make;
/* react Not a pure module */
