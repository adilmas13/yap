module Style = {
  open ReactDOMRe.Style
  let parent = make(~display="flex", ~alignItems="center", ~height="100vh", ~padding="0 10px", ())

  let leftParent = make(
    ~display="flex",
    ~borderRadius="50px",
    ~width="25%",
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

  let bodyWrapper = make(~flex="1", ())
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

type pendingRoute = Chat(string) | Home

@react.component
let make = () => {
  let url = ReasonReactRouter.useUrl()

  let pendingRoute = {
    switch url.path {
    | list{"chat"} => {
        let chatId =
          url.search
          ->Js.String2.split("&")
          ->Belt.Array.getBy(it => it->Js.String2.startsWith("id="))
        switch chatId {
        | Some(value) =>
          value->Js.String2.substringToEnd(~from=value->Js.String2.indexOf("=") + 1)->Chat
        | None => Home
        }
      }
    | _ => Home
    }
  }

  let onSubmit = () => {
    switch pendingRoute {
    | Home => ReasonReactRouter.push("/home")
    | Chat(id) => ReasonReactRouter.push("/chat?id=" ++ id)
    }
  }

  let body = switch (UserDetails.isLoggedIn(), url.path, pendingRoute) {
  | (false, _, _) => <Profile onSubmit />
  | (true, list{}, _)
  | (true, list{"profile"}, _) =>
    <Home />
  | (true, list{"home"}, _) => <Home />
  | (true, list{"chat"}, Home) => <Home />
  | (true, list{"chat"}, Chat(id)) => <Chat id />
  | (true, _, _) => <PageNotFound />
  | _ => <PageNotFound />
  }

  open Style
  <div style={parent}> <LeftSection /> <div style={bodyWrapper}> {body} </div> </div>
}
