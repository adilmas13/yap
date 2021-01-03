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

function listen(doc) {
  Firebase$Yap.firebase.firestore().collection(chatRoom).doc(doc).collection(messages).orderBy("timestamp", "desc").limit(1).onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
              console.log("data", doc.data());
              
            });
        
      });
  
}

exports.Constants = Constants;
exports.MessageRequest = MessageRequest;
exports.sendMessage = sendMessage;
exports.listen = listen;
/*  Not a pure module */
