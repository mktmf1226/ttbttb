module.exports = (mongoose) => {
  // 오디오 모델 세팅
  const Audio = mongoose.model(
    'Audio',
    mongoose.Schema(
      {
        audio: String,
        transcribe: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Transcribe', // 텍스트 콜렉션과의 참조
        },
        deletedAt: {
          type: Date,
          default: null,
        },
      },
      { timestamps: true }
    )
  );
  return Audio;
};

// const mongoose = require('mongoose');
// // audio 모델 세팅
// const { Schema } = mongoose;
// const audioSchema = new Schema(
//   {
//     audio: {
//       type: String,
//     },
//     transcription: {
//       type: Schema.Types.ObjectId,
//       ref: 'Transcribe', // 텍스트 콜렉션과의 참조
//     },
//     deletedAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Audio', audioSchema);
