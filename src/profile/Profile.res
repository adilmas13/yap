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
  let text1 = make(~fontSize="70px", ~transition="0.3s ease-out all", ())
  let centerWrapper = make(~display="flex", ())
  let inputWrapper = make(~display="flex", ~flexDirection="column", ~marginLeft="10px", ~opacity="0", ~transition="0.3s ease-out all", ~transitionDelay="0.5s", ())
  let input = make(~border="none", ~outline="none", ~fontSize="70px", ())
  let line = make(~width="0", ~height="4px", ~backgroundColor="black", ~transition="0.3s ease-out all", ~transitionDelay="0.5s", () )
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
    let (isInputVisible, setInputVisible) = React.useState(() => false)

    React.useEffect1(() => {
      let text = "my name is"

      text
      ->Js.String2.split("")
      ->Belt.Array.forEachWithIndex((index, char) => {
        Js.Global.setTimeout(() => {
          setTitle(current => Js.String2.concat(current, char))
          if(index == text->Js.String2.length - 1) {
            setInputVisible(_ => true)
          }
        }, (index + 1) * 70)->ignore
      })

      None
    }, [])

    let inputWrapperStyle = {
        if(isInputVisible){
            ReactDOMRe.Style.combine(Style.inputWrapper, ReactDOMRe.Style.make(~opacity="1", ()))
        }else{
            Style.inputWrapper
        }
    }

    let lineStyle = {
            if(isInputVisible){
                ReactDOMRe.Style.combine(Style.line, ReactDOMRe.Style.make(~width="100%", ()))
            }else{
                Style.line
            }
        }
    open Style
    <div style={rightParent}>
      <div style={centerWrapper}>
        <div style={text1}> {title->Ru.s} </div>
        <div style={inputWrapperStyle}>
          <input style={input} type_="text" placeholder="John Doe" />
          <div style={lineStyle}/>
        </div>
      </div>
    </div>
  }
}

@react.component
let make = () => {
  open Style
  <div style={parent}> <LeftSection /> <RightSection /> </div>
}
