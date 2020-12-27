'use strict';

var React = require("react");
var Chat$Yap = require("./components/chat/Chat.bs.js");
var Profile$Yap = require("./components/profile/Profile.bs.js");
var PageNotFound$Yap = require("./components/pageNotFound/PageNotFound.bs.js");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.bs.js");

function App(Props) {
  var url = ReasonReactRouter.useUrl(undefined, undefined);
  var match = url.path;
  if (!match) {
    return React.createElement(Profile$Yap.make, {});
  }
  switch (match.hd) {
    case "chat" :
        if (!match.tl) {
          return React.createElement(Chat$Yap.make, {});
        }
        break;
    case "profile" :
        if (!match.tl) {
          return React.createElement(Profile$Yap.make, {});
        }
        break;
    default:
      
  }
  return React.createElement(PageNotFound$Yap.make, {});
}

var make = App;

exports.make = make;
/* react Not a pure module */
