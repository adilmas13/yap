open Firebase
Firestore.require

module Constants = {
  let chatRoom = "chat_room"
  let messages = "messages"
}

module MessageRequest = {
  type t = {
    message: string,
    user_id: string,
    username: string,
    profile: string,
    timestamp: float,
  }
}

let sendMessage = (message: string, doc: string) => {
  let request: MessageRequest.t = {
    message: message,
    user_id: UserDetails.userId,
    username: UserDetails.username,
    profile: UserDetails.avatar,
    timestamp: Js.Date.now(),
  }
  firebase
  ->firestore
  ->Firestore.collection(Constants.chatRoom)
  ->Firestore.doc(doc)
  ->Firestore.collection1(Constants.messages)
  ->Firestore.add(request)
  ->Js.Promise.then_(_ => Js.Promise.resolve(), _)
  ->Js.Promise.catch(e => {
    Js.log2("Send message error => ", e)
    Js.Promise.resolve()
  }, _)
  ->ignore
}
