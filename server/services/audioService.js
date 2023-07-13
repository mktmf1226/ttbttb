const db = require('../models');
const Audio = db.audio;
const logger = require('../lib/logger');

// 오디오 생성
exports.createAudio = async (check) => {
  try {
    // 요청 확인
    if (!check) {
      logger.error('오디오 생성 불가:', err);
      throw new Error('오디오가 없습니다.');
    }

    // 오디오 설정
    const audio = new Audio({
      check: check,
    });

    // 오디오 저장
    const data = await audio.save(audio);
    logger.info(`(Audio.createAudio.data) ${JSON.stringify(data)}`);
    return data;
  } catch (err) {
    logger.error('오디오 생성 실패:', err);
    throw new Error(err.message || '오디오 생성 실패 했습니다.');
  }
};

// 모든 오디오 조회
exports.findAllAudios = async (check) => {
  const condition = check
    ? { check: { $regex: new RegExp(check), $options: 'i' } }
    : {};

  try {
    // 모든 오디오 조회
    const data = await Audio.find(condition);
    logger.info(`(Audio.findAllAudios.data) ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    logger.error('전체 오디오 검색 실패:', err);
    throw new Error(error.message || '오디오 검색 실패했습니다.');
  }
};

// 단일 오디오 조회
exports.findAudioById = async (id) => {
  try {
    // id로 단일 오디오 조회
    const data = await Audio.findById(id);
    if (!data) {
      logger.error('오디오 조회 불가:', err);
      throw new Error(`오디오를 찾을 수 없습니다. (id: ${id})`);
    }
    logger.info(`(Audio.findAudioById.data) ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    logger.error('단일 오디오 검색 실패:', err);
    throw new Error(
      error.message || `단일 오디오 조회에 실패했습니다. (id: ${id})`
    );
  }
};

// id로 단일 오디오 수정
exports.updateAudioById = async (id, updateData) => {
  try {
    // id로 단일 오디오 수정
    const updatedAudio = await Audio.findByIdAndUpdate(id, updateData, {
      useFindAndModify: false,
    });
    if (!updatedAudio) {
      logger.error('오디오 수정 불가:', err);
      throw new Error(`오디오를 수정할 수 없습니다. (id: ${id})`);
    }
    logger.info(`(Audio.updateAudioById.data) ${JSON.stringify(data)}`);
    return updatedAudio;
  } catch (error) {
    logger.error('단일 오디오 수정 실패:', err);
    throw new Error(error.message || `오디오 수정에 실패했습니다. (id: ${id})`);
  }
};

// id로 오디오 삭제
exports.deleteAudioById = async (id) => {
  try {
    // id로 오디오 삭제
    const deletedAudio = await Audio.findByIdAndRemove(id);
    if (!deletedAudio) {
      logger.error('오디오 삭제 불가:', err);
      throw new Error(`오디오를 삭제할 수 없습니다. (id: ${id})`);
    }
    logger.info(`(Audio.deleteAudioById.data) ${JSON.stringify(data)}`);
    return deletedAudio;
  } catch (error) {
    logger.error('오디오 삭제 실패:', err);
    throw new Error(error.message || `오디오 삭제에 실패했습니다. (id: ${id})`);
  }
};

// DB에서 데이터 삭제가 아닌 deleteAt에 날짜 넣기로 구분.
exports.softDeleteAudioById = async (id) => {
  try {
    // 현재 시간으로 deletedAt 필드 업데이트
    const updateDate = {
      deletedAt: new Date(),
    };

    // id로 오디오 수정
    const updatedData = await Audio.findByIdAndUpdate(id, updateDate, {
      useFindAndModify: false,
    });
    if (!updatedData) {
      logger.error('오디오 삭제 데이터 수정 불가:', err);
      throw new Error(`오디오를 삭제할 수 없습니다. (id: ${id})`);
    }
    `(Audio.softDeleteAudioById.data) ${JSON.stringify(data)}`;
    return updatedData;
  } catch (error) {
    logger.error('오디오 삭제 데이터 수정 실패:', err);
    throw new Error(error.message || `오디오 삭제에 실패했습니다. (id: ${id})`);
  }
};
