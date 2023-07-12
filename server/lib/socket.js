const logger = require("./logger");

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
