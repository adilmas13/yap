// Entry point
/*
 var firebaseConfig = {
     apiKey: "AIzaSyAWCwKVgPGtQPe1jMO_kEfY2BRViHrH9Yc",
     authDomain: "yap-app-d4a5a.firebaseapp.com",
     projectId: "yap-app-d4a5a",
     storageBucket: "yap-app-d4a5a.appspot.com",
     messagingSenderId: "704927017435",
     appId: "1:704927017435:web:0cdf608ab0eb0af39b1ffe",
     measurementId: "G-R5EJ5R9XSF"
   };
 */
open Firebase
let config = FirebaseConfig.make(
  ~apiKey="AIzaSyAWCwKVgPGtQPe1jMO_kEfY2BRViHrH9Yc",
  ~authDomain="yap-app-d4a5a.firebaseapp.com",
  ~projectId="yap-app-d4a5a",
  ~storageBucket="yap-app-d4a5a.appspot.com",
  ~messagingSenderId="704927017435",
  ~appId="1:704927017435:web:0cdf608ab0eb0af39b1ffe",
  ~measurementId="G-R5EJ5R9XSF",
)
firebase->initializeApp(config)
ReactDOMRe.renderToElementWithId(<App />, "app")
