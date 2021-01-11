@bs.val @bs.scope(("window", "location"))
external location: string = "href"

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
  let description = make(~fontSize="40px", ~color="white", ())
  let chatDescWrapper = make(
    ~color="white",
    ~display="flex",
    ~flexDirection="column",
    ~alignItems="center",
    ~justifyContent="center",
    (),
  )
  let chatDesc = make(~fontSize="30px", ~color="white", ~padding="0 5px", ())
  let chatDescSecondary = make(~fontSize="18px", ~textAlign="center", ~padding="10px 5px", ())
  let orText = make(~margin="30px 0", ~fontSize="30px", ())

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

type screen = Profile | Home | Chat(string) | PageNotFound
module LeftSection = {
  @react.component
  let make = (~body) => {
    open Style
    <div style={leftParent}>
      {switch body {
      | Profile => <div style={description}> {"let's talk"->Ru.s} </div>
      | Home => <div style={description}> {"home"->Ru.s} </div>
      | Chat(id) =>
        <div style={chatDescWrapper}>
          <div style={chatDesc}> {"share link with others"->Ru.s} </div>
          <div style={chatDescSecondary}> {location->Ru.s} </div>
          <div style={orText}> {"- or -"->Ru.s} </div>
          <div style={chatDesc}> {"tell them to join with id"->Ru.s} </div>
          <div style={chatDescSecondary}> {id->Ru.s} </div>
        </div>
      | PageNotFound => <> </>
      }}
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
    | Home => "/home"->ReasonReactRouter.push
    | Chat(id) => ("/chat?id=" ++ id)->ReasonReactRouter.push
    }
  }

  let body = switch (UserDetails.isLoggedIn(), url.path, pendingRoute) {
  | (false, _, _) => Profile
  | (true, list{}, _)
  | (true, list{"profile"}, _)
  | (true, list{"home"}, _)
  | (true, list{"chat"}, Home) =>
    Home
  | (true, list{"chat"}, Chat(id)) => Chat(id)
  | (true, _, _)
  | _ =>
    PageNotFound
  }

  open Style
  <div style={parent}>
    <LeftSection body />
    <div style={bodyWrapper}>
      {switch body {
      | Profile => <Profile onSubmit />
      | Home => <Home />
      | Chat(id) => <Chat id />
      | PageNotFound => <PageNotFound />
      }}
    </div>
  </div>
}
