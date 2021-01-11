module Style = {
  open ReactDOMRe.Style
  let parent = make(
    ~display="flex",
    ~flexDirection="column",
    ~height="100vh",
    ~padding="10px",
    ~position="relative",
    (),
  )
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

  let notValidAndLoadingChatRoomParent = make(
    ~background="rgba(255, 255, 255, 0.8)",
    ~position="absolute",
    ~top="0",
    ~bottom="0",
    ~right="0",
    ~left="0",
    ~display="flex",
    ~alignItems="center",
    ~justifyContent="center",
    ~flexDirection="column",
    (),
  )

  let invalidIcon = make(~width="200px", ())
  let invalidText = make(~fontSize="34px", ~marginTop="16px", ())
  let loadingText = make(~fontSize="50px", ())
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
    | NewMessage(messages) =>
      switch messages->Belt.Array.get(0) {
      | Some(msg) => {
          let lastMessage = state.messages->Belt.Array.get(state.messages->Belt.Array.length - 1)
          let newMessage = msg->ChatUiData.make(lastMessage)
          let shouldAppend = switch lastMessage {
          | None => true
          | Some(msg) => newMessage->ChatUiData.id !== msg->ChatUiData.id
          }
          shouldAppend
            ? {...state, messages: state.messages->Belt.Array.concat([newMessage])}
            : state
        }
      | None => state
      }
    }
  }

  open Style
  @react.component
  let make = (~id: string, ~onChatReady = () => ()) => {
    let scrollerRef = React.useRef(Js.Nullable.null)
    let (state, dispatch) = React.useReducer(reducer, defaultState)

    let scrollToBottom = () => {
      open Webapi
      let element = scrollerRef.current->Js.Nullable.toOption->Belt.Option.getUnsafe
      let scrollTop = element->Dom.Element.scrollTop->int_of_float
      let scrollHeight = element->Dom.Element.scrollHeight->Js.Int.toFloat
      element->Webapi.Dom.Element.setScrollTop(scrollHeight)
    }

    React.useEffect1(() => {
      let subscription =
        id
        ->ChatEngine.getLatestMessages
        ->Ru.tapNext(messages => messages->PreviousMessages->dispatch)
        ->Rx.Operators.switchMapn(_ => id->ChatEngine.listen, _)
        ->Ru.onNextError(
          ~next=messages => {
            messages->NewMessage->dispatch
            scrollToBottom()
            onChatReady()
          },
          ~error=_ => (),
          _,
        )
      Some(
        () => {
          subscription->Rx.Subscription.unsubscribe
        },
      )
    }, [])

    <div style={bodyParent} ref={scrollerRef->ReactDOM.Ref.domRef}>
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

module NotValidChatRoom = {
  open Style
  @react.component
  let make = () => {
    <div style={notValidAndLoadingChatRoomParent}>
      <img src={AssetLoader.caution} style={invalidIcon} />
      <div style={invalidText}> {"Chat room doesn't exist"->Ru.s} </div>
    </div>
  }
}

module LoadingChat = {
  @react.component
  let make = () => {
    open Style
    <div style={ReactDOM.Style.combine(notValidAndLoadingChatRoomParent, loadingText)}>
      {"getting ready !!"->Ru.s}
    </div>
  }
}

type state = InitialLoad | ChatLoading | Invalid | Ready

@react.component
let make = (~id: string) => {
  let (state, setState) = React.useState(() => InitialLoad)

  React.useEffect1(() => {
    id
    ->ChatEngine.isChatRoomExisting
    ->Ru.onNextError(
      ~next=isExisting => setState(_ => isExisting ? ChatLoading : Invalid),
      ~error=_ => (),
    )
    ->ignore
    None
  }, [])
  let onChatReady = () => setState(_=>Ready)
  open Style
  <div style={parent}>
    {switch state {
    | InitialLoad => <LoadingChat />
    | ChatLoading => <> <Body id onChatReady /> <ChatInput id /> <LoadingChat /> </>
    | Ready => <> <Body id /> <ChatInput id /> </>
    | Invalid => <NotValidChatRoom />
    }}
  </div>
}
