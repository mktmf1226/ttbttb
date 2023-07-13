module.exports = (mongoose) => {
  // 맞춤법 모델 세팅
  const Spell = mongoose.model(
    'spell',
    mongoose.Schema(
      {
        spell: String,
      },
      { timestamps: true }
    )
  );
  return Spell;
};
