const express = require('express');
const router = express.Router();

const transcriptionController = require("../controllers/transcriptionController");
const spellsController = require("../controllers/spellsController");
const transcribeController = require('../controllers/transcribe');
const recordController = require('../controllers/recordController');

// /transcribe 엔드포인트에 POST 요청을 처리하는 라우터

router.post('/transcribe', transcribeController.create);
router.get('/transcribe', transcribeController.findAll);
router.get('/transcribe/:id', transcribeController.findOne);
router.patch('/transcribe/:id', transcribeController.update);
router.delete('/transcribe/:id', transcribeController.delete);

// A 녹음 시작 수행
router.get("/recStart", recordController.recordStart);

// A 녹음 종료 수행
router.get("/recEnd", recordController.recordEnd);

// B 저장하기 버튼 수행 (PASS THROUGH ! 버리지마)
router.get("/dbSave", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result = 'dbSave-success';

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});


// C 저장하지 않기 버튼 수행
router.get("/discard", async (req, res) => {
  
  try {
    const params = req.query;
    console.log(params);
    const result = 'discard-success';

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// D 끝내고 파일로 만들기
router.get("/saveFile", async (req, res) => {
  try {
    const params = req.query;
    console.log(params);
    const result = 'file-success';

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 녹음이 종료되고 클라이언트에서 보내는 파일 처리
router.post("/sendAudio", recordController.sendAudio);
router.post("/sendSpells", spellsController.createSpells);

module.exports = router;
