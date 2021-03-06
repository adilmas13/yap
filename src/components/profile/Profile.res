module Style = {
  open ReactDOMRe.Style

  let parent = make(
    ~display="flex",
    ~flexDirection="column",
    ~paddingLeft="20px",
    ~position="relative",
    ~height="100vh",
    ~width="100%",
    ~justifyContent="center",
    (),
  )
  let text1 = make(~fontSize="4rem", ~transition="0.3s ease-out all", ())
  let centerWrapper = make(~display="flex", ())
  let inputWrapper = make(
    ~position="relative",
    ~display="flex",
    ~justifyContent="center",
    ~flexDirection="column",
    ~marginLeft="10px",
    ~opacity="0",
    ~transition="0.3s ease-out all",
    ~transitionDelay="0.5s",
    ~height="95px",
    (),
  )
  let input = make(
    ~border="none",
    ~outline="none",
    ~fontSize="4rem",
    ~background="transparent",
    ~color="black",
    ~opacity="0.70",
    (),
  )
  let line = make(
    ~width="0",
    ~height="4px",
    ~background="linear-gradient(90deg, #3a7bd5, #00d2ff)",
    ~transition="0.5s ease-out all",
    ~transitionDelay="0.5s",
    ~position="absolute",
    ~bottom="4px",
    ~borderRadius="5px",
    (),
  )
  let enterBtn = make(
    ~borderRadius="50%",
    ~background="linear-gradient(0deg, #00d2ff, #3a7bd5)",
    ~height="70px",
    ~width="70px",
    ~bottom="20px",
    ~right="20px",
    ~position="absolute",
    ~cursor="pointer",
    ~transition="0.2s ease-out all",
    ~transform="scale(0)",
    ~opacity="0",
    ~pointerEvents="none",
    ~padding="20px",
    (),
  )
  let enterBtnActive = make(
    ~transform="scale(1) rotate(180deg)",
    ~pointerEvents="all",
    ~opacity="1",
    (),
  )
  let avatarParent = make(~display="flex", ~flexDirection="column", ())
  let avatarTitle = make(~fontSize="4rem", ())
  let avatarList = make(
    ~display="grid",
    ~gridTemplateColumns="auto auto auto auto auto",
    ~justifyContent="flex-start",
    ~gridGap="20px",
    ~paddingLeft="50px",
    (),
  )
  let avatarItem = make(
    ~display="flex",
    ~width="100px",
    ~height="100px",
    ~borderRadius="10px",
    ~alignItems="center",
    ~justifyContent="center",
    ~cursor="pointer",
    ~transition="0.3s ease-out all",
    ~border="2px solid transparent",
    (),
  )
  let avatarSelected = make(~border="2px solid #3a7bd5", ())
  let avatarImg = make(~width="70px", ())
  let avatarWrapperActive = make(~opacity="1", ())
  let avatarWrapper = make(~opacity="0", ~transition="0.3s ease-out all", ())
}

module AvatarItem = {
  open Style
  @react.component
  let make = (~avatar: string, ~isSelected: bool, ~onSelected: unit => unit) => {
    let avatarStyle = {
      if isSelected {
        ReactDOMRe.Style.combine(Style.avatarItem, Style.avatarSelected)
      } else {
        Style.avatarItem
      }
    }
    <div style={avatarStyle} onClick={_ => onSelected()}>
      <img src={avatar} style={avatarImg} />
    </div>
  }
}

module Avatar = {
  open Style
  @react.component
  let make = (~selectAvatar, ~selectedAvatar) => {
    <div style={avatarParent}>
      <div style={avatarTitle}> {"> select an avatar"->Ru.s} </div>
      <div style={avatarList}>
        {AvatarCollection.avatars->Ru.mapi((index, avatar) =>
          <AvatarItem
            key={index->string_of_int}
            avatar
            isSelected={selectedAvatar === index}
            onSelected={_ => selectAvatar(_ => index)}
          />
        )}
      </div>
    </div>
  }
}

@react.component
let make = (~onSubmit: unit => unit) => {
  let (title, setTitle) = React.useState(() => "")
  let (name, setName) = React.useState(() => UserDetails.username())
  let (selectedAvatar, selectAvatar) = React.useState(() =>
    AvatarCollection.avatars
    ->Belt.Array.getIndexBy(it => it == UserDetails.avatar())
    ->Belt.Option.getWithDefault(-1)
  )
  let (isInputVisible, setInputVisible) = React.useState(() => false)

  React.useEffect1(() => {
    let text = "> my name is"

    text
    ->Js.String2.split("")
    ->Belt.Array.forEachWithIndex((index, char) => {
      Js.Global.setTimeout(() => {
        setTitle(current => Js.String2.concat(current, char))
        if index == text->Js.String2.length - 1 {
          setInputVisible(_ => true)
        }
      }, (index + 1) * 70)->ignore
    })

    None
  }, [])

  let inputWrapperStyle = {
    if isInputVisible {
      ReactDOMRe.Style.combine(Style.inputWrapper, ReactDOMRe.Style.make(~opacity="1", ()))
    } else {
      Style.inputWrapper
    }
  }

  let lineStyle = {
    if isInputVisible {
      ReactDOMRe.Style.combine(Style.line, ReactDOMRe.Style.make(~width="100%", ()))
    } else {
      Style.line
    }
  }

  let enterBtnStyle = {
    switch (name->Js.String2.length, selectedAvatar > -1) {
    | (0, _)
    | (_, false) => Style.enterBtn
    | (_, true) => ReactDOMRe.Style.combine(Style.enterBtn, Style.enterBtnActive)
    }
  }

  let onChange = (e: ReactEvent.Form.t): unit => {
    e->ReactEvent.Form.stopPropagation
    let target = e->ReactEvent.Form.target
    let value = target["value"]->Js.String2.trim
    setName(_ => value)
  }

  let onClick = (e: ReactEvent.Mouse.t): unit => {
    e->ReactEvent.Mouse.stopPropagation
    Js.Date.now()->Js.Float.toString->UserDetails.saveUserId
    name->UserDetails.saveUsername
    AvatarCollection.avatars->Belt.Array.getUnsafe(selectedAvatar)->UserDetails.saveAvatar
    onSubmit()
  }

  let avatarLayoutStyle = {
    if name->Js.String2.length > 0 {
      ReactDOMRe.Style.combine(Style.avatarWrapper, Style.avatarWrapperActive)
    } else {
      Style.avatarWrapper
    }
  }

  open Style
  <div style={parent}>
    <div style={centerWrapper}>
      <div style={text1}> {title->Ru.s} </div>
      <div style={inputWrapperStyle}>
        <input style={input} type_="text" placeholder="john doe" value={name} onChange />
        <div style={lineStyle} />
      </div>
    </div>
    <div style={avatarLayoutStyle}> <Avatar selectAvatar selectedAvatar /> </div>
    <div style={enterBtnStyle} onClick> <img src={AssetLoader.arrow} /> </div>
  </div>
}
