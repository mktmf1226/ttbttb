const express = require('express');
const router = express.Router();
const transcriptionController = require('../controllers/transcriptionController');

// /transcribe 엔드포인트에 POST 요청을 처리하는 라우터
router.post('/', transcriptionController.createTranscription);

module.exports = router;
