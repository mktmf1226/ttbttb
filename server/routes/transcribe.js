const express = require("express");
const router = express.Router();
const transcriptionController = require("../controllers/transcriptionController");
const recordController = require("../controllers/recordController");

// /transcribe 엔드포인트에 POST 요청을 처리하는 라우터

router.post('/', transcriptionController.createTranscription);
router.get('/transcriptions', transcriptionController.getTranscriptions);

// 버튼 누르기 테스트
router.get("/test", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result = "test successed";

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 녹음 시작
router.get("/recStart", recordController.recordStart);

// 녹음 종료
router.get("/recEnd", recordController.recordEnd);

// DB 넣기
router.get("/dbSave", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result = "dbsave-success";

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 저장하지 않기
router.get("/discard", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result ="discard-success";

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 끝내고 파일로 만들기
router.get("/saveFile", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result = "file-success";

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});


module.exports = router;
