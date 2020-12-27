'use strict';

var React = require("react");
var Profile$Yap = require("./components/profile/Profile.bs.js");
var PageNotFound$Yap = require("./components/pageNotFound/PageNotFound.bs.js");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.bs.js");

function App(Props) {
  var url = ReasonReactRouter.useUrl(undefined, undefined);
  var match = url.path;
  if (match) {
    if (match.hd === "profile") {
      if (match.tl) {
        return React.createElement(PageNotFound$Yap.make, {});
      } else {
        return React.createElement(Profile$Yap.make, {});
      }
    } else {
      return React.createElement(PageNotFound$Yap.make, {});
    }
  } else {
    return React.createElement(Profile$Yap.make, {});
  }
}

var make = App;

exports.make = make;
/* react Not a pure module */
