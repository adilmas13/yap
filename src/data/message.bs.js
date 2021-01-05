'use strict';

var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decode(json, id) {
  return {
          id: id,
          message: Json_decode.field("message", Json_decode.string, json),
          profile: Json_decode.field("profile", Json_decode.string, json),
          timestamp: Json_decode.field("timestamp", Json_decode.$$int, json),
          userId: Json_decode.field("user_id", Json_decode.string, json),
          username: Json_decode.field("username", Json_decode.string, json)
        };
}

function id(t) {
  return t.id;
}

function message(t) {
  return t.message;
}

function profile(t) {
  return t.profile;
}

function timestamp(t) {
  return t.timestamp;
}

function userId(t) {
  return t.userId;
}

function username(t) {
  return t.username;
}

exports.decode = decode;
exports.id = id;
exports.message = message;
exports.profile = profile;
exports.timestamp = timestamp;
exports.userId = userId;
exports.username = username;
/* No side effect */
