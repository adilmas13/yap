module Style = {
  open ReactDOMRe.Style
  let parent = make(
    ~height="100%",
    ~width="100%",
    ~display="flex",
    ~alignItems="center",
    ~justifyContent="center",
    ~flexDirection="column",
    (),
  )
  let title = make(~fontSize="4rem", ())
  let optionWrapper = make(~display="flex", ~alignItems="center", ~marginTop="10px", ())
  let orText = make(~fontSize="2rem", ~padding="0 20px", ())
  let choice = make(
    ~display="flex",
    ~flexDirection="column",
    ~height="250px",
    ~width="250px",
    ~borderRadius="10px",
    ~border="1px solid #ccc",
    ~cursor="pointer",
    ~alignItems="center",
    ~justifyContent="center",
    ~position="relative",
    (),
  )
  let choiceTitle = make(
    ~width="100%",
    ~textAlign="center",
    ~fontSize="1.1rem",
    ~fontWeight="600",
    ~marginTop="5px",
    (),
  )
  let choiceIcon = make(~width="120px", ())
  let startConversationIcon = make(~marginLeft="20px", ())
  let joinConversationParent = make(~perspective="1000px", ~width="250px", ~height="250px", ())
  let joinConversationWrapper = make(
    ~position="relative",
    ~width="100%",
    ~height="100%",
    ~transition="transform 0.6s",
    ~transformStyle="preserve-3d",
    (),
  )
  let panel = make(
    ~position="absolute",
    ~width="100%",
    ~height="100%",
    ~background="#fafafa",
    ~borderRadius="10px",
    ~border="1px solid #ccc",
    ~backfaceVisibility="hidden",
    ~padding="0 10px",
    (),
  )
  let frontPanel = make(
    ~display="flex",
    ~flexDirection="column",
    ~alignItems="center",
    ~justifyContent="center",
    ~cursor="pointer",
    (),
  )
  let backPanel = make(
    ~transform="rotateY(180deg)",
    ~display="flex",
    ~flexDirection="column",
    ~justifyContent="center",
    ~alignItems="center",
    ~cursor="pointer",
    (),
  )
  let enterId = make(~width="100%", ~textAlign="center", ~fontSize="1.1rem", ~fontWeight="600", ())
  let input = make(
    ~border="none",
    ~outline="none",
    ~width="100%",
    ~textAlign="center",
    ~background="transparent",
    ~fontSize="18px",
    ~borderBottom="2px solid #3a7bd5",
    ~color="black",
    ~opacity="0.70",
    ~marginTop="15px",
    ~marginBottom="15px",
    (),
  )
  let active = make(~transform="rotateY(180deg)", ())
  let enterBtn = make(
    ~borderRadius="50%",
    ~background="linear-gradient(0deg, #00d2ff, #3a7bd5)",
    ~height="40px",
    ~width="40px",
    ~marginTop="10px",
    ~cursor="none",
    ~transition="0.2s ease-out all",
    ~pointerEvents="none",
    ~padding="10px",
    ~transform="rotate(180deg)",
    ~opacity="0.2",
    (),
  )
  let enterBtnActive = make(~cursor="pointer", ~pointerEvents="all", ~opacity="1", ())
}

module StartNewConvesation = {
  open Style
  @react.component
  let make = () => {
    let createChatRoom = (e: ReactEvent.Mouse.t) => {
      e->ReactEvent.Mouse.stopPropagation
      ChatEngine.createChatRoom()
      ->Ru.onNextError(~next=id => ("/chat?id=" ++ id)->ReasonReactRouter.push, ~error=_ => ())
      ->ignore
    }

    <div style={choice} onClick=createChatRoom>
      <img
        style={ReactDOMRe.Style.combine(choiceIcon, startConversationIcon)}
        src={AssetLoader.startChat}
      />
      <div style={choiceTitle}> {"start new conversation"->Ru.s} </div>
    </div>
  }
}

module JoinConvesation = {
  open Style
  @react.component
  let make = () => {
    let (isActive, setActive) = React.useState(() => false)
    let (id, setId) = React.useState(() => "")

    let joinConversationStyle = {
      open ReactDOMRe.Style
      switch isActive {
      | true => combine(Style.joinConversationWrapper, Style.active)
      | false => Style.joinConversationWrapper
      }
    }

    let enterBtnStyle = {
      open ReactDOMRe.Style
      switch id->Js.String2.trim->Js.String2.length < 1 {
      | true => Style.enterBtn
      | false => combine(Style.enterBtn, Style.enterBtnActive)
      }
    }

    let onClick = e => {
      e->ReactEvent.Synthetic.stopPropagation
      setActive(active => !active)
    }

    let onChange = (e: ReactEvent.Form.t): unit => {
      e->ReactEvent.Form.stopPropagation
      let target = e->ReactEvent.Form.target
      let value = target["value"]->Js.String2.trim
      setId(_ => value)
    }

    let redirect = () => {
      let sanitizedId = id->Js.String2.trim
      if sanitizedId->Js.String2.length > 3 {
        ("/chat?id=" ++ sanitizedId)->ReasonReactRouter.push
      }
    }

    let enterClick = (e: ReactEvent.Mouse.t) => {
      e->ReactEvent.Mouse.stopPropagation
      redirect()
    }

    let onKeyDown = (e: ReactEvent.Keyboard.t) => {
      e->ReactEvent.Keyboard.stopPropagation
      let key = e->ReactEvent.Keyboard.keyCode
      if key == 13 {
        redirect()
      }
    }

    <div style={joinConversationParent}>
      <div style=joinConversationStyle onClick>
        <div style={ReactDOMRe.Style.combine(panel, frontPanel)}>
          <img style={choiceIcon} src={AssetLoader.groupChat} />
          <div style={choiceTitle}> {"join a conversation"->Ru.s} </div>
        </div>
        <div style={ReactDOMRe.Style.combine(panel, backPanel)}>
          <div style={enterId}> {"enter chat id"->Ru.s} </div>
          <input
            placeholder="id"
            style={input}
            onChange
            onKeyDown
            onClick={e => e->ReactEvent.Mouse.stopPropagation}
          />
          <img style={enterBtnStyle} src={AssetLoader.arrow} onClick=enterClick />
        </div>
      </div>
    </div>
  }
}

@react.component
let make = () => {
  open Style
  <div style={parent}>
    <div style={title}> {"i would like to"->Ru.s} </div>
    <div style={optionWrapper}>
      <StartNewConvesation /> <div style={orText}> {"- or -"->Ru.s} </div> <JoinConvesation />
    </div>
  </div>
}
