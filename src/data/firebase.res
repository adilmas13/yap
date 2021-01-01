type firebase
type obj
type obj1

type test = {
  name: string,
  age: int,
}

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
  type t
  type collection

  @bs.module external require: unit = "firebase/firestore"

  @bs.send external collection: (t, string) => collection = "collection"

  @bs.send external add: (collection, 'a) => Js.Promise.t<DocRef.t> = "add"

  @bs.send external doc: (collection, string) => DocRef.t = "doc"

  @bs.send external onSnapshot: (DocRef.t, DocRef.t => unit) => unit = "onSnapshot"
}

@bs.module external _firebase: obj = "firebase/app"

@bs.get external default: obj => firebase = "default"

@bs.send external initializeApp: (firebase, FirebaseConfig.t) => unit = "initializeApp"

@bs.send external firestore: firebase => Firestore.t = "firestore"

let firebase = {
  _firebase->default
}
