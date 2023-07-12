const db = require('../models');

const Transcribe = db.transcribe;

// 문서 생성
exports.create = async (req, res) => {
  try {
    if (!req.body.text) {
      res.status(400).send({
        message: '텍스트가 없습니다.',
      });
      return;
    }

    // 문서 설정
    const transcribe = new Transcribe({
      text: req.body.text,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    });

    // 문서 저장
    const data = await Transcribe.save(transcribe);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || '문서 생성 실패 했습니다.',
    });
  }
};

// 모든 문서 조회
exports.findAll = async (req, res) => {
  try {
    const text = req.query.text;
    const condition = text
      ? { text: { $regex: new RegExp(text), $options: 'i' } }
      : {};

    // 모든 문서 조회
    const data = await Transcribe.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || '문서 검색 실패했습니다.',
    });
  }
};

// 단일 문서 조회
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    // id로 단일 문서 조회
    const data = await Transcribe.findById(id);
    if (!data) {
      res.status(404).send({
        message: `문서를 찾을 수 없습니다. (id: ${id})`,
      });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `단일 문서 조회에 실패했습니다. (id: ${id})`,
    });
  }
};

// id로 단일 문서 수정
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: '데이터가 없습니다.',
      });
    }

    // id 세팅
    const id = req.params.id;

    // id로 단일 문서 수정
    const data = await Transcribe.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      res
        .status(404)
        .send({ message: `문서를 수정할 수 없습니다. (id: ${id})` });
    } else {
      res.send({
        message: '문서가 수정되었습니다.',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `문서 수정에 실패했습니다. (id: ${id})`,
    });
  }
};

// id로 문서 삭제
exports.delete = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: '데이터가 없습니다.',
      });
    }

    // id 세팅
    const id = req.params.id;

    // id로 문서 삭제
    const data = await Transcribe.findByIdAndRemove(id);
    if (!data) {
      res.status(404).send({
        message: `문서를 삭제할 수 없습니다. (id: ${id})`,
      });
    } else {
      res.send({
        message: '문서가 삭제되었습니다.',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `문서 삭제에 실패했습니다. (id: ${id})`,
    });
  }
};
