// 스키마=설계, 인스턴스=값, 모델=만들기

// 1. Mongoose 인스턴스를 관리해야 하는 복잡한 시나리오에서 유용
// 장: 함수로 감싸고 내보내기, 외부에서 Mongoose 인스턴스를 전달, Mongoose 인스턴스를 외부에서 만들고 관리할 수 있는 유연성을 제공
// 단: 외부 모듈에서 함수를 호출해야 하므로 코드를 약간 복잡, 코드의 가독성이 낮음
module.exports = (mongoose) => {
  // audio to text 모델 세팅
  const Transcribe = mongoose.model(
    'transcribe',
    mongoose.Schema(
      {
        text: String,
        spell: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Spell', // 맞춤법 콜렉션과의 참조
        },
        deletedAt: {
          type: Date,
          default: null,
        },
      },
      { timestamps: true }
    )
  );
  return Transcribe;
};

// 2. 단순한 프로젝트나 코드의 간결성을 선호하는 경우에 적합
// 장: 직접 module.exports에 할당하여 내보내기 때문에 코드가 더 간단하고 직관적, 외부에서 Mongoose 인스턴스를 전달하지 않고도 모델을 정의
// 단: Mongoose 인스턴스를 외부에서 전달할 수 없음, 단일 파일 내에서 Mongoose 인스턴스를 만들고 사용, 모듈의 재사용성이 약간 제한
// const mongoose = require('mongoose');
// // audio to text 모델 세팅
// const { Schema } = mongoose;
// const transcribeSchema = new Schema(
//   {
//     text: {
//       type: String,
//       required: true,
//     },
//     spell: {
//       type: Schema.Types.ObjectId,
//       ref: 'Spell', // 맞춤법 콜렉션과의 참조
//     },
//     deletedAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Transcribe', transcribeSchema);
