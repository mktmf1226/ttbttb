const TranscribeService = require("../services/transcribeService");

// 문서 생성
exports.create = async (req, res) => {
  const { text } = req.body;

  try {
    // 요청 확인
    if (!text) {
      throw new Error("텍스트가 없습니다.");
    }

    // 서비스로 요청 전달
    const data = await TranscribeService.createTranscribe(text);
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message || "문서 생성 실패 했습니다.");
  }
};

// 모든 문서 조회
exports.findAll = async (req, res) => {
  const { text } = req.query;

  try {
    const data = await transcribeService.findAllTranscribes(text);
    const filteredData = data.filter((doc) => !doc.deleteAt); // 논리적 삭제된 문서 제외
    res.send(filteredData);
    // res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "문서 검색 실패했습니다." });
  }
};

// 단일 문서 조회
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await transcribeService.findTranscribeById(id);
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "단일 문서 조회에 실패했습니다." });
  }
};

// id로 단일 문서 수정
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "데이터가 없습니다.",
    });
  }

  const id = req.params.id;

  try {
    const updatedDocument = await transcribeService.updateTranscribeById(
      id,
      req.body
    );
    res.send({
      message: "문서가 수정되었습니다.",
      updatedDocument,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "문서 수정에 실패했습니다." });
  }
};

// id로 문서 삭제
exports.delete = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "데이터가 없습니다.",
    });
  }

  const id = req.params.id;

  try {
    const deletedDocument = await transcribeService.deleteTranscribeById(id);
    res.send({
      message: "문서가 삭제되었습니다.",
      deletedDocument,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "문서 삭제에 실패했습니다." });
  }
};

// DB에서 데이터 삭제가 아닌 deleteAt에 날짜 넣기로 구분.
exports.softDelete = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "데이터가 없습니다.",
    });
  }

  const id = req.params.id;

  try {
    const updatedDocument = await transcribeService.softDeleteTranscribeById(
      id
    );
    res.send({
      message: "문서가 삭제되었습니다.",
      updatedDocument,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "문서 삭제에 실패했습니다." });
  }
};
