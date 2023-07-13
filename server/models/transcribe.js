module.exports = (mongoose) => {
  // audio to text 모델 세팅
  const Transcribe = mongoose.model(
    'transcribe',
    mongoose.Schema(
      {
        text: String,
      },
      { timestamps: true }
    )
  );
  return Transcribe;
};

// 스키마=설계, 인스턴스=값, 모델=만들기
