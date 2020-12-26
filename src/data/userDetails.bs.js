'use strict';


function saveUsername(name) {
  localStorage.setItem("username", name);
  
}

exports.saveUsername = saveUsername;
/* No side effect */
