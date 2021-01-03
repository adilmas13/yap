type t = {
  message: string,
  profile: string,
  timestamp: int,
  userId: string,
  username: string,
}

let decode = json => {
  message: json->Json.Decode.field("message", Json.Decode.string, _),
  profile: json->Json.Decode.field("profile", Json.Decode.string, _),
  timestamp: json->Json.Decode.field("timestamp", Json.Decode.int, _),
  userId: json->Json.Decode.field("user_id", Json.Decode.string, _),
  username: json->Json.Decode.field("username", Json.Decode.string, _),
}

let message = t => t.message
let profile = t => t.profile
let timestamp = t => t.timestamp
let userId = t => t.userId
let username = t => t.username
