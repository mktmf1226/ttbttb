// const { createTranscription } = require('./openAi');
const Transcription = require('../models/transcription');
const logger = require('../lib/logger');

// 음성 데이터를 변환하여 MongoDB에 저장하는 함수
exports.createTranscription = async (params) => {
  // OpenAI Create transcription API를 사용하여 음성을 텍스트로 변환
  // const transcription = await createTranscription(voiceData);

  const voiceData = params.voiceData;

  // 변환된 텍스트를 MongoDB에 저장
  const savedTranscription = await Transcription.create({
    text: voiceData,
  });

  // 로그 기록
  logger.info(
    `(transcriptionService.createTranscription.savedTranscription) ${JSON.stringify(
      savedTranscription
    )}`
  );

  // 저장된 텍스트를 반환
  return savedTranscription.text;
};
