module Style = {
  open ReactDOMRe.Style

  let parent = make(~display="flex", ~flexDirection="column", ~height="100vh", ~padding="10px", ())
  let bodyParent = make(~display="flex", ~flexDirection="column", ~flex="1", ())

  module ChatInputStyle = {
    let chatInputParent = make(
      ~width="100%",
      ~height="60px",
      ~display="flex",
      ~alignItems="flex-end",
      (),
    )

    let input = make(
      ~flex="1",
      ~outline="none",
      ~border="none",
      ~borderRadius="100px",
      ~background="#e6e6e6",
      ~marginRight="10px",
      ~height="50px",
      ~padding="0 15px",
      ~fontSize="16px",
      (),
    )

    let enterBtn = make(
      ~borderRadius="50%",
      ~background="linear-gradient(0deg, #00d2ff, #3a7bd5)",
      ~height="50px",
      ~width="50px",
      ~cursor="none",
      ~transition="0.2s ease-out all",
      ~pointerEvents="none",
      ~padding="10px",
      ~transform="rotate(45deg)",
      (),
    )
  }
}

module ChatInput = {
  open Style.ChatInputStyle
  @react.component
  let make = () => {
    <div style={chatInputParent}>
      <input placeholder="type a message.." style={input} /> <img src={AssetLoader.send} style={enterBtn} />
    </div>
  }
}

module Body = {
  open Style
  @react.component
  let make = () => {
    <div style={bodyParent} />
  }
}
@react.component
let make = () => {
  open Style
  <div style={parent}> <Body /> <ChatInput /> </div>
}

/*
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

*/
