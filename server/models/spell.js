module.exports = (mongoose) => {
  // 맞춤법 모델 세팅
  const Spell = mongoose.model(
    'Spell',
    mongoose.Schema(
      {
        check: String,
        deletedAt: {
          type: Date,
          default: null,
        },
      },
      { timestamps: true }
    )
  );
  return Spell;
};

// const mongoose = require('mongoose');
// // audio to text 모델 세팅
// const { Schema } = mongoose;
// const spellSchema = new Schema(
//   {
//     check: {
//       type: String,
//       required: true,
//     },
//     deletedAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Spell', spellSchema);
