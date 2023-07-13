const db = require('../models');
const Spell = db.spell;
const logger = require('../lib/logger');

// 스펠 체크 생성
exports.createSpell = async (check) => {
  try {
    // 요청 확인
    if (!check) {
      logger.error('스펠 체크 생성 불가:', err);
      throw new Error('스펠 체크가 없습니다.');
    }

    // 스펠 체크 설정
    const spell = new Spell({
      check: check,
    });

    // 스펠 체크 저장
    const data = await spell.save(spell);
    logger.info(`(Spell.createSpell.data) ${JSON.stringify(data)}`);
    return data;
  } catch (err) {
    logger.error('스펠 체크 생성 실패:', err);
    throw new Error(err.message || '스펠 체크 생성 실패 했습니다.');
  }
};

// 모든 스펠 체크 조회
exports.findAllSpells = async (check) => {
  const condition = check
    ? { check: { $regex: new RegExp(check), $options: 'i' } }
    : {};

  try {
    // 모든 스펠 체크 조회
    const data = await Spell.find(condition);
    logger.info(`(Spell.findAllSpells.data) ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    logger.error('전체 스펠 체크 검색 실패:', err);
    throw new Error(error.message || '스펠 체크 검색 실패했습니다.');
  }
};

// 단일 스펠 체크 조회
exports.findSpellById = async (id) => {
  try {
    // id로 단일 스펠 체크 조회
    const data = await Spell.findById(id);
    if (!data) {
      logger.error('스펠 체크 조회 불가:', err);
      throw new Error(`스펠 체크를 찾을 수 없습니다. (id: ${id})`);
    }
    logger.info(`(Spell.findSpellById.data) ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    logger.error('단일 스펠 체크 검색 실패:', err);
    throw new Error(
      error.message || `단일 스펠 체크 조회에 실패했습니다. (id: ${id})`
    );
  }
};

// id로 단일 스펠 체크 수정
exports.updateSpellById = async (id, updateData) => {
  try {
    // id로 단일 스펠 체크 수정
    const updatedSpell = await Spell.findByIdAndUpdate(id, updateData, {
      useFindAndModify: false,
    });
    if (!updatedSpell) {
      logger.error('스펠 체크 수정 불가:', err);
      throw new Error(`스펠 체크를 수정할 수 없습니다. (id: ${id})`);
    }
    logger.info(`(Spell.updateSpellById.data) ${JSON.stringify(data)}`);
    return updatedSpell;
  } catch (error) {
    logger.error('단일 스펠 체크 수정 실패:', err);
    throw new Error(
      error.message || `스펠 체크 수정에 실패했습니다. (id: ${id})`
    );
  }
};

// id로 스펠 체크 삭제
exports.deleteSpellById = async (id) => {
  try {
    // id로 스펠 체크 삭제
    const deletedSpell = await Spell.findByIdAndRemove(id);
    if (!deletedSpell) {
      logger.error('스펠 체크 삭제 불가:', err);
      throw new Error(`스펠 체크를 삭제할 수 없습니다. (id: ${id})`);
    }
    logger.info(`(Spell.deleteSpellById.data) ${JSON.stringify(data)}`);
    return deletedSpell;
  } catch (error) {
    logger.error('스펠 체크 삭제 실패:', err);
    throw new Error(
      error.message || `스펠 체크 삭제에 실패했습니다. (id: ${id})`
    );
  }
};

// DB에서 데이터 삭제가 아닌 deleteAt에 날짜 넣기로 구분.
exports.softDeleteSpellById = async (id) => {
  try {
    // 현재 시간으로 deletedAt 필드 업데이트
    const updateDate = {
      deletedAt: new Date(),
    };

    // id로 스펠 체크 수정
    const updatedData = await Spell.findByIdAndUpdate(id, updateDate, {
      useFindAndModify: false,
    });
    if (!updatedData) {
      logger.error('스펠 체크 삭제 데이터 수정 불가:', err);
      throw new Error(`스펠 체크를 삭제할 수 없습니다. (id: ${id})`);
    }
    `(Spell.softDeleteSpellById.data) ${JSON.stringify(data)}`;
    return updatedData;
  } catch (error) {
    logger.error('스펠 체크 삭제 데이터 수정 실패:', err);
    throw new Error(
      error.message || `스펠 체크 삭제에 실패했습니다. (id: ${id})`
    );
  }
};
