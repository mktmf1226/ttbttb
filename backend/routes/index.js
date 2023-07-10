const express = require('express');

const goodsRouter = require('./goods');
const spellsRouter = require('./spells');

const router = express.Router();

router.use('/goods', goodsRouter);
router.use('/spells', spellsRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
