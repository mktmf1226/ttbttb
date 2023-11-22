const logger = require("./logger");
const test = require("../test/daseul");

const recStart = (socket) => {
  socket.emit("recStart", "recording has started");
};

const recEnd = (socket) => {
  socket.emit("recEnd", "recording has ended");
};

const dbSave = (socket) => {
  socket.emit("dbSave", "sentence has saved");
};

const discard = (socket) => {
  socket.emit("discard", "sentence has discarded");
};

const saveFile = (socket) => {
  socket.emit("saveFile", "faile has saved");
};

const socketHandler = (io) => {
  io.on("connect", (socket) => {
    // 소켓 연결이 성공했을 때의 로직
    logger.info(`socket connect success`);

    socket.on("gotoapi", (data) => {
      const params = data;
      console.log(params.msg);
      console.log(params.audio);

      // 디코딩하기
      // 소켓 전송을 위한 Base64에 기반한 String to Blob 디코딩
      function base64ToBlob(base64String, mimeType) {
        const byteCharacters = atob(base64String);
        const byteArrays = [];
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays.push(byteCharacters.charCodeAt(i));
        }
        const byteArray = new Uint8Array(byteArrays);
        return new Blob([byteArray], { type: mimeType });
      }

      const audioBlob2 = base64ToBlob(params.audio, "audio/webm");
      console.log("( audioBlob2 )",audioBlob2);
      // console.log(audioBlob2);

      // const audioFile = new Blob([params.audio], { type: "audio/webm" });

      // console.log(audioFile.size); // Blob 데이터의 크기 출력
      // console.log(audioFile.type); // Blob 데이터의 MIME 타입 출력

      // 비즈니스 로직 수행
      const result = test.transcribe(audioBlob2);
    });
  }).on("error", (err) => {
    logger.error(`socket connect err:`, err);
  });
};

module.exports = {
  recStart,
  recEnd,
  dbSave,
  discard,
  saveFile,
  socketHandler,
};
