@bs.scope("localStorage") @bs.val external getItem: unit => string = "random"
@bs.scope("localStorage") @bs.val external setItem: (string, string) => unit = "";

module Constants = {
    let username = "username"
    let avatar = "avatar"
}

let saveUsername = (name:string) => setItem(Constants.username, name)

let saveAvatar = (avatar:string) => setItem(Constants.avatar, avatar)
