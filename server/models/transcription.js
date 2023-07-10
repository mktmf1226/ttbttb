const mongoose = require('mongoose');

// MongoDB 스키마 정의
const transcriptionSchema = new mongoose.Schema({
  text: { type: String, required: true }, // 텍스트 필드, 필수 입력
});

// Transcription 모델 생성
const Transcription = mongoose.model('Transcription', transcriptionSchema);

module.exports = Transcription;
