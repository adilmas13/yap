module Style= {
    open ReactDOMRe.Style;
    let parent = make(~height="100vh", ~display="flex", ~flexDirection="column", ~alignItems="center", ~justifyContent="center", ())
    let text= make(~fontSize="50px", ~color="gray", ~marginTop="10px", ~fontWeight="600", ())
}
@react.component
let make = () => {
    open Style;
    <div style={parent}>
        <img src={AssetLoader.dead} width="300px"/>
        <div style={text}>{"404 !! not found" -> Ru.s}</div>
    </div>
}
