'use strict';

var React = require("react");
var Ru$Yap = require("./utils/ru.bs.js");
var Chat$Yap = require("./components/chat/Chat.bs.js");
var Home$Yap = require("./components/home/Home.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Profile$Yap = require("./components/profile/Profile.bs.js");
var AssetLoader$Yap = require("./utils/assetLoader.bs.js");
var UserDetails$Yap = require("./data/userDetails.bs.js");
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
  width: "25%",
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

var bodyWrapper = {
  flex: "1"
};

var Style = {
  parent: parent,
  leftParent: leftParent,
  description: description,
  logoWrapper: logoWrapper,
  logoText: logoText,
  bodyWrapper: bodyWrapper
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
  var pendingRoute;
  if (match && match.hd === "chat" && !match.tl) {
    var chatId = Belt_Array.getBy(url.search.split("&"), (function (it) {
            return it.startsWith("id=");
          }));
    pendingRoute = chatId !== undefined ? /* Chat */({
          _0: chatId.substring(chatId.indexOf("=") + 1 | 0)
        }) : /* Home */0;
  } else {
    pendingRoute = /* Home */0;
  }
  var onSubmit = function (param) {
    if (pendingRoute) {
      return ReasonReactRouter.push("/chat?id=" + pendingRoute._0);
    } else {
      console.log("going home");
      return ReasonReactRouter.push("/home");
    }
  };
  var match$1 = url.path;
  var body;
  if (UserDetails$Yap.isLoggedIn) {
    var exit = 0;
    if (match$1) {
      switch (match$1.hd) {
        case "chat" :
            if (match$1.tl) {
              exit = 1;
            } else {
              body = pendingRoute ? React.createElement(Chat$Yap.make, {
                      id: pendingRoute._0
                    }) : React.createElement(Home$Yap.make, {});
            }
            break;
        case "home" :
            if (match$1.tl) {
              exit = 1;
            } else {
              console.log("moving home");
              body = React.createElement(Home$Yap.make, {});
            }
            break;
        case "profile" :
            if (match$1.tl) {
              exit = 1;
            } else {
              body = React.createElement(Home$Yap.make, {});
            }
            break;
        default:
          exit = 1;
      }
    } else {
      body = React.createElement(Home$Yap.make, {});
    }
    if (exit === 1) {
      body = React.createElement(PageNotFound$Yap.make, {});
    }
    
  } else {
    body = React.createElement(Profile$Yap.make, {
          onSubmit: onSubmit
        });
  }
  return React.createElement("div", {
              style: parent
            }, React.createElement(App$LeftSection, {}), React.createElement("div", {
                  style: bodyWrapper
                }, body));
}

var make = App;

exports.Style = Style;
exports.LeftSection = LeftSection;
exports.make = make;
/* react Not a pure module */
