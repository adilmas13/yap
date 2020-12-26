@bs.scope("localStorage") @bs.val external getItem: unit => string = "random"
@bs.scope("localStorage") @bs.val external setItem: (string, string) => unit = "";
// let someNumber = random()


let saveUsername = (name:string) => setItem("username", name)
