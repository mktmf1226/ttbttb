const logger = require("../lib/logger");
const transcribeService = require("../services/transcribeService");
const recordService = require("../services/recordService");
const spellService = require("../services/spellService");

// 녹음 시작 버튼 클라이언트에게 보내기
exports.recordStart = async (req, res) => {
  const params = req.query;
  logger.info(`(recordService.recordStart.params) ${JSON.stringify(params)}`);

  // 서비스 실행
  try {
    const result = recordService.recordStart();
    // 로그 기록
    logger.info(`(recordService.recordStart.result) ${JSON.stringify(result)}`);

    // 서비스가 정상 작동하면
    const response = "recStart-success";
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// 녹음 종료 버튼 클라이언트에게 보내기
exports.recordEnd = async (req, res) => {
  const params = req.query;
  logger.info(`(recordService.recordEnd.params) ${JSON.stringify(params)}`);
  // 서비스 실행
  try {
    const result = await recordService.recordEnd();

    // 로그 기록
    logger.info(`(recordService.recordEnd.result) ${JSON.stringify(result)}`);

    // 서비스가 정상 작동하면
    const response = "recEnd-success";
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

exports.dbSave = async (req, res) => {
  // 서비스 실행
  try {
    const result = await recordService.dbSave();

    // 로그 기록
    logger.info(`(recordService.dbSave.result) ${JSON.stringify(result)}`);

    // 서비스가 정상 작동하면
    const response = "dbSave-success";
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

exports.discard = async (req, res) => {
  try {
    const result = await recordService.discard();

    // 로그 기록
    logger.info(`(recordService.discard.result) ${JSON.stringify(result)}`);


    const response = "discard-success";

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
};

exports.saveFile = async (req, res) => {
  try {
    const result = await recordService.saveFile();

    // 로그 기록
    logger.info(`(recordService.saveFile.result) ${JSON.stringify(result)}`);


    const response = 'file-success';

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
};

// 삭제 결과 클라이언트에게 보내기
exports.delete = async (req, res) => {
  // 서비스 실행
  try {
    // transcribe에서 1건 삭제
    const resultTranscribe =
      await transcribeService.softDeleteTranscribeByDate();    

    logger.info(
      `(transcribeService.softDeleteTranscribeByDate.result) stt삭제 완료 : ${JSON.stringify(
        resultTranscribe.text
      )}`
    );

    // spells에서 1건 삭제
    const resultSpells = await spellService.softDeleteSpellByDate();
    
    logger.info(
      `(spellService.softDeleteTranscribeByDate.result) spell삭제 완료 : ${JSON.stringify(
        resultSpells.text
      )}`
    );

    // audio에서 1건 삭제
    // const resultAudio = await transcribeService.softDeleteTranscribeByDate();

    // 삭제 후 맞춤법 검사 전체 결과 불러오기
    const data = await spellService.findAllSpells();

    const result = data;

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
