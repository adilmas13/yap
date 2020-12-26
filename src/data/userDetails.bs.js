'use strict';


var username = "username";

var avatar = "avatar";

var Constants = {
  username: username,
  avatar: avatar
};

function saveUsername(name) {
  localStorage.setItem(username, name);
  
}

function saveAvatar(avatar$1) {
  localStorage.setItem(avatar, avatar$1);
  
}

exports.Constants = Constants;
exports.saveUsername = saveUsername;
exports.saveAvatar = saveAvatar;
/* No side effect */
