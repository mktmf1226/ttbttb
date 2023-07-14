const recordService = require('../services/recordService');
const logger = require('../lib/logger');
const multer = require('multer');
const fs = require('fs');
// const transcribe = require('../controllers/transcribe');
const transcribeService = require('../services/transcribeService');


// 녹음이 종료되고 클라이언트로부터 받는 파일 처리
exports.sendAudio = async (req, res) => {
  // 오디오 파일을 받기 위해 multer 미들웨어를 사용합니다.
  const upload = multer({ dest: 'uploads/' }).single('file');

  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // 오디오 파일이 업로드 되었으면 저장합니다.
    const tempPath = req.file.path;
    const targetPath = './audio/' + req.file.originalname;

    // console.log("11", req.file.originalname);
    // console.log("22", req.file.path);
    // console.log("33", targetPath);

    fs.rename(tempPath, targetPath, async function (err) {
      if (err) {
        return res.status(500).json({ error: err });
      }

      // 서비스 실행
      try {
        const whisperResult = await recordService.sendAudio(
          req.file.originalname
        );

        // 로그 기록
        logger.info(
          `(recordService.sendAudio.response) ${JSON.stringify(whisperResult)}`
        );

        // DB 저장
        // const dbResult = await transcribe.create(whisperResult);
        const dbResult = await transcribeService.createTranscribe(
          whisperResult
        );
        // console.log(dbResult);

        // 로그 기록
        // logger.info(`(transcribe.create.result) ${JSON.stringify(dbResult)}`);
        logger.info(
          `(transcribeService.createTranscribe.result) ${JSON.stringify(
            dbResult
          )}`
        );

        // 클라이언트에게 보내는 응답
        const response = {
          whisperResult: whisperResult,
        };
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    });
  });
};
