const hanspell = require('hanspell');
const logger = require('./logger');

function spellCheckByDAUM(sentence) {
  return new Promise((resolve, reject) => {
    hanspell.spellCheckByDAUM(
      sentence,
      6000,
      (result) => {
        resolve(result);
      },
      () => {
        reject(new Error('Error occurred during spell check')); // 에러 객체를 전달하여 reject 호출
      },
    );
  });
}

function spellCheckByPNU(sentence) {
  return new Promise((resolve, reject) => {
    hanspell.spellCheckByPNU(
      sentence,
      6000,
      (result) => {
        resolve(result);
      },
      () => {
        reject(new Error('Error occurred during spell check')); // 에러 객체를 전달하여 reject 호출
      },
    );
  });
}

const spellCheck = {
  async runSpellCheck(params) {
    const { sentence } = params;

    try {
      const daumResult = await spellCheckByDAUM(sentence);
      const pnuResult = await spellCheckByPNU(sentence);

      // console.log('DAUM Spell Check Result:', daumResult);
      // console.log('PNU Spell Check Result:', pnuResult);

      // 로그 기록
      logger.info('DAUM Spell Check Result:', daumResult);
      logger.info('PNU Spell Check Result:', pnuResult);

      // 결과를 반환하여 다른 곳에서 활용
      return {
        daumResult,
        pnuResult,
      };
    } catch (error) {
      // console.error('Spell Check Error:', error);

      // 로그 기록
      logger.error('Spell Check Error:', error);

      // 오류를 throw하여 상위 호출자에게 전달
      throw error;
    }
  },
};

module.exports = spellCheck;
