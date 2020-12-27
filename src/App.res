@react.component
let make = () => {
     let url = ReasonReactRouter.useUrl();
     switch url.path {
     | list{}
     | list{"profile"} => <Profile/>
     | _ => <PageNotFound/>
     }

}
