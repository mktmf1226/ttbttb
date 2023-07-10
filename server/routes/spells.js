const express = require('express');

const router = express.Router();
const spellsController = require("../controllers/spellsController");


// 맞춤법 검사 생성
router.post('/', spellsController.createSpells);

module.exports = router;
