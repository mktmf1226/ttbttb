const spellCheck = require("../lib/spellCheck");
const logger = require("../lib/logger");

exports.createSpells = async (req, res) => {
  try {
    const params = {
      sentence: req.body.sentence,
    };
    logger.info(`(spellsController.runSpellCheck.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await spellCheck.runSpellCheck(params);
    logger.info(`(spellsController.runSpellCheck.result) ${JSON.stringify(result)}`);

    // 데이터 파싱
    const newResult = {
      spellsResult: params.sentence,
    };

    // 맞춤법 고칠 게 없다면
    if (result.daumResult.length === 0) {
      logger.info(`(spellsController.createSpells.result) 맞춤법이 완벽합니다.`);
      // 최종 응답
      res.status(200).json(newResult);
    }

    // 맞춤법 고칠 게 있다면
    else if (result.daumResult.length >= 0) {
      let modifiedString = newResult.spellsResult;
      for (i = 0; i < result.daumResult.length; i += 1) {
        const originalString = modifiedString;
        const searchString = result.daumResult[i].token;
        const replacementString = result.daumResult[i].suggestions;

        modifiedString = originalString.replace(
          searchString,
          replacementString
        );
        // console.log("modifiedString : ", modifiedString);
      }
      logger.info(`(spellsController.createSpells.result) 다음 ${result.daumResult.length}개 단어를 수정했습니다.`);
      newResult.spellsResult = modifiedString;

      // DB 저장 언니가 수정하세요
      // const dbResult = await transcribe.create(modifiedString);
      // console.log(dbResult);

      // // 로그 기록
      // logger.info(
      //   `(transcribe.create.result) ${JSON.stringify(dbResult)}`
      // );

      // 최종 응답
      res.status(200).json(newResult);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
};
