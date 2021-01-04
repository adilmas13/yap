'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Ru$Yap = require("../../utils/ru.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Message$Yap = require("../../data/message.bs.js");
var ChatEngine$Yap = require("../../data/chatEngine.bs.js");
var AssetLoader$Yap = require("../../utils/assetLoader.bs.js");
var AvatarCollection$Yap = require("../../data/avatarCollection.bs.js");

var parent = {
  display: "flex",
  height: "100vh",
  padding: "10px",
  flexDirection: "column"
};

var bodyParent = {
  display: "flex",
  overflow: "scroll",
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
  padding: "0 25px",
  borderRadius: "100px",
  flex: "1"
};

var enterBtn = {
  background: "linear-gradient(0deg, #00d2ff, #3a7bd5)",
  cursor: "none",
  height: "50px",
  padding: "10px",
  width: "50px",
  opacity: "0.2",
  borderRadius: "50%",
  transition: "0.2s ease-out all",
  transform: "rotate(45deg)",
  pointerEvents: "none"
};

var enterBtnActive = {
  cursor: "pointer",
  opacity: "1",
  pointerEvents: "all"
};

var ChatInputStyle = {
  chatInputParent: chatInputParent,
  input: input,
  enterBtn: enterBtn,
  enterBtnActive: enterBtnActive
};

var rightParent = {
  display: "flex",
  marginBottom: "5px",
  justifyContent: "flex-end"
};

var rightBubble = {
  background: "linear-gradient(20deg, #00d2ff, #3a7bd5)",
  color: "#ffffff",
  padding: "5px 20px",
  width: "fit-content",
  borderRadius: "20px"
};

var leftParent = {
  display: "flex",
  marginBottom: "5px"
};

var leftBubble = {
  background: "#e5e5e5",
  color: "#000000",
  display: "flex",
  padding: "5px 20px",
  width: "fit-content",
  borderRadius: "20px",
  flexDirection: "column"
};

var userName = {
  color: "#3a7bd5",
  fontSize: "12px",
  fontWeight: "600"
};

var userImage = {
  height: "35px",
  marginRight: "10px",
  width: "35px",
  borderRadius: "50%"
};

var ChatBubbleStyle = {
  rightParent: rightParent,
  rightBubble: rightBubble,
  leftParent: leftParent,
  leftBubble: leftBubble,
  userName: userName,
  userImage: userImage
};

var Style = {
  parent: parent,
  bodyParent: bodyParent,
  ChatInputStyle: ChatInputStyle,
  ChatBubbleStyle: ChatBubbleStyle
};

function Chat$ChatInput(Props) {
  var id = Props.id;
  var match = React.useState(function () {
        return "";
      });
  var setMessage = match[1];
  var message = match[0];
  var sendBtnStyle = message.trim().length > 0 ? Object.assign({}, enterBtn, enterBtnActive) : enterBtn;
  var sendMessage = function (param) {
    if (message.trim().length > 0) {
      ChatEngine$Yap.sendMessage(message, id);
      return Curry._1(setMessage, (function (param) {
                    return "";
                  }));
    }
    
  };
  var onChange = function (e) {
    e.stopPropagation();
    var target = e.target;
    return Curry._1(setMessage, (function (param) {
                  return target.value;
                }));
  };
  var onKeyDown = function (e) {
    e.stopPropagation();
    var key = e.keyCode;
    if (key === 13) {
      return sendMessage(undefined);
    }
    
  };
  return React.createElement("div", {
              style: chatInputParent
            }, React.createElement("input", {
                  style: input,
                  placeholder: "type a message..",
                  value: message,
                  onKeyDown: onKeyDown,
                  onChange: onChange
                }), React.createElement("img", {
                  style: sendBtnStyle,
                  src: AssetLoader$Yap.send,
                  onClick: (function (param) {
                      return sendMessage(undefined);
                    })
                }));
}

var ChatInput = {
  make: Chat$ChatInput
};

function Chat$MyChatBubble(Props) {
  var message = Props.message;
  return React.createElement("div", {
              style: rightParent
            }, React.createElement("div", {
                  style: rightBubble
                }, Ru$Yap.s(Message$Yap.message(message))));
}

var MyChatBubble = {
  make: Chat$MyChatBubble
};

function Chat$OtherChatBubble(Props) {
  return React.createElement("div", {
              style: leftParent
            }, React.createElement("img", {
                  style: userImage,
                  src: AvatarCollection$Yap.avatars[0]
                }), React.createElement("div", {
                  style: leftBubble
                }, React.createElement("div", {
                      style: userName
                    }, Ru$Yap.s("adil shaikh")), Ru$Yap.s("message")));
}

var OtherChatBubble = {
  make: Chat$OtherChatBubble
};

var defaultState = {
  messages: []
};

function reducer(state, action) {
  if (action) {
    return {
            messages: Belt_Array.concat(state.messages, [action._0])
          };
  } else {
    return state;
  }
}

function Chat$Body(Props) {
  var id = Props.id;
  var match = React.useReducer(reducer, defaultState);
  var dispatch = match[1];
  React.useEffect((function () {
          ChatEngine$Yap.listen(id).onSnapshot(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                      return Curry._1(dispatch, /* NewMessage */{
                                  _0: Message$Yap.decode(doc.data())
                                });
                    });
                
              });
          
        }), []);
  return React.createElement("div", {
              style: bodyParent
            }, Ru$Yap.map(match[0].messages, (function (message) {
                    return React.createElement(Chat$MyChatBubble, {
                                message: message
                              });
                  })));
}

var Body = {
  defaultState: defaultState,
  reducer: reducer,
  make: Chat$Body
};

function Chat(Props) {
  var id = Props.id;
  return React.createElement("div", {
              style: parent
            }, React.createElement(Chat$Body, {
                  id: id
                }), React.createElement(Chat$ChatInput, {
                  id: id
                }));
}

var make = Chat;

exports.Style = Style;
exports.ChatInput = ChatInput;
exports.MyChatBubble = MyChatBubble;
exports.OtherChatBubble = OtherChatBubble;
exports.Body = Body;
exports.make = make;
/* react Not a pure module */
