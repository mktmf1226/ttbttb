module.exports = (mongoose) => {
  // 오디오 모델 세팅
  const Audio = mongoose.model(
    'Audio',
    mongoose.Schema(
      {
        audio: String,
      },
      { timestamps: true }
    )
  );
  return Audio;
};
