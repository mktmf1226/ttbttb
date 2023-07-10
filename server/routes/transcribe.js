const express = require("express");
const router = express.Router();
const transcriptionController = require("../controllers/transcriptionController");

// /transcribe 엔드포인트에 POST 요청을 처리하는 라우터

router.post('/', transcriptionController.createTranscription);
router.get('/transcriptions', transcriptionController.getTranscriptions);

router.post("/", transcriptionController.createTranscription);

// 버튼 누르기 테스트
router.get("/test", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result = {
      msg: "버튼입력 요청완료",
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 녹음 시작
router.get("/recStart", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result = {
      msg: "녹음시작버튼 처리완료",
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 녹음 종료
router.get("/recEnd", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result = {
      msg: "녹음종료버튼 처리완료",
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 저장 하기
router.get("/continueYes", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result = {
      msg: "저장하기 처리완료",
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 저장하지 않기
router.get("/continueNo", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result = {
      msg: "버리기 처리완료",
    };

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
    const result = {
      msg: "파일저장 처리완료",
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});


module.exports = router;
