open Dom.Storage2

module Constants = {
  let username = "username"
  let avatar = "avatar"
  let userId = "userId"
}

let saveUsername = (name: string) => localStorage->setItem(Constants.username, name)

let saveAvatar = (avatar: string) => localStorage->setItem(Constants.avatar, avatar)

let saveUserId = (id: string) => {
  switch localStorage->getItem(Constants.userId) {
  | None => localStorage->setItem(Constants.userId, id)
  | Some(_) => ()
  }
}

let isLoggedIn = () => localStorage->getItem(Constants.userId)->Belt.Option.isSome

let username = (~default: string="", ()) =>
  localStorage->getItem(Constants.username)->Belt.Option.getWithDefault(default)

let userId = () => localStorage->getItem(Constants.userId)->Belt.Option.getWithDefault("xxx")

let avatar = () => localStorage->getItem(Constants.avatar)->Belt.Option.getWithDefault("")
