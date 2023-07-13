const db = require('../models');
const Transcribe = db.transcribe;

// 문서 생성
exports.create = (req, res) => {
  // 요청 확인
  if (!req.body.text) {
    res.status(400).send({
      message: '텍스트가 없습니다.',
    });

    return;
  }

  // 문서 설정
  const transcribe = new Transcribe({
    text: req.body.text,
    // description: req.body.description,
    // published: req.body.published ? req.body.published : false
  });

  // 문서 저장
  transcribe
    .save(transcribe)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || '문서 생성 실패 했습니다.',
      });
    });
};

// 모든 문서 조회
exports.findAll = (req, res) => {
  const text = req.query.text;
  const condition = text
    ? { text: { $regex: new RegExp(text), $options: 'i' } }
    : {};

  // 모든 문서 조회
  Transcribe.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || '문서 검색 실패했습니다.',
      });
    });
};

// 단일 문서 조회
exports.findOne = (req, res) => {
  const id = req.params.id;

  // id로 단일 문서 조회
  Transcribe.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `문서를 찾을 수 없습니다. (id: ${id})`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `단일 문서 조회에 실패했습니다. (id: ${id})`,
      });
    });
};

// id로 단일 문서 수정
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: '데이터가 없습니다.',
    });
  }

  // id 세팅
  const id = req.params.id;

  // id로 단일 문서 수정
  Transcribe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `문서를 수정할 수 없습니다. (id: ${id})`,
        });
      } else {
        res.send({
          message: '문서가 수정되었습니다.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `문서 수정에 실패했습니다. (id: ${id})`,
      });
    });
};

// // id로 문서 삭제
// exports.delete = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: '데이터가 없습니다.',
//     });
//   }

//   // id 세팅
//   const id = req.params.id;

//   // id로 문서 삭제
//   Transcribe.findByIdAndRemove(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `문서를 삭제할 수 없습니다. (id: ${id})`,
//         });
//       } else {
//         res.send({
//           message: '문서가 삭제되었습니다.',
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || `문서 삭제에 실패했습니다. (id: ${id})`,
//       });
//     });
// };

// DB에서 데이터 삭제가 아닌 deleteAt에 날짜 넣기로 구분.

// id로 문서 소프트 삭제
exports.softDelete = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: '데이터가 없습니다.',
    });
  }

  // id 세팅
  const id = req.params.id;

  // 현재 시간으로 deletedAt 필드 업데이트
  const updateData = {
    deletedAt: new Date(),
  };

  // id로 문서 업데이트
  Transcribe.findByIdAndUpdate(id, updateData, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `문서를 삭제할 수 없습니다. (id: ${id})`,
        });
      } else {
        res.send({
          message: '문서가 삭제되었습니다.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `문서 삭제에 실패했습니다. (id: ${id})`,
      });
    });
};
