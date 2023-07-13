const logger = require("../lib/logger");
const socket = require("../lib/socket");
const fs = require('fs');

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

// api로 audio 쏘기
exports.sendAudio = async (fileName) => {
  const dotenv = require("dotenv");

  const { Configuration, OpenAIApi } = require("openai");
  dotenv.config();

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  try {
    // 오디오 파일을 읽어옵니다.
    const audioFile = fs.createReadStream(`./audio/${fileName}`);

    const Transcription = await openai.createTranscription(
      audioFile,
      "whisper-1"
    );
    
    const result = Transcription.data.text;

    // // 변환된 텍스트를 콘솔로 출력합니다.
    // logger.info(`(recordService.sendAudio.result) ${Transcription.data.text}`);

    return result;
  } catch (error) {
    logger.error(`(recordService.sendAudio.error) ${JSON.stringify(error)}`);
  }
};
