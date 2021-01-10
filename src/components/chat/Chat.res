module Style = {
  open ReactDOMRe.Style
  let parent = make(~display="flex", ~flexDirection="column", ~height="100vh", ~padding="10px", ())
  let bodyParent = make(~display="flex", ~flexDirection="column", ~flex="1", ~overflow="scroll", ())

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

module ChatUiData = {
  type uiType =
    | Default
    | Secondary

  type t = {
    id: string,
    message: Message.t,
    me: bool,
    uiType: uiType,
  }

  let id = t => t.id
  let message = t => t.message
  let me = t => t.me
  let uiType = t => t.uiType

  let make = (message: Message.t, previousMessage: option<t>) => {
    {
      id: message->Message.id,
      message: message,
      me: message->Message.userId == UserDetails.userId(),
      uiType: {
        switch previousMessage {
        | None => Default
        | Some(prevMsg) =>
          message->Message.userId == prevMsg.message->Message.userId ? Secondary : Default
        }
      },
    }
  }
}

module ChatInput = {
  open Style.ChatInputStyle
  @react.component
  let make = (~id) => {
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
        message->ChatEngine.sendMessage(id)
        setMessage(_ => "")
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
      <input placeholder="type a message.." style={input} value={message} onChange onKeyDown />
      <img src={AssetLoader.send} style={sendBtnStyle} onClick={_ => sendMessage()} />
    </div>
  }
}

module MyChatBubble = {
  open Style.ChatBubbleStyle
  @react.component
  let make = (~message: ChatUiData.t) => {
    let msg = message->ChatUiData.message
    <div style={rightParent}> <div style={rightBubble}> {msg->Message.message->Ru.s} </div> </div>
  }
}

module OtherChatBubble = {
  open Style.ChatBubbleStyle
  open ReactDOMRe
  @react.component
  let make = (~message: ChatUiData.t) => {
    let imgStyle = {
      switch message->ChatUiData.uiType {
      | Default => userImage
      | Secondary => Style.combine(userImage, Style.make(~visibility="hidden", ()))
      }
    }
    let userNameStyle = {
      switch message->ChatUiData.uiType {
      | Default => userName
      | Secondary => Style.combine(userImage, Style.make(~display="none", ()))
      }
    }
    let msg = message->ChatUiData.message
    <div style={leftParent}>
      <img style={imgStyle} src={msg->Message.profile} />
      <div style={leftBubble}>
        <div style={userNameStyle}> {msg->Message.username->Ru.s} </div>
        {msg->Message.message->Ru.s}
      </div>
    </div>
  }
}

module Body = {
  type action = Loading | PreviousMessages(array<Message.t>) | NewMessage(array<Message.t>)

  type state = {messages: array<ChatUiData.t>}

  let defaultState: state = {
    messages: [],
  }

  let reducer = (state: state, action: action) => {
    switch action {
    | Loading => state
    | PreviousMessages(messages) => {
        let chatUiMessages = messages->Belt.Array.reduce([], (acc, msg) => {
          let newMsg = msg->ChatUiData.make(acc->Belt.Array.get(acc->Belt.Array.length - 1))
          acc->Belt.Array.concat([newMsg])
        })
        {...state, messages: chatUiMessages}
      }
    | NewMessage(messages) => {
        let lastMessage = state.messages->Belt.Array.get(state.messages->Belt.Array.length - 1)
        let newMessage = messages->Belt.Array.getUnsafe(0)->ChatUiData.make(lastMessage)
        let shouldAppend = switch lastMessage {
        | None => true
        | Some(msg) => newMessage->ChatUiData.id !== msg->ChatUiData.id
        }
        shouldAppend ? {...state, messages: state.messages->Belt.Array.concat([newMessage])} : state
      }
    }
  }

  open Style
  @react.component
  let make = (~id: string) => {
    let (state, dispatch) = React.useReducer(reducer, defaultState)

    let startListening = () =>
      id
      ->ChatEngine.listen
      ->Firebase.Firestore.onSnapshot1(querySnapshot => {
        querySnapshot
        ->Firebase.Firestore.QuerySnapshot.mapDataTo((msg, id) => msg->Message.decode(id))
        ->NewMessage
        ->dispatch
      })

    React.useEffect1(() => {
      open Firebase
      let unsubscribe = ref(None)
      ChatEngine.getLatestMessages(id)->Js.Promise.then_(querySnapshot => {
        querySnapshot
        ->Firestore.QuerySnapshot.mapDataTo((msg, id) => msg->Message.decode(id))
        ->PreviousMessages
        ->dispatch
        unsubscribe := Some(startListening())
        Js.Promise.resolve()
      }, _)->ignore
      Some(
        () => {
          switch unsubscribe.contents {
          | Some(unsub) => unsub()
          | None => ()
          }
        },
      )
    }, [])

    <div style={bodyParent}>
      {state.messages->Ru.map(message => {
        let key = message->ChatUiData.id
        switch message->ChatUiData.me {
        | true => <MyChatBubble key message />
        | false => <OtherChatBubble key message />
        }
      })}
    </div>
  }
}

@react.component
let make = (~id: string) => {
  open Style
  <div style={parent}> <Body id /> <ChatInput id /> </div>
}
