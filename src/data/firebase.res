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
  module DocRef = {
    type t
    @bs.get external exists: t => bool = "exists"
    @bs.get external id: t => string = "id"
    @bs.send external data: (t, unit) => 'a = "data"
  }

  module Query = {
    type t
  }

  module DocumentSnapshot = {
    type t;
    @bs.send external data: (t, unit) => 'a = "data"
  }

  module QuerySnapshot = {
    type t
    @bs.send external forEach: (t, DocumentSnapshot.t => unit) => unit = "forEach"
  }

  type t
  type collection

  @bs.module external require: unit = "firebase/firestore"
  @bs.send external collection: (t, string) => collection = "collection"
  @bs.send external collection1: (DocRef.t, string) => collection = "collection"
  @bs.send external add: (collection, 'a) => Js.Promise.t<DocRef.t> = "add"
  @bs.send external set: (DocRef.t, 'a) => Js.Promise.t<unit> = "set"
  @bs.send external doc: (collection, string) => DocRef.t = "doc"
  @bs.send external orderBy: (collection, string, string) => Query.t = "orderBy"
  @bs.send external limit: (Query.t, int) => Query.t = "limit"
  @bs.send external onSnapshot: (DocRef.t, QuerySnapshot.t => unit) => unit = "onSnapshot"
  @bs.send external onSnapshot1: (Query.t, QuerySnapshot.t => unit) => unit = "onSnapshot"
}

@bs.module external _firebase: obj = "firebase/app"
@bs.get external default: obj => firebase = "default"
@bs.send external initializeApp: (firebase, FirebaseConfig.t) => unit = "initializeApp"
@bs.send external firestore: firebase => Firestore.t = "firestore"

let firebase = {
  _firebase->default
}
