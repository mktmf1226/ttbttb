const db = require("../models");
const Transcribe = db.transcribe;
const logger = require("../lib/logger");

// 문서 생성
exports.createTranscribe = async (text) => {
  try {
    // 요청 확인
    if (!text) {
      logger.error("텍스트 생성 불가:", err);
      throw new Error("텍스트가 없습니다.");
    }

    // 문서 설정
    const transcribe = new Transcribe({
      text: text,
    });

    // 문서 저장
    const data = await transcribe.save(transcribe);
    logger.info(`(Transcribe.createTranscribe.data) ${JSON.stringify(data)}`);
    return data;
  } catch (err) {
    logger.error("문서 생성 실패:", err);
    throw new Error(err.message || "문서 생성 실패 했습니다.");
  }
};

// 모든 문서 조회
exports.findAllTranscribes = async () => {
  const condition = { deleteAt: null };

  try {
    // 모든 문서 조회
    const data = await Transcribe.find(condition);
    logger.info(`(Transcribe.findAllTranscribes.data) ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    logger.error("전체 문서 검색 실패:", err);
    throw new Error(error.message || "문서 검색 실패했습니다.");
  }
};

// 단일 문서 조회
exports.findTranscribeById = async (id) => {
  try {
    // id로 단일 문서 조회
    const data = await Transcribe.findById(id);
    if (!data) {
      logger.error("문서 조회 불가:", err);
      throw new Error(`문서를 찾을 수 없습니다. (id: ${id})`);
    }
    logger.info(`(Transcribe.findTranscribeById.data) ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    logger.error("단일 문서 검색 실패:", err);
    throw new Error(
      error.message || `단일 문서 조회에 실패했습니다. (id: ${id})`
    );
  }
};

// id로 단일 문서 수정
exports.updateTranscribeById = async (id, updateData) => {
  try {
    // id로 단일 문서 수정
    const updatedText = await Transcribe.findByIdAndUpdate(id, updateData, {
      useFindAndModify: false,
    });
    if (!updatedText) {
      logger.error("문서 수정 불가:", err);
      throw new Error(`문서를 수정할 수 없습니다. (id: ${id})`);
    }
    logger.info(
      `(Transcribe.updateTranscribeById.data) ${JSON.stringify(data)}`
    );
    return updatedText;
  } catch (error) {
    logger.error("단일 문서 수정 실패:", err);
    throw new Error(error.message || `문서 수정에 실패했습니다. (id: ${id})`);
  }
};

// id로 문서 삭제
exports.deleteTranscribeById = async (id) => {
  try {
    // id로 문서 삭제
    const deletedText = await Transcribe.findByIdAndRemove(id);
    if (!deletedText) {
      logger.error("문서 삭제 불가:", err);
      throw new Error(`문서를 삭제할 수 없습니다. (id: ${id})`);
    }
    logger.info(
      `(Transcribe.deleteTranscribeById.data) ${JSON.stringify(data)}`
    );
    return deletedText;
  } catch (error) {
    logger.error("문서 삭제 실패:", err);
    throw new Error(error.message || `문서 삭제에 실패했습니다. (id: ${id})`);
  }
};

// DB에서 데이터 삭제가 아닌 deleteAt에 날짜 넣기로 구분.
exports.softDeleteTranscribeById = async (id) => {
  try {
    // 현재 시간으로 deletedAt 필드 업데이트
    const updateDate = {
      deletedAt: new Date(),
    };

    // id로 문서 수정
    const updatedData = await Transcribe.findByIdAndUpdate(id, updateDate, {
      useFindAndModify: false,
    });
    if (!updatedData) {
      logger.error("문서 삭제 데이터 수정 불가:", err);
      throw new Error(`문서를 삭제할 수 없습니다. (id: ${id})`);
    }
    `(Transcribe.softDeleteTranscribeById.data) ${JSON.stringify(data)}`;
    return updatedData;
  } catch (error) {
    logger.error("문서 삭제 데이터 수정 실패:", err);
    throw new Error(error.message || `문서 삭제에 실패했습니다. (id: ${id})`);
  }
};
