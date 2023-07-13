const db = require('../models');
const Transcribe = db.transcribe;

// create 컨트롤러 함수
// exports.create = async (text) => {
//   try {
//     // 요청 확인
//     if (!text) {
//       throw new Error('텍스트가 없습니다.');
//     }

//     // 문서 설정
//     const transcribe = new Transcribe({
//       text: text,
//     });

//     // 문서 저장
//     const savedTranscribe = await transcribe.save();
//     return savedTranscribe;
//   } catch (error) {
//     throw new Error(error.message || '문서 생성 실패 했습니다.');
//   }
// };

exports.create = (text) => {
  // 요청 확인
  if (!text) {
    // res.status(400).send({
    //   message: '텍스트가 없습니다.',
    // });
    // return;
    throw new Error('텍스트가 없습니다.');
  }

  // 문서 설정
  const transcribe = new Transcribe({
    text: text,
    // description: req.body.description,
    // published: req.body.published ? req.body.published : false
  });

  // 문서 저장
  transcribe
    .save(transcribe)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      throw new Error(err.message || '문서 생성 실패 했습니다.');
    });
};

// 모든 문서 조회
exports.findAll = async (req, res) => {
  const text = req.query.text;
  const condition = text
    ? { text: { $regex: new RegExp(text), $options: 'i' } }
    : {};

  try {
    // 모든 문서 조회
    const data = await Transcribe.find(condition);
    res.send(data);
  } catch (error) {
    throw new Error(error.message || '문서 검색 실패했습니다.');
  }
};

// 단일 문서 조회
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    // id로 단일 문서 조회
    const data = await Transcribe.findById(id);
    if (!data) {
      throw new Error(`문서를 찾을 수 없습니다. (id: ${id})`);
    }
    res.send(data);
  } catch (error) {
    throw new Error(
      error.message || `단일 문서 조회에 실패했습니다. (id: ${id})`
    );
  }
};

// id로 단일 문서 수정
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: '데이터가 없습니다.',
    });
  }

  const id = req.params.id;

  try {
    // id로 단일 문서 수정
    const updatedDocument = await Transcribe.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!updatedDocument) {
      throw new Error(`문서를 수정할 수 없습니다. (id: ${id})`);
    }
    res.send({
      message: '문서가 수정되었습니다.',
    });
  } catch (error) {
    throw new Error(error.message || `문서 수정에 실패했습니다. (id: ${id})`);
  }
};

// // id로 문서 삭제
// exports.delete = async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: '데이터가 없습니다.',
//     });
//   }

//   const id = req.params.id;

//   try {
//     // id로 문서 삭제
//     const deletedDocument = await Transcribe.findByIdAndRemove(id);
//     if (!deletedDocument) {
//       throw new Error(`문서를 삭제할 수 없습니다. (id: ${id})`);
//     }
//     res.send({
//       message: '문서가 삭제되었습니다.',
//     });
//   } catch (error) {
//     throw new Error(error.message || `문서 삭제에 실패했습니다. (id: ${id})`);
//   }
// };

// DB에서 데이터 삭제가 아닌 deleteAt에 날짜 넣기로 구분.

exports.softDelete = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: '데이터가 없습니다.',
    });
  }

  const id = req.params.id;

  try {
    // 현재 시간으로 deletedAt 필드 업데이트
    const updateData = {
      deletedAt: new Date(),
    };

    // id로 문서 삭제
    const updatedDocument = await Transcribe.findByIdAndUpdate(id, updateData, {
      useFindAndModify: false,
    });
    if (!updatedDocument) {
      throw new Error(`문서를 삭제할 수 없습니다. (id: ${id})`);
    }
    res.send({
      message: '문서가 삭제되었습니다.',
    });
  } catch (error) {
    throw new Error(error.message || `문서 삭제에 실패했습니다. (id: ${id})`);
  }
};
