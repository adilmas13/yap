@react.component
let make = () => {
  React.useEffect1(() => {
    open Firebase
    Firestore.require
    //    _firestoreImport
    //    firebase
    //    ->firestore
    //    ->Firestore.collection("chat_room")
    //    ->Firestore.add({
    //      name: "adil",
    //      age: 30,
    //    })
    //    ->Js.Promise.then_(value => value->Js.Promise.resolve, _)
    //    ->ignore

    firebase
    ->firestore
    ->Firestore.collection("chat_room")
    ->Firestore.doc("123")
    ->Firestore.onSnapshot((value: Firestore.DocRef.t) => {
      Js.log2("onSnapshot", value->Firestore.DocRef.data())
    })
    ->ignore
    None
  }, [])
  <div> {"Chat room"->Ru.s} </div>
}
