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
  var request_user_id = UserDetails$Yap.userId(undefined);
  var request_username = UserDetails$Yap.username(undefined);
  var request_profile = UserDetails$Yap.avatar(undefined);
  var request_timestamp = Date.now();
  var request = {
    message: message,
    user_id: request_user_id,
    username: request_username,
    profile: request_profile,
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

function listen(doc) {
  return Firebase$Yap.firebase.firestore().collection(chatRoom).doc(doc).collection(messages).orderBy("timestamp", "desc").limit(1);
}

function getLatestMessages(doc) {
  return Firebase$Yap.firebase.firestore().collection(chatRoom).doc(doc).collection(messages).orderBy("timestamp", "asc").limit(50).get();
}

exports.Constants = Constants;
exports.MessageRequest = MessageRequest;
exports.sendMessage = sendMessage;
exports.listen = listen;
exports.getLatestMessages = getLatestMessages;
/*  Not a pure module */
