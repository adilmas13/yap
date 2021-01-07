@bs.scope("localStorage") @bs.val external getItem: string => Js.Nullable.t<string> = ""
@bs.scope("localStorage") @bs.val external setItem: (string, string) => unit = ""

module Constants = {
  let username = "username"
  let avatar = "avatar"
  let userId = "userId"
}

let saveUsername = (name: string) => Constants.username->setItem(name)

let saveAvatar = (avatar: string) => Constants.avatar->setItem(avatar)

let saveUserId = (id: string) => {
  switch Constants.userId->getItem->Js.Nullable.toOption {
  | None => Constants.userId->setItem(id)
  | Some(_) => ()
  }
}

let isLoggedIn = () => Constants.userId->getItem->Js.Nullable.toOption->Belt.Option.isSome

let username = () =>
  Constants.username->getItem->Js.Nullable.toOption->Belt.Option.getWithDefault("Anonymous User")

let userId = () =>
  Constants.userId->getItem->Js.Nullable.toOption->Belt.Option.getWithDefault("xxx")

let avatar = () => Constants.avatar->getItem->Js.Nullable.toOption->Belt.Option.getWithDefault("")
