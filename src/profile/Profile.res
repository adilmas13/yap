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
  let description = make(~fontSize="40px", ~color="white", ~fontWeight="600", ());
}

module LeftSection = {
  @react.component
  let make = () => {
    open Style
    <div style={leftParent}>
      <div style={description}>
      {"Let's talk" -> Ru.s}
      </div>
    </div>
  }
}

@react.component
let make = () => {
  open Style
  <div style={parent}>
    <LeftSection/>
  </div>
}
