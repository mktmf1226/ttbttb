module.exports = (mongoose) => {
  const transcribe = mongoose.model(
    'transcribe',
    mongoose.Schema(
      {
        text: String,
      },
      { timestamps: true }
    )
  );
  return transcribe;
};

module.exports = (mongoose) => {
  const audio = mongoose.model(
    'audio',
    mongoose.Schema(
      {
        audio: String,
      },
      { timestamps: true }
    )
  );
  return audio;
};

module.exports = (mongoose) => {
  const spell = mongoose.model(
    'spell',
    mongoose.Schema(
      {
        spell: String,
      },
      { timestamps: true }
    )
  );
  return spell;
};
