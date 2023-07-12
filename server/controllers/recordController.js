const recordService = require("../services/recordService");
const logger = require("../lib/logger");

// 녹음 시작
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
    res.status(500).json({ err: err.toString() });
  }
};

// 녹음 종료
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
    res.status(500).json({ err: err.toString() });
  }
};
