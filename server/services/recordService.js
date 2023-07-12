const logger = require("../lib/logger");
const socket = require("../lib/socket");

// record start 소켓통신
exports.recordStart = () => {
  try {
    socket.recStart(io);    
    return "socket recStart successed";
  } catch (error) {
    logger.error(`(recordService.recordStart.error) ${JSON.stringify(error)}`);
    return error;
  }
};

// record end 소켓통신
exports.recordEnd = () => {
  try {
    socket.recEnd(io);
    return "socket recEnd successed";
  } catch (error) {
    logger.error(`(recordService.recordEnd.error) ${JSON.stringify(error)}`);
  }
};

// dbSave 소켓통신
exports.dbSave = () => {
  try {
    socket.recEnd(io);
    return "socket dbSave successed";
  } catch (error) {
    logger.error(`(recordService.dbSave.error) ${JSON.stringify(error)}`);
  }
};

// discard 소켓통신
exports.discard = () => {
  try {
    socket.recEnd(io);
    return "socket discard successed";
  } catch (error) {
    logger.error(`(recordService.discard.error) ${JSON.stringify(error)}`);
  }
};

// saveFile 소켓통신
exports.saveFile = () => {
  try {
    socket.recEnd(io);
    return "socket saveFile successed";
  } catch (error) {
    logger.error(`(recordService.saveFile.error) ${JSON.stringify(error)}`);
  }
};
