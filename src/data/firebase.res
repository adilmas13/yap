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
type firebase
type obj
@bs.module external _firebase: obj = "firebase/app"

@bs.get external default: obj => firebase = "default"

@bs.send external initializeApp: (firebase, FirebaseConfig.t) => unit = "initializeApp"

let firebase = {
    _firebase -> default
}
