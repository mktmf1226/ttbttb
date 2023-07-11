const openai = require('openai'); // OpenAI 라이브러리를 가져옵니다.
const dotenv = require('dotenv'); // dotenv 라이브러리를 가져옵니다.

dotenv.config(); // dotenv를 사용하여 환경 변수를 로드합니다.

openai.apiKey = process.env.OPENAI_API_KEY; // OpenAI API 키를 환경 변수에서 가져와 설정합니다.

const transcriptionRequest = async () => {
  // 음성 파일을 텍스트로 변환하는 비동기 함수를 정의합니다.

  const audioUrl = './test.mp3'; // 변환할 음성 파일의 URL을 지정합니다.

  const language = 'ko'; // 변환된 텍스트의 언어를 지정합니다.

  const response = await openai.complete({
    engine: 'text-davinci-003', // GPT-3.5 모델의 엔진을 지정합니다.
    prompt: `Translate the following speech into text:\n\n"${audioUrl}"\n\nLanguage: ${language}\n\nText:`, // 변환 작업에 대한 프롬프트로 사용될 텍스트를 지정합니다.
    maxTokens: 100, // 생성된 텍스트의 최대 토큰 수를 제한합니다.
    temperature: 0.7, // 생성된 텍스트의 다양성을 조정하는 매개변수입니다.
  });

  const transcript = response.choices[0].text.trim(); // API 응답에서 변환된 텍스트를 추출합니다.

  console.log(transcript); // 변환된 텍스트를 콘솔에 출력합니다.
};

transcriptionRequest(); // transcriptionRequest 함수를 호출하여 코드를 실행합니다.
