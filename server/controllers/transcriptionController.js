const TranscriptionService = require('../services/transcriptionService');
const logger = require('../lib/logger');

exports.createTranscription = async (req, res) => {
  const params = { voiceData: req.body.voiceData };
  // react 받는 보이스 데이터

  // 로그 기록
  logger.info(
    `(transcriptionController.createTranscription.params) ${JSON.stringify(
      params
    )}`
  );

  try {
    // TranscriptionService를 통해 음성 변환을 생성
    const transcription = await TranscriptionService.createTranscription(
      params
    );

    // 변환된 텍스트를 응답으로 전송
    res.json({ transcription });
  } catch (error) {
    console.error('음성 변환 중 오류 발생:', error);
    res.status(500).json({ error: '음성 변환 중 오류 발생' });
  }
};
