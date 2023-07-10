const spellCheck = require("../lib/spellCheck");
const logger = require("../lib/logger");

exports.createSpells = async (req, res) => {
  try {
    const params = {
      sentence: req.body.sentence,
    };
    logger.info(`(spells.reg.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await spellCheck.runSpellCheck(params);
    logger.info(`(spells.runSpellCheck.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
};
