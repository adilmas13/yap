'use strict';


var avatars = [
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Falien%20(1).svg?alt=media&token=520d2673-6b47-41d2-bab8-81d5acc544c3",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Falien.svg?alt=media&token=4a7ec0d1-dc3b-4db5-aac7-3143c6059ce4",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fangry.svg?alt=media&token=d6800d5d-d19b-412a-80fd-8c149692b979",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fbatman.svg?alt=media&token=d73a36cc-3acf-4ef3-918f-b2edf7fd38a1",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fboy.svg?alt=media&token=b99944d0-b27e-4a3d-9e72-1487ef65077b",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fdeadpool.svg?alt=media&token=55a722ec-9fae-4acc-95ae-c02ee1c658eb",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fdog.svg?alt=media&token=13dcff71-3956-4cb1-8435-2eba4692dbd5",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fgeek.svg?alt=media&token=8632f23f-248b-4ed4-9308-13d32bfdfc8f",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fgirl%20(1).svg?alt=media&token=1a7b988f-a2e4-41ff-bf7b-39d8dbea3334",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fgirl.svg?alt=media&token=58812b62-b413-4eba-9413-c5520bbb467a",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fnerd%20(1).svg?alt=media&token=c72c850f-2c55-48d8-86e6-47d9b60ea14f",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fnerd%20(2).svg?alt=media&token=5e7be22c-610d-4225-b221-74a0c3b5c528",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fnerd.svg?alt=media&token=80eeed24-8066-4075-8e2b-f1b32a642141",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fpanda.svg?alt=media&token=efd0357e-a83a-46a9-b5ec-ca452ac8e520",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fsuperhero%20(1).svg?alt=media&token=ac81d970-b582-4a69-9b40-f94ff7591c3f",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fsuperhero%20(2).svg?alt=media&token=c52d13ed-d9d5-423a-8ade-7fa0884f8132",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fsuperhero.svg?alt=media&token=ff5701b8-5bfa-493c-aad3-67ef02c9a322",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fman.svg?alt=media&token=16fabab2-db8d-481c-af68-d733ecb6e01d",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Fpikachu.svg?alt=media&token=a2298660-5677-47a4-8037-1b870b272ae9",
  "https://firebasestorage.googleapis.com/v0/b/yap-app-d4a5a.appspot.com/o/avatars%2Ftourist.svg?alt=media&token=1b6dfe81-734d-489c-85a5-d06e6535b78e"
];

exports.avatars = avatars;
/* No side effect */