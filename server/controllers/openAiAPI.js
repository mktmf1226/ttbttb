const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const transcriptionRequest = async () => {
  const audioUrl = './test.mp3';
  const language = 'ko';

  const prompt = `Translate the following speech into text:\n\n"${audioUrl}"\n\nLanguage: ${language}\n\nText:`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        model: 'whisper-1',
        prompt,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const transcript = response.data.choices[0].text.trim();
    console.log(
      '🚀 ~ file: openAiAPI.js:29 ~ transcriptionRequest ~ response:',
      response.data.choices
    );
    console.log(
      '🚀 ~ file: openAiAPI.js:29 ~ transcriptionRequest ~ response:',
      response.data.choices[0].text
    );
    console.log(transcript);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

transcriptionRequest();
