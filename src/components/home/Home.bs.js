'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Ru$Yap = require("../../utils/ru.bs.js");
var ChatEngine$Yap = require("../../data/chatEngine.bs.js");
var AssetLoader$Yap = require("../../utils/assetLoader.bs.js");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.bs.js");

var parent = {
  display: "flex",
  height: "100%",
  width: "100%",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
};

var title = {
  fontSize: "4rem"
};

var optionWrapper = {
  display: "flex",
  marginTop: "10px",
  alignItems: "center"
};

var orText = {
  fontSize: "2rem",
  padding: "0 20px"
};

var choice = {
  border: "1px solid #ccc",
  cursor: "pointer",
  display: "flex",
  height: "250px",
  position: "relative",
  width: "250px",
  borderRadius: "10px",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
};

var choiceTitle = {
  fontSize: "1.1rem",
  fontWeight: "600",
  marginTop: "5px",
  textAlign: "center",
  width: "100%"
};

var choiceIcon = {
  width: "120px"
};

var startConversationIcon = {
  marginLeft: "20px"
};

var joinConversationParent = {
  height: "250px",
  width: "250px",
  perspective: "1000px"
};

var joinConversationWrapper = {
  height: "100%",
  position: "relative",
  width: "100%",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d"
};

var panel = {
  background: "#fafafa",
  border: "1px solid #ccc",
  height: "100%",
  padding: "0 10px",
  position: "absolute",
  width: "100%",
  borderRadius: "10px",
  backfaceVisibility: "hidden"
};

var frontPanel = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
};

var backPanel = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  transform: "rotateY(180deg)"
};

var enterId = {
  fontSize: "1.1rem",
  fontWeight: "600",
  textAlign: "center",
  width: "100%"
};

var input = {
  background: "transparent",
  border: "none",
  borderBottom: "2px solid #3a7bd5",
  color: "black",
  fontSize: "18px",
  marginTop: "15px",
  marginBottom: "15px",
  outline: "none",
  textAlign: "center",
  width: "100%",
  opacity: "0.70"
};

var active = {
  transform: "rotateY(180deg)"
};

var enterBtn = {
  background: "linear-gradient(0deg, #00d2ff, #3a7bd5)",
  cursor: "none",
  height: "40px",
  marginTop: "10px",
  padding: "10px",
  width: "40px",
  opacity: "0.2",
  borderRadius: "50%",
  transition: "0.2s ease-out all",
  transform: "rotate(180deg)",
  pointerEvents: "none"
};

var enterBtnActive = {
  cursor: "pointer",
  opacity: "1",
  pointerEvents: "all"
};

var Style = {
  parent: parent,
  title: title,
  optionWrapper: optionWrapper,
  orText: orText,
  choice: choice,
  choiceTitle: choiceTitle,
  choiceIcon: choiceIcon,
  startConversationIcon: startConversationIcon,
  joinConversationParent: joinConversationParent,
  joinConversationWrapper: joinConversationWrapper,
  panel: panel,
  frontPanel: frontPanel,
  backPanel: backPanel,
  enterId: enterId,
  input: input,
  active: active,
  enterBtn: enterBtn,
  enterBtnActive: enterBtnActive
};

function Home$StartNewConvesation(Props) {
  var createChatRoom = function (e) {
    e.stopPropagation();
    Ru$Yap.onNextError(ChatEngine$Yap.createChatRoom(undefined), (function (id) {
            return ReasonReactRouter.push("/chat?id=" + id);
          }), (function (param) {
            
          }));
    
  };
  return React.createElement("div", {
              style: choice,
              onClick: createChatRoom
            }, React.createElement("img", {
                  style: Object.assign({}, choiceIcon, startConversationIcon),
                  src: AssetLoader$Yap.startChat
                }), React.createElement("div", {
                  style: choiceTitle
                }, Ru$Yap.s("start new conversation")));
}

var StartNewConvesation = {
  make: Home$StartNewConvesation
};

function Home$JoinConvesation(Props) {
  var match = React.useState(function () {
        return false;
      });
  var setActive = match[1];
  var match$1 = React.useState(function () {
        return "";
      });
  var setId = match$1[1];
  var id = match$1[0];
  var joinConversationStyle = match[0] ? Object.assign({}, joinConversationWrapper, active) : joinConversationWrapper;
  var enterBtnStyle = id.trim().length < 1 ? enterBtn : Object.assign({}, enterBtn, enterBtnActive);
  var onClick = function (e) {
    e.stopPropagation();
    return Curry._1(setActive, (function (active) {
                  return !active;
                }));
  };
  var onChange = function (e) {
    e.stopPropagation();
    var target = e.target;
    var value = target.value.trim();
    return Curry._1(setId, (function (param) {
                  return value;
                }));
  };
  var redirect = function (param) {
    var sanitizedId = id.trim();
    if (sanitizedId.length > 3) {
      return ReasonReactRouter.push("/chat?id=" + sanitizedId);
    }
    
  };
  var enterClick = function (e) {
    e.stopPropagation();
    return redirect(undefined);
  };
  var onKeyDown = function (e) {
    e.stopPropagation();
    var key = e.keyCode;
    if (key === 13) {
      return redirect(undefined);
    }
    
  };
  return React.createElement("div", {
              style: joinConversationParent
            }, React.createElement("div", {
                  style: joinConversationStyle,
                  onClick: onClick
                }, React.createElement("div", {
                      style: Object.assign({}, panel, frontPanel)
                    }, React.createElement("img", {
                          style: choiceIcon,
                          src: AssetLoader$Yap.groupChat
                        }), React.createElement("div", {
                          style: choiceTitle
                        }, Ru$Yap.s("join a conversation"))), React.createElement("div", {
                      style: Object.assign({}, panel, backPanel)
                    }, React.createElement("div", {
                          style: enterId
                        }, Ru$Yap.s("enter chat id")), React.createElement("input", {
                          style: input,
                          placeholder: "id",
                          onKeyDown: onKeyDown,
                          onChange: onChange,
                          onClick: (function (e) {
                              e.stopPropagation();
                              
                            })
                        }), React.createElement("img", {
                          style: enterBtnStyle,
                          src: AssetLoader$Yap.arrow,
                          onClick: enterClick
                        }))));
}

var JoinConvesation = {
  make: Home$JoinConvesation
};

function Home(Props) {
  return React.createElement("div", {
              style: parent
            }, React.createElement("div", {
                  style: title
                }, Ru$Yap.s("i would like to")), React.createElement("div", {
                  style: optionWrapper
                }, React.createElement(Home$StartNewConvesation, {}), React.createElement("div", {
                      style: orText
                    }, Ru$Yap.s("- or -")), React.createElement(Home$JoinConvesation, {})));
}

var make = Home;

exports.Style = Style;
exports.StartNewConvesation = StartNewConvesation;
exports.JoinConvesation = JoinConvesation;
exports.make = make;
/* react Not a pure module */
