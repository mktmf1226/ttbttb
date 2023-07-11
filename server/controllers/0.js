const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const transcriptionRequest = async () => {
  const audioUrl = './test.mp3';

  // const prompt = `${audioUrl}`;

  try {
    const audioContent = fs.readFileSync(audioUrl);
    const formData = new FormData();
    formData.append('file', audioContent, {
      filename: 'test.mp3',
      contentType: 'audio/mpeg',
    });
    formData.append('model', 'whisper-1');
    formData.append('max_tokens', '100');
    formData.append('temperature', '0.7');
    formData.append('language', 'ko');

    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // const transcript = response.data.choices[0].text.trim();

    console.log(
      '🚀 ~ file: 0.js:28 ~ transcriptionRequest ~ response:',
      response
    );
    // console.log(
    //   '🚀 ~ file: 0.js:28 ~ transcriptionRequest ~ response.data.choices:',
    //   response.data.choices
    // );
    // console.log(transcript);
  } catch (error) {
    console.error('Error:', error);
  }
};

transcriptionRequest();
