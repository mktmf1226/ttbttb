const Whisper = require('whisper-nodejs');
const dotenv = require('dotenv');

dotenv.config();

const whisper = new Whisper(process.env.OPENAI_API_KEY);

// Transcribe audio
whisper
  .transcribe('./audio/test.mp3', 'whisper-1')
  .then((text) => {
    console.log(text);
  })
  .catch((error) => {
    console.error(error);
  });

// // Translate audio
// whisper
//   .translate('./test.mp3', 'whisper-1', 'ko')
//   .then((text) => {
//     console.log(text);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
