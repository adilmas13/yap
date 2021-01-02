'use strict';

var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

var username = "username";

var avatar = "avatar";

var userId = "userId";

var Constants = {
  username: username,
  avatar: avatar,
  userId: userId
};

function saveUsername(name) {
  localStorage.setItem(username, name);
  
}

function saveAvatar(avatar$1) {
  localStorage.setItem(avatar, avatar$1);
  
}

function saveUserId(id) {
  var match = localStorage.getItem(userId);
  if (match == null) {
    localStorage.setItem(userId, id);
    return ;
  }
  
}

function isLoggedIn(param) {
  return Belt_Option.isSome(Caml_option.nullable_to_opt(localStorage.getItem(userId)));
}

var username$1 = Belt_Option.getWithDefault(Caml_option.nullable_to_opt(localStorage.getItem(username)), "Anonymous User");

var userId$1 = Belt_Option.getWithDefault(Caml_option.nullable_to_opt(localStorage.getItem(userId)), "xxx");

var avatar$1 = Belt_Option.getWithDefault(Caml_option.nullable_to_opt(localStorage.getItem(avatar)), "");

exports.Constants = Constants;
exports.saveUsername = saveUsername;
exports.saveAvatar = saveAvatar;
exports.saveUserId = saveUserId;
exports.isLoggedIn = isLoggedIn;
exports.username = username$1;
exports.userId = userId$1;
exports.avatar = avatar$1;
/* username Not a pure module */
