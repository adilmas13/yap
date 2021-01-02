'use strict';

var Firebase$Yap = require("./firebase.bs.js");
var UserDetails$Yap = require("./userDetails.bs.js");
var Firestore = require("firebase/firestore");

var chatRoom = "chat_room";

var messages = "messages";

var Constants = {
  chatRoom: chatRoom,
  messages: messages
};

var MessageRequest = {};

function sendMessage(message, doc) {
  var request_timestamp = Date.now();
  var request = {
    message: message,
    user_id: UserDetails$Yap.userId,
    username: UserDetails$Yap.username,
    profile: UserDetails$Yap.avatar,
    timestamp: request_timestamp
  };
  var __x = Firebase$Yap.firebase.firestore().collection(chatRoom).doc(doc).collection(messages).add(request);
  var __x$1 = __x.then(function (param) {
        return Promise.resolve(undefined);
      });
  __x$1.catch(function (e) {
        console.log("Send message error => ", e);
        return Promise.resolve(undefined);
      });
  
}

exports.Constants = Constants;
exports.MessageRequest = MessageRequest;
exports.sendMessage = sendMessage;
/*  Not a pure module */
