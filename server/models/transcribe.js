module.exports = (mongoose) => {
  const transcribeSchema = mongoose.Schema(
    {
      text: String, // 필드 이름
    },
    { timestamps: true }
  );

  const audioSchema = mongoose.Schema(
    {
      audio: String, // 필드 이름
    },
    { timestamps: true }
  );

  const spellSchema = mongoose.Schema(
    {
      spell: String, // 필드 이름
    },
    { timestamps: true }
  );

  const Transcribe = mongoose.model('Transcribe', transcribeSchema);
  const Audio = mongoose.model('Audio', audioSchema);
  const Spell = mongoose.model('Spell', spellSchema);

  return {
    Transcribe,
    Audio,
    Spell,
  };
};
