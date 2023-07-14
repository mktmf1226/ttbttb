const express = require('express');
const router = express.Router();

const spellsController = require("../controllers/spellsController");
const transcribeController = require('../controllers/transcribeController');
const recordController = require('../controllers/recordController');
const buttonController = require('../controllers/buttonController');

// /transcribe 엔드포인트에 POST 요청을 처리하는 라우터

router.post('/', transcribeController.create);
router.get('/selectAllTranscribe', transcribeController.findAll);

// router.get('/:id', transcribeController.findOne);
router.patch('/:id', transcribeController.update);
// router.delete('/transcribe/:id', transcribeController.delete);
// router.delete('/:id', transcribeController.softDelete);

// A 녹음 시작 수행
router.get("/recStart", buttonController.recordStart);

// A 녹음 종료 수행
router.get("/recEnd", buttonController.recordEnd);

// B 저장하기 버튼 수행 (PASS THROUGH ! 버리지마)
router.get("/dbSave", buttonController.dbSave);

// C 저장하지 않기 버튼 수행
router.get("/discard", buttonController.discard);

// D 끝내고 파일로 만들기
router.get("/saveFile", buttonController.saveFile);

// 녹음이 종료되고 클라이언트에서 보내는 파일 처리
router.post("/sendAudio", recordController.sendAudio);
router.post("/sendSpells", spellsController.createSpells);

// 맞춤법검사결과 전체 조회
router.get('/selectAllSpells', spellsController.findAll);

// 최근 1건 삭제
router.delete('/delete', buttonController.delete);

// 문서 저장
// router.get('/saveFile', buttonController.delete);

module.exports = router;
