'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Ru$Yap = require("../../utils/ru.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Message$Yap = require("../../data/message.bs.js");
var Firebase$Yap = require("../../data/firebase.bs.js");
var ChatEngine$Yap = require("../../data/chatEngine.bs.js");
var AssetLoader$Yap = require("../../utils/assetLoader.bs.js");
var UserDetails$Yap = require("../../data/userDetails.bs.js");

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

function id(t) {
  return t.id;
}

function message(t) {
  return t.message;
}

function me(t) {
  return t.me;
}

function make(message) {
  return {
          id: Message$Yap.id(message),
          message: message,
          me: Message$Yap.userId(message) === UserDetails$Yap.userId(undefined)
        };
}

var ChatUiData = {
  id: id,
  message: message,
  me: me,
  make: make
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
  var msg = message.message;
  return React.createElement("div", {
              style: rightParent
            }, React.createElement("div", {
                  style: rightBubble
                }, Ru$Yap.s(Message$Yap.message(msg))));
}

var MyChatBubble = {
  make: Chat$MyChatBubble
};

function Chat$OtherChatBubble(Props) {
  var message = Props.message;
  var msg = message.message;
  return React.createElement("div", {
              style: leftParent
            }, React.createElement("img", {
                  style: userImage,
                  src: Message$Yap.profile(msg)
                }), React.createElement("div", {
                  style: leftBubble
                }, React.createElement("div", {
                      style: userName
                    }, Ru$Yap.s(Message$Yap.username(msg))), Ru$Yap.s(Message$Yap.message(msg))));
}

var OtherChatBubble = {
  make: Chat$OtherChatBubble
};

var defaultState = {
  messages: []
};

function reducer(state, action) {
  if (!action) {
    return state;
  }
  var chatUiMessages = Belt_Array.map(action._0, make);
  var newMessage = chatUiMessages[0];
  var lastMessage = Belt_Array.get(state.messages, state.messages.length - 1 | 0);
  var shouldAppend = lastMessage !== undefined ? newMessage.id !== lastMessage.id : true;
  if (shouldAppend) {
    return {
            messages: Belt_Array.concat(state.messages, chatUiMessages)
          };
  } else {
    return state;
  }
}

function Chat$Body(Props) {
  var id = Props.id;
  var match = React.useReducer(reducer, defaultState);
  var dispatch = match[1];
  var startListening = function (param) {
    return ChatEngine$Yap.listen(id).onSnapshot(function (querySnapshot) {
                return Curry._1(dispatch, /* NewMessage */{
                            _0: Curry._2(Firebase$Yap.Firestore.QuerySnapshot.mapDataTo, querySnapshot, Message$Yap.decode)
                          });
              });
  };
  React.useEffect((function () {
          var unsubscribe = {
            contents: undefined
          };
          var __x = ChatEngine$Yap.getLatestMessages(id);
          __x.then(function (querySnapshot) {
                Curry._1(dispatch, /* NewMessage */{
                      _0: Curry._2(Firebase$Yap.Firestore.QuerySnapshot.mapDataTo, querySnapshot, Message$Yap.decode)
                    });
                unsubscribe.contents = startListening(undefined);
                return Promise.resolve(undefined);
              });
          return (function (param) {
                    var unsub = unsubscribe.contents;
                    if (unsub !== undefined) {
                      return Curry._1(unsub, undefined);
                    }
                    
                  });
        }), []);
  return React.createElement("div", {
              style: bodyParent
            }, Ru$Yap.map(match[0].messages, (function (message) {
                    var key = message.id;
                    if (message.me) {
                      return React.createElement(Chat$MyChatBubble, {
                                  message: message,
                                  key: key
                                });
                    } else {
                      return React.createElement(Chat$OtherChatBubble, {
                                  message: message,
                                  key: key
                                });
                    }
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

var make$1 = Chat;

exports.Style = Style;
exports.ChatUiData = ChatUiData;
exports.ChatInput = ChatInput;
exports.MyChatBubble = MyChatBubble;
exports.OtherChatBubble = OtherChatBubble;
exports.Body = Body;
exports.make = make$1;
/* react Not a pure module */
