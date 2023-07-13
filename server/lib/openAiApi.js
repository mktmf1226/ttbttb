const fs = require('fs');
const dotenv = require('dotenv');

const { Configuration, OpenAIApi } = require('openai');
const transcribeController = require('../controllers/transcribe'); // transcribe.js 파일 가져오기

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

    const transformedText = Transcription.data.text;

    // console.log(
    //   '🚀 ~ file: openAiApi.js:37 ~ runOpenAI ~ transformedText::',
    //   transformedText
    // );
    // create 컨트롤러 함수 호출
    try {
      const savedTranscribe = await transcribeController.create(
        transformedText
      );
      // console.log(
      //   '🚀 ~ file: openAiApi.js:37 ~ runOpenAI ~ transformedText22:',
      //   transformedText
      // );
      return savedTranscribe;
    } catch (error) {
      console.error('문서 생성 실패:', error.message);
      // 예외 처리 및 오류 메시지 반환
      return { error: error.message || '문서 생성 실패 했습니다.' };
    }
  } catch (error) {
    // 오류 처리
    if (error.response) {
      throw new Error(`${error.response.status}: ${error.response.data}`);
    } else {
      throw new Error(error.message);
    }
  }
};

runOpenAI();
