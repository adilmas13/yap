type firebase
type obj

module FirebaseConfig = {
  type t = {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string,
  }
  let make = (
    ~apiKey,
    ~authDomain,
    ~projectId,
    ~storageBucket,
    ~messagingSenderId,
    ~appId,
    ~measurementId,
  ) => {
    {
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
      measurementId: measurementId,
    }
  }
}

module Firestore = {
  module DocumentReference = {
    type t
    @bs.get external exists: t => bool = "exists"
    @bs.get external id: t => string = "id"
    @bs.send external data: (t, unit) => 'a = "data"
  }

  module Query = {
    type t
  }

  module DocumentSnapshot = {
    type t
    @bs.send external data: (t, unit) => 'a = "data"
    @bs.get external id: t => 'a = "id"
    @bs.get external exists: t => bool = "exists"
  }

  module QuerySnapshot = {
    type t
    @bs.send external forEach: (t, DocumentSnapshot.t => unit) => unit = "forEach"

    let mapDataTo = (t, callback: ('a, string) => 'b) => {
      let result = ref([])
      t->forEach(doc => {
        let temp = callback(doc->DocumentSnapshot.data(), doc->DocumentSnapshot.id)
        result := result.contents->Belt.Array.concat([temp])
      })
      result.contents
    }
  }

  type t
  type collection
  type snapshotReturn = unit => unit

  @bs.module external require: unit = "firebase/firestore"
  @bs.send external collection: (t, string) => collection = "collection"
  @bs.send external collection1: (DocumentReference.t, string) => collection = "collection"
  @bs.send external add: (collection, 'a) => Js.Promise.t<DocumentReference.t> = "add"
  @bs.send external set: (DocumentReference.t, 'a) => Js.Promise.t<unit> = "set"
  @bs.send external doc: (collection, string) => DocumentReference.t = "doc"
  @bs.send external orderBy: (collection, string, string) => Query.t = "orderBy"
  @bs.send external limit: (Query.t, int) => Query.t = "limit"
  @bs.send external onSnapshot: (DocumentReference.t, QuerySnapshot.t => unit) => snapshotReturn = "onSnapshot"
  @bs.send external onSnapshot1: (Query.t, QuerySnapshot.t => unit) => snapshotReturn = "onSnapshot"
  @bs.send external get: Query.t => Js.Promise.t<QuerySnapshot.t> = "get"
  @bs.send external get1: DocumentReference.t => Js.Promise.t<DocumentSnapshot.t> = "get"
}

@bs.module external _firebase: obj = "firebase/app"
@bs.get external default: obj => firebase = "default"
@bs.send external initializeApp: (firebase, FirebaseConfig.t) => unit = "initializeApp"
@bs.send external firestore: firebase => Firestore.t = "firestore"

let firebase = {
  _firebase->default
}
