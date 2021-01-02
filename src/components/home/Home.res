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
    ~height="200px",
    ~width="200px",
    ~borderRadius="10px",
    ~border="1px solid #ccc",
    ~cursor="pointer",
    ~alignItems="center",
    ~justifyContent="center",
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

  let choiceIcon = make(~width="100px", ())

  let startConversationIcon = make(~marginLeft="20px", ())
}

module StartNewConvesation = {
  open Style
  @react.component
  let make = () => {
    <div style={choice}>
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
    <div style={choice}>
      <img style={choiceIcon} src={AssetLoader.groupChat} />
      <div style={choiceTitle}> {"join a conversation"->Ru.s} </div>
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
