const mongoose = require('mongoose');

// MongoDB 스키마 정의
const transcriptionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    text: { type: String, required: true }, // 텍스트 필드, 필수 입력
  },
  {
    timestamps: true,
  }
);

// Transcription 모델 생성
const Transcription = mongoose.model('Transcription', transcriptionSchema);

module.exports = Transcription;
