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
  fontSize: "40px"
};

var chatDescWrapper = {
  color: "white",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
};

var chatDesc = {
  color: "white",
  fontSize: "30px",
  padding: "0 5px"
};

var chatDescSecondary = {
  fontSize: "18px",
  padding: "10px 5px",
  textAlign: "center"
};

var orText = {
  fontSize: "30px",
  margin: "30px 0"
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
  chatDescWrapper: chatDescWrapper,
  chatDesc: chatDesc,
  chatDescSecondary: chatDescSecondary,
  orText: orText,
  logoWrapper: logoWrapper,
  logoText: logoText,
  bodyWrapper: bodyWrapper
};

function App$LeftSection(Props) {
  var body = Props.body;
  var tmp;
  if (typeof body === "number") {
    switch (body) {
      case /* Profile */0 :
          tmp = React.createElement("div", {
                style: description
              }, Ru$Yap.s("let's talk"));
          break;
      case /* Home */1 :
          tmp = React.createElement("div", {
                style: description
              }, Ru$Yap.s("home"));
          break;
      case /* PageNotFound */2 :
          tmp = React.createElement(React.Fragment, undefined);
          break;
      
    }
  } else {
    tmp = React.createElement("div", {
          style: chatDescWrapper
        }, React.createElement("div", {
              style: chatDesc
            }, Ru$Yap.s("share link with others")), React.createElement("div", {
              style: chatDescSecondary
            }, Ru$Yap.s(window.location.href)), React.createElement("div", {
              style: orText
            }, Ru$Yap.s("- or -")), React.createElement("div", {
              style: chatDesc
            }, Ru$Yap.s("tell them to join with id")), React.createElement("div", {
              style: chatDescSecondary
            }, Ru$Yap.s(body._0)));
  }
  return React.createElement("div", {
              style: leftParent
            }, tmp, React.createElement("div", {
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
      return ReasonReactRouter.push("/home");
    }
  };
  var match$1 = UserDetails$Yap.isLoggedIn(undefined);
  var match$2 = url.path;
  var body;
  if (match$1) {
    if (match$2) {
      switch (match$2.hd) {
        case "chat" :
            body = match$2.tl ? /* PageNotFound */2 : (
                pendingRoute ? /* Chat */({
                      _0: pendingRoute._0
                    }) : /* Home */1
              );
            break;
        case "home" :
        case "profile" :
            body = match$2.tl ? /* PageNotFound */2 : /* Home */1;
            break;
        default:
          body = /* PageNotFound */2;
      }
    } else {
      body = /* Home */1;
    }
  } else {
    body = /* Profile */0;
  }
  var tmp;
  if (typeof body === "number") {
    switch (body) {
      case /* Profile */0 :
          tmp = React.createElement(Profile$Yap.make, {
                onSubmit: onSubmit
              });
          break;
      case /* Home */1 :
          tmp = React.createElement(Home$Yap.make, {});
          break;
      case /* PageNotFound */2 :
          tmp = React.createElement(PageNotFound$Yap.make, {});
          break;
      
    }
  } else {
    tmp = React.createElement(Chat$Yap.make, {
          id: body._0
        });
  }
  return React.createElement("div", {
              style: parent
            }, React.createElement(App$LeftSection, {
                  body: body
                }), React.createElement("div", {
                  style: bodyWrapper
                }, tmp));
}

var make = App;

exports.Style = Style;
exports.LeftSection = LeftSection;
exports.make = make;
/* react Not a pure module */
