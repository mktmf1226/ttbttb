import { io } from "socket.io-client";

const socket = io(`192.168.0.71:8000`);

socket.on("connect", () => {
  console.log("Now Socket connected...");
});

socket.on("disconnect", () => {
  console.log("Now Socket disconnected...");
});

export default socket;

// export default class socketIO{
//   // 클라이언트에서 소켓 연결 설정
//   static initializeSocket() {
//     socket.on("connect", () => {
//       console.log("Now Socket connected...");
//     });

//     socket.on("disconnect", () => {
//       console.log("Now Socket disconnected...");
//     });

//     socket.on("recStart", (data) => {
//       console.log(data);
//     });

//     socket.on("recEnd", (data) => {
//       console.log(data);
//     });

//     socket.on("dbSave", (data) => {
//       console.log(data);
//     });

//     socket.on("discard", (data) => {
//       console.log(data);
//     });

//     socket.on("saveFile", (data) => {
//       console.log(data);
//     });
//   }
// }
