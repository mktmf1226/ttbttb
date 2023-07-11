const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const transcriptionRequest = async () => {
  const audioUrl = './test.mp3';

  const resp = await openai.createTranscription(
    fs.createReadStream(audioUrl),
    'whisper-1'
  );

  const transcript = resp.data.choices[0].text;

  console.log(
    '🚀 ~ file: 2-openAiAPI.js:22 ~ transcriptionRequest ~ transcript:',
    transcript
  );
};

transcriptionRequest();
