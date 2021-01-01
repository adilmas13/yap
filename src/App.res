module Style = {
  open ReactDOMRe.Style
  let parent = make(~display="flex", ~alignItems="center", ~height="100vh", ~padding="0 10px", ())

  let leftParent = make(
    ~display="flex",
    ~borderRadius="50px",
    ~width="30%",
    ~height="calc(100vh - 20px)",
    ~background="linear-gradient(180deg, #00d2ff, #3a7bd5)",
    ~justifyContent="center",
    ~alignItems="center",
    ~position="relative",
    (),
  )
  let description = make(~fontSize="40px", ~color="white", ~fontWeight="600", ())

  let logoWrapper = make(
    ~display="flex",
    ~position="absolute",
    ~top="20px",
    ~left="20px",
    ~justifyContent="center",
    (),
  )

  let logoText = make(~color="#fff", ~fontSize="25px", ~marginLeft="10px", ~fontWeight="600", ())
}

module LeftSection = {
  @react.component
  let make = () => {
    open Style
    <div style={leftParent}>
      <div style={description}> {"let's talk"->Ru.s} </div>
      <div style={logoWrapper}>
        <img src={AssetLoader.logo} width="50px" /> <div style={logoText}> {"yap !!"->Ru.s} </div>
      </div>
    </div>
  }
}

@react.component
let make = () => {
  let url = ReasonReactRouter.useUrl()
  let body = switch url.path {
  | list{}
  | list{"profile"} =>
    <Profile />
  | list{"chat"} => <Chat />
  | _ => <PageNotFound />
  }

  open Style
  <div style={parent}> <LeftSection /> {body} </div>
}
