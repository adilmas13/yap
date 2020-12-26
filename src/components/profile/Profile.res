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
  let rightParent = make(
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
    ~transition="0.3s ease-out all",
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

  let logoWrapper = make(~display="flex", ~position="absolute", ~top="20px", ~left="20px", ~justifyContent="center", ())

  let logoText=make(~color="#fff", ~fontSize="25px", ~marginLeft="10px", ~fontWeight="600", ())
}

module LeftSection = {
  @react.component
  let make = () => {
    open Style
    <div style={leftParent}>
     <div style={description}> {"let's talk"->Ru.s} </div>
     <div style={logoWrapper}>
        <img src={AssetLoader.logo} width="50px"/>
        <div style={logoText}>{"yap !!"-> Ru.s}</div>
     </div>
     </div>
  }
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

module RightSection = {
  @react.component
  let make = () => {
    let (title, setTitle) = React.useState(() => "")
    let (name, setName) = React.useState(() => "")
    let (selectedAvatar, selectAvatar) = React.useState(() => -1)
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
      UserDetails.saveUsername(name)
      UserDetails.saveAvatar(AvatarCollection.avatars->Belt.Array.getUnsafe(selectedAvatar))
    }

    let avatarLayoutStyle = {
      if name->Js.String2.length > 0 {
        ReactDOMRe.Style.combine(Style.avatarWrapper, Style.avatarWrapperActive)
      } else {
        Style.avatarWrapper
      }
    }
    open Style
    <div style={rightParent}>
      <div style={centerWrapper}>
        <div style={text1}> {title->Ru.s} </div>
        <div style={inputWrapperStyle}>
          <input style={input} type_="text" placeholder="john doe" onChange />
          <div style={lineStyle} />
        </div>
      </div>
      <div style={avatarLayoutStyle}> <Avatar selectAvatar selectedAvatar /> </div>
      <div style={enterBtnStyle} onClick> <img src={AssetLoader.arrow} /> </div>
    </div>
  }
}

@react.component
let make = () => {
  open Style
  <div style={parent}> <LeftSection /> <RightSection /> </div>
}
