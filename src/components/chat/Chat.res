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
      ~padding="0 25px",
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
      ~opacity="0.2",
      (),
    )

    let enterBtnActive = make(~cursor="pointer", ~pointerEvents="all", ~opacity="1", ())
  }

  module ChatBubbleStyle = {
    let rightParent = make(~display="flex", ~justifyContent="flex-end", ~marginBottom="5px", ())
    let rightBubble = make(
      ~padding="5px 20px",
      ~borderRadius="20px",
      ~background="linear-gradient(20deg, #00d2ff, #3a7bd5)",
      ~width="fit-content",
      ~color="#ffffff",
      (),
    )

    let leftParent = make(~display="flex", ~marginBottom="5px", ())
    let leftBubble = make(
      ~display="flex",
      ~flexDirection="column",
      ~padding="5px 20px",
      ~borderRadius="20px",
      ~background="#e5e5e5",
      ~width="fit-content",
      ~color="#000000",
      (),
    )

    let userName = make(~fontSize="12px", ~fontWeight="600", ~color="#3a7bd5", ())
    let userImage = make(
      ~width="35px",
      ~height="35px",
      ~borderRadius="50%",
      ~marginRight="10px",
      (),
    )
  }
}

module ChatInput = {
  open Style.ChatInputStyle
  @react.component
  let make = () => {
    let (message, setMessage) = React.useState(() => "")

    let sendBtnStyle = {
      switch message->Js.String2.trim->Js.String2.length > 0 {
      | true =>
        ReactDOMRe.Style.combine(Style.ChatInputStyle.enterBtn, Style.ChatInputStyle.enterBtnActive)
      | false => Style.ChatInputStyle.enterBtn
      }
    }

    let sendMessage = () => {
      if message->Js.String2.trim->Js.String2.length > 0 {
        // TODO: send message implementation
        ()
      }
    }

    let onChange = (e: ReactEvent.Form.t): unit => {
      e->ReactEvent.Form.stopPropagation
      let target = e->ReactEvent.Form.target
      setMessage(_ => target["value"])
    }

    let onKeyDown = (e: ReactEvent.Keyboard.t) => {
      e->ReactEvent.Keyboard.stopPropagation
      let key = e->ReactEvent.Keyboard.keyCode
      if key == 13 {
        sendMessage()
      }
    }

    <div style={chatInputParent}>
      <input placeholder="type a message.." style={input} onChange onKeyDown />
      <img src={AssetLoader.send} style={sendBtnStyle} onClick={_ => sendMessage()} />
    </div>
  }
}

module MyChatBubble = {
  open Style.ChatBubbleStyle
  @react.component
  let make = () => {
    <div style={rightParent}> <div style={rightBubble}> {"message"->Ru.s} </div> </div>
  }
}

module OtherChatBubble = {
  open Style.ChatBubbleStyle
  @react.component
  let make = () => {
    <div style={leftParent}>
      <img style={userImage} src={AvatarCollection.avatars->Belt.Array.getUnsafe(0)} />
      <div style={leftBubble}>
        <div style={userName}> {"adil shaikh"->Ru.s} </div> {"message"->Ru.s}
      </div>
    </div>
  }
}

module Body = {
  open Style
  @react.component
  let make = () => {
    <div style={bodyParent}> <MyChatBubble /> <OtherChatBubble /> </div>
  }
}

@react.component
let make = (~id:string) => {
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
