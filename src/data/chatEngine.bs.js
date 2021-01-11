'use strict';

var Rxjs = require("rxjs");
var Curry = require("bs-platform/lib/js/curry.js");
var Message$Yap = require("./message.bs.js");
var Firebase$Yap = require("./firebase.bs.js");
var UserDetails$Yap = require("./userDetails.bs.js");
var Firestore = require("firebase/firestore");

var chatRoom = "chat_room";

var messages = "messages";

var Constants = {
  chatRoom: chatRoom,
  messages: messages
};

function make(message) {
  return {
          message: message,
          user_id: UserDetails$Yap.userId(undefined),
          username: UserDetails$Yap.username(undefined),
          profile: UserDetails$Yap.avatar(undefined),
          timestamp: Date.now()
        };
}

var MessageRequest = {
  make: make
};

function makeDefault(param) {
  return {
          createdAt: Date.now()
        };
}

var ChatRoomData = {
  makeDefault: makeDefault
};

function sendMessage(message, doc) {
  var __x = Firebase$Yap.firebase.firestore().collection(chatRoom).doc(doc).collection(messages).add(make(message));
  var __x$1 = __x.then(function (param) {
        return Promise.resolve(undefined);
      });
  __x$1.catch(function (e) {
        console.log("Send message error => ", e);
        return Promise.resolve(undefined);
      });
  
}

function listen(doc) {
  return new Rxjs.Observable((function (subscriber) {
                var unsubscribe = Firebase$Yap.firebase.firestore().collection(chatRoom).doc(doc).collection(messages).orderBy("timestamp", "desc").limit(1).onSnapshot(function (querySnapshot) {
                      subscriber.next(Curry._2(Firebase$Yap.Firestore.QuerySnapshot.mapDataTo, querySnapshot, Message$Yap.decode));
                      
                    });
                return function (param) {
                  return Curry._1(unsubscribe, undefined);
                };
              }));
}

function getLatestMessages(doc) {
  return new Rxjs.Observable((function (subscriber) {
                var __x = Firebase$Yap.firebase.firestore().collection(chatRoom).doc(doc).collection(messages).orderBy("timestamp", "asc").limit(50).get();
                __x.then(function (querySnapshot) {
                      var messages = Curry._2(Firebase$Yap.Firestore.QuerySnapshot.mapDataTo, querySnapshot, Message$Yap.decode);
                      subscriber.next(messages);
                      subscriber.complete();
                      return Promise.resolve(undefined);
                    });
                
              }));
}

function createChatRoom(param) {
  return new Rxjs.Observable((function (subscriber) {
                var __x = Firebase$Yap.firebase.firestore().collection(chatRoom).add({
                      createdAt: Date.now()
                    });
                __x.then(function (docRef) {
                      subscriber.next(docRef.id);
                      subscriber.complete();
                      return Promise.resolve(undefined);
                    });
                
              }));
}

function isChatRoomExisting(doc) {
  return new Rxjs.Observable((function (subscriber) {
                var __x = Firebase$Yap.firebase.firestore().collection(chatRoom).doc(doc).get();
                __x.then(function (docRef) {
                      subscriber.next(docRef.exists);
                      subscriber.complete();
                      return Promise.resolve(undefined);
                    });
                
              }));
}

exports.Constants = Constants;
exports.MessageRequest = MessageRequest;
exports.ChatRoomData = ChatRoomData;
exports.sendMessage = sendMessage;
exports.listen = listen;
exports.getLatestMessages = getLatestMessages;
exports.createChatRoom = createChatRoom;
exports.isChatRoomExisting = isChatRoomExisting;
/*  Not a pure module */
