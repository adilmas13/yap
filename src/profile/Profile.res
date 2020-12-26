module Style = {
  open ReactDOMRe.Style
  let parent = make(~display="flex", ())
  let leftParent = make(
    ~display="flex",
    ~borderRadius="50px",
    ~width="30%",
    ~height="calc(100vh - 20px)",
    ~background="linear-gradient(180deg, #00d2ff, #3a7bd5)",
    ~justifyContent="center",
    ~alignItems="center",
    (),
  )
  let description = make(~fontSize="40px", ~color="white", ~fontWeight="600", ())

  let rightParent = make(~display="flex", ~alignItems="center", ~paddingLeft="20px", ())

  let text1 = make(~fontSize="70px", ())
}

module LeftSection = {
  @react.component
  let make = () => {
    open Style
    <div style={leftParent}> <div style={description}> {"Let's talk"->Ru.s} </div> </div>
  }
}

module RightSection = {
  @react.component
  let make = () => {
    let (title, setTitle) = React.useState(() => "")

    React.useEffect1(() => {
      let text = "my name is"

      text
      ->Js.String2.split("")
      ->Belt.Array.forEachWithIndex((index, char) => {
        Js.Global.setTimeout(() => {
          setTitle(current => Js.String2.concat(current, char))
        }, (index + 1) * 70)->ignore
      })

      None
    }, [])
    open Style
    <div style={rightParent}> <div style={text1}> {title->Ru.s} </div> </div>
  }
}

@react.component
let make = () => {
  open Style
  <div style={parent}> <LeftSection /> <RightSection /> </div>
}
