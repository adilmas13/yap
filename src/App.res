@react.component
let make = () => {
     let url = ReasonReactRouter.useUrl();
          Js.log2("route", url.path -> Belt.List.length)
//     switch url.path {
//     | list{"profile"} => <Profile/>
//     | _ => <Profile/>
//     }
<Profile/>
}
