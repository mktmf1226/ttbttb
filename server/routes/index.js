const express = require('express');

const spellsRouter = require('./spells');
const transcribeRouter = require('./transcribe');

const router = express.Router();

router.use('/spells', spellsRouter);
router.use('/transcribe', transcribeRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
