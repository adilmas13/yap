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

  let make = (message: string) => {
    {
      message: message,
      user_id: UserDetails.userId(),
      username: UserDetails.username(~default="Anonymous User", ()),
      profile: UserDetails.avatar(),
      timestamp: Js.Date.now(),
    }
  }
}

module ChatRoomData = {
  type t = {createdAt: float}

  let makeDefault = () => {
    {
      createdAt: Js.Date.now(),
    }
  }
}

let sendMessage = (message: string, doc: string) => {
  firebase
  ->firestore
  ->Firestore.collection(Constants.chatRoom)
  ->Firestore.doc(doc)
  ->Firestore.collection1(Constants.messages)
  ->Firestore.add(message->MessageRequest.make)
  ->Js.Promise.then_(_ => Js.Promise.resolve(), _)
  ->Js.Promise.catch(e => {
    Js.log2("Send message error => ", e)
    Js.Promise.resolve()
  }, _)
  ->ignore
}

let listen = (doc: string) => {
  Rx.Observable.create(
    ~subscribe=#FunctionTeardown(
      (subscriber: Rx.Subscriber.t<array<Message.t>>) => {
        let unsubscribe = firebase
        ->firestore
        ->Firestore.collection(Constants.chatRoom)
        ->Firestore.doc(doc)
        ->Firestore.collection1(Constants.messages)
        ->Firestore.orderBy("timestamp", "desc")
        ->Firestore.limit(1)
        ->Firestore.onSnapshot1(querySnapshot => {
          querySnapshot
          ->Firebase.Firestore.QuerySnapshot.mapDataTo((msg, id) => msg->Message.decode(id))
          ->Rx.Subscriber.next(subscriber)
        })
        () => unsubscribe() // tear down
      },
    ),
    (),
  )
}

let getLatestMessages = (doc: string) => {
  Rx.Observable.create(
    ~subscribe=#NoTeardown(
      (subscriber: Rx.Subscriber.t<array<Message.t>>) => {
        firebase
        ->firestore
        ->Firestore.collection(Constants.chatRoom)
        ->Firestore.doc(doc)
        ->Firestore.collection1(Constants.messages)
        ->Firestore.orderBy("timestamp", "asc")
        ->Firestore.limit(50)
        ->Firestore.get
        ->Js.Promise.then_(querySnapshot => {
          let messages =
            querySnapshot->Firestore.QuerySnapshot.mapDataTo((msg, id) => msg->Message.decode(id))
          subscriber->Rx.Subscriber.next(messages, _)
          subscriber->Rx.Subscriber.complete
          Js.Promise.resolve()
        }, _)
        ->ignore
      },
    ),
    (),
  )
}

let createChatRoom = () => {
  Rx.Observable.create(
    ~subscribe=#NoTeardown(
      (subscriber: Rx.Subscriber.t<string>) => {
        firebase
        ->firestore
        ->Firestore.collection(Constants.chatRoom)
        ->Firestore.add(ChatRoomData.makeDefault())
        ->Js.Promise.then_((docRef: Firebase.Firestore.DocumentReference.t) => {
          subscriber->Rx.Subscriber.next(docRef->Firebase.Firestore.DocumentReference.id, _)
          subscriber->Rx.Subscriber.complete
          Js.Promise.resolve()
        }, _)
        ->ignore
      },
    ),
    (),
  )
}

let isChatRoomExisting = (doc: string) => {
  Rx.Observable.create(
    ~subscribe=#NoTeardown(
      (subscriber: Rx.Subscriber.t<bool>) => {
        firebase
        ->firestore
        ->Firestore.collection(Constants.chatRoom)
        ->Firestore.doc(doc)
        ->Firestore.get1
        ->Js.Promise.then_((docRef: Firebase.Firestore.DocumentSnapshot.t) => {
          subscriber->Rx.Subscriber.next(docRef->Firebase.Firestore.DocumentSnapshot.exists, _)
          subscriber->Rx.Subscriber.complete
          Js.Promise.resolve()
        }, _)
        ->ignore
      },
    ),
    (),
  )
}
