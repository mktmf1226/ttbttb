module.exports = (mongoose) => {
  // 맞춤법 모델 세팅
  const Spelling = mongoose.model(
    'Spelling',
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
  return Spelling;
};

// const mongoose = require('mongoose');
// // audio to text 모델 세팅
// const { Schema } = mongoose;
// const spellingSchema = new Schema(
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

// module.exports = mongoose.model('Spelling', spellingSchema);
