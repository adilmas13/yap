'use strict';

var React = require("react");
var Ru$Yap = require("./utils/ru.bs.js");
var Chat$Yap = require("./components/chat/Chat.bs.js");
var Profile$Yap = require("./components/profile/Profile.bs.js");
var AssetLoader$Yap = require("./utils/assetLoader.bs.js");
var PageNotFound$Yap = require("./components/pageNotFound/PageNotFound.bs.js");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.bs.js");

var parent = {
  display: "flex",
  height: "100vh",
  padding: "0 10px",
  alignItems: "center"
};

var leftParent = {
  background: "linear-gradient(180deg, #00d2ff, #3a7bd5)",
  display: "flex",
  height: "calc(100vh - 20px)",
  position: "relative",
  width: "30%",
  borderRadius: "50px",
  alignItems: "center",
  justifyContent: "center"
};

var description = {
  color: "white",
  fontSize: "40px",
  fontWeight: "600"
};

var logoWrapper = {
  display: "flex",
  left: "20px",
  position: "absolute",
  top: "20px",
  justifyContent: "center"
};

var logoText = {
  color: "#fff",
  fontSize: "25px",
  fontWeight: "600",
  marginLeft: "10px"
};

var Style = {
  parent: parent,
  leftParent: leftParent,
  description: description,
  logoWrapper: logoWrapper,
  logoText: logoText
};

function App$LeftSection(Props) {
  return React.createElement("div", {
              style: leftParent
            }, React.createElement("div", {
                  style: description
                }, Ru$Yap.s("let's talk")), React.createElement("div", {
                  style: logoWrapper
                }, React.createElement("img", {
                      src: AssetLoader$Yap.logo,
                      width: "50px"
                    }), React.createElement("div", {
                      style: logoText
                    }, Ru$Yap.s("yap !!"))));
}

var LeftSection = {
  make: App$LeftSection
};

function App(Props) {
  var url = ReasonReactRouter.useUrl(undefined, undefined);
  var match = url.path;
  var body;
  var exit = 0;
  if (match) {
    switch (match.hd) {
      case "chat" :
          if (match.tl) {
            exit = 1;
          } else {
            body = React.createElement(Chat$Yap.make, {});
          }
          break;
      case "profile" :
          if (match.tl) {
            exit = 1;
          } else {
            body = React.createElement(Profile$Yap.make, {});
          }
          break;
      default:
        exit = 1;
    }
  } else {
    body = React.createElement(Profile$Yap.make, {});
  }
  if (exit === 1) {
    body = React.createElement(PageNotFound$Yap.make, {});
  }
  return React.createElement("div", {
              style: parent
            }, React.createElement(App$LeftSection, {}), body);
}

var make = App;

exports.Style = Style;
exports.LeftSection = LeftSection;
exports.make = make;
/* react Not a pure module */
