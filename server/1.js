import React, { useEffect } from 'react';
import openai from 'openai';

const YourComponent = () => {
  useEffect(() => {
    // OpenAI API 키 설정
    openai.apiKey = 'YOUR_API_KEY';

    // STT API 호출
    const transcriptionRequest = async () => {
      const response = await openai.Transcription.create({
        audio: 'YOUR_AUDIO_URL',
        model: 'whisper',
        language: 'en-US',
      });
      const transcript = response.transcription.text;
      console.log(transcript);
    };

    transcriptionRequest();
  }, []);

  return <div>Your Component</div>;
};

export default YourComponent;
