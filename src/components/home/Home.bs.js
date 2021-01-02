'use strict';

var React = require("react");
var Ru$Yap = require("../../utils/ru.bs.js");
var AssetLoader$Yap = require("../../utils/assetLoader.bs.js");

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
  height: "200px",
  width: "200px",
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
  width: "100px"
};

var startConversationIcon = {
  marginLeft: "20px"
};

var Style = {
  parent: parent,
  title: title,
  optionWrapper: optionWrapper,
  orText: orText,
  choice: choice,
  choiceTitle: choiceTitle,
  choiceIcon: choiceIcon,
  startConversationIcon: startConversationIcon
};

function Home$StartNewConvesation(Props) {
  return React.createElement("div", {
              style: choice
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
  return React.createElement("div", {
              style: choice
            }, React.createElement("img", {
                  style: choiceIcon,
                  src: AssetLoader$Yap.groupChat
                }), React.createElement("div", {
                  style: choiceTitle
                }, Ru$Yap.s("join a conversation")));
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
