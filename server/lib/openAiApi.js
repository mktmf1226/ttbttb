const fs = require('fs');
const dotenv = require('dotenv');

const { Configuration, OpenAIApi } = require('openai');
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const runOpenAI = async () => {
  try {
    // 오디오 파일을 읽기.
    const audioFile = fs.createReadStream('./audio/test.mp3');

    // Transcription(전사)을 생성.
    const Transcription = await openai.createTranscription(
      audioFile,
      'whisper-1'
    );

    // 변환된 텍스트를 콘솔로 출력.
    console.log(Transcription.data.text);
  } catch (error) {
    // 오류 처리
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

runOpenAI();
