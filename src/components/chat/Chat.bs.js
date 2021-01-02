'use strict';

var React = require("react");
var AssetLoader$Yap = require("../../utils/assetLoader.bs.js");

var parent = {
  display: "flex",
  height: "100vh",
  padding: "10px",
  flexDirection: "column"
};

var bodyParent = {
  display: "flex",
  flex: "1",
  flexDirection: "column"
};

var chatInputParent = {
  display: "flex",
  height: "60px",
  width: "100%",
  alignItems: "flex-end"
};

var input = {
  background: "#e6e6e6",
  border: "none",
  fontSize: "16px",
  height: "50px",
  marginRight: "10px",
  outline: "none",
  padding: "0 15px",
  borderRadius: "100px",
  flex: "1"
};

var enterBtn = {
  background: "linear-gradient(0deg, #00d2ff, #3a7bd5)",
  cursor: "none",
  height: "50px",
  padding: "10px",
  width: "50px",
  borderRadius: "50%",
  transition: "0.2s ease-out all",
  transform: "rotate(45deg)",
  pointerEvents: "none"
};

var ChatInputStyle = {
  chatInputParent: chatInputParent,
  input: input,
  enterBtn: enterBtn
};

var Style = {
  parent: parent,
  bodyParent: bodyParent,
  ChatInputStyle: ChatInputStyle
};

function Chat$ChatInput(Props) {
  return React.createElement("div", {
              style: chatInputParent
            }, React.createElement("input", {
                  style: input,
                  placeholder: "type a message.."
                }), React.createElement("img", {
                  style: enterBtn,
                  src: AssetLoader$Yap.send
                }));
}

var ChatInput = {
  make: Chat$ChatInput
};

function Chat$Body(Props) {
  return React.createElement("div", {
              style: bodyParent
            });
}

var Body = {
  make: Chat$Body
};

function Chat(Props) {
  return React.createElement("div", {
              style: parent
            }, React.createElement(Chat$Body, {}), React.createElement(Chat$ChatInput, {}));
}

var make = Chat;

exports.Style = Style;
exports.ChatInput = ChatInput;
exports.Body = Body;
exports.make = make;
/* react Not a pure module */
