// 필요한 모듈 가져오기
const fs = require('fs'); // 파일 시스템 모듈
const dotenv = require('dotenv'); // 환경 변수 설정 모듈

const { Configuration, OpenAIApi } = require('openai'); // OpenAI SDK 모듈
dotenv.config(); // .env 파일의 환경 변수 로드

// OpenAI API에 연결하기 위한 구성 설정
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일에서 OPENAI_API_KEY 가져오기
});

const openai = new OpenAIApi(configuration); // OpenAI API 객체 생성

// OpenAI API를 실행하는 비동기 함수
const runOpenAI = async () => {
  try {
    // 음성 파일을 읽기 스트림으로 생성
    const audioFile = fs.createReadStream('./audio/test.mp3');

    // OpenAI API를 사용하여 음성 파일을 텍스트로 변환
    const Transcription = await openai.createTranscription(
      audioFile,
      'whisper-1' // 변환 모델 지정 (whisper-1은 OpenAI의 음성 변환 모델 중 하나)
    );

    // 변환된 텍스트 출력
    console.log(Transcription.data.text);
  } catch (error) {
    // 에러 처리
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

// OpenAI API 실행 함수 호출
runOpenAI();
