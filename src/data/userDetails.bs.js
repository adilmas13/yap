'use strict';


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

exports.Constants = Constants;
exports.saveUsername = saveUsername;
exports.saveAvatar = saveAvatar;
exports.saveUserId = saveUserId;
/* No side effect */
