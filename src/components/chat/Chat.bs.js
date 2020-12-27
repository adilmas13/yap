'use strict';

var React = require("react");
var Ru$Yap = require("../../utils/ru.bs.js");
var Firebase$Yap = require("../../data/firebase.bs.js");
var Firestore = require("firebase/firestore");

function Chat(Props) {
  React.useEffect((function () {
          Firebase$Yap.firebase.firestore().collection("chat_room").doc("123").onSnapshot(function (value) {
                console.log("onSnapshot", value.data());
                
              });
          
        }), []);
  return React.createElement("div", undefined, Ru$Yap.s("Chat room"));
}

var make = Chat;

exports.make = make;
/* react Not a pure module */
