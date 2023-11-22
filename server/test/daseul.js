
const fs = require("fs");
const stream = require("stream");

// api 호출하기 전 파일만들기
const saveBlobToFile = async (blob, filePath) => {
  // 파일로 저장
  const fileStream = fs.createWriteStream(filePath);
  blob.stream().pipe(fileStream);

  fileStream.on("finish", () => {
    console.log("파일이 성공적으로 저장되었습니다.");
  });

  fileStream.on("error", (err) => {
    console.error("파일 저장 중 오류 발생:", err);
  });
};

function createFile(audioBlob) {
  const currentTimestamp = Date.now();
  const fileName = `audio_${currentTimestamp}.webm`;
  const filePath = `./audio/${fileName}`;
  saveBlobToFile(audioBlob, filePath);
}

// api 호출하기
exports.transcribe = async (audioBlob) => {
  const dotenv = require("dotenv");

  const { Configuration, OpenAIApi } = require("openai");
  dotenv.config();

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    createFile(audioBlob);

    // const Transcription = await openai.createTranscription(
    //   newFile,
    //   "whisper-1"
    // );

    // 변환된 텍스트를 콘솔로 출력합니다.
    console.log(Transcription.data.text);
  } catch (error) {
    // 오류 처리
    logger.error(`(transcriptionService.transcribe.result)`, error);
    // if (error.response) {
    //   console.log(error.response.status);
    //   console.log(error.response.data);
    // } else {
    //   console.log("",error.message);
    //   logger.error(`transcriptionService.transcribe.result`, error.message);
    // }
  } finally {
    // 전송 후 파일 삭제 (선택사항)
    // await promisify(fs.unlink)(filePath);
  }
};
