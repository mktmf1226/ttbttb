const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
// const { isLoggedIn } = require('../lib/middleware');
const goodsUtil = require('../lib/goodsUtil');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      returnType: req.body.returnType,
      page: req.body.page,
      perPage: req.body.perPage,
      // numOfRows: req.body.numOfRows,
      // pageNo: req.body.page,
      // sidoName: req.body.sidoName,
      // ver: req.body.ver,

    };
    logger.info(`(goods.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    // if (!params.name) {
    //   const err = new Error('Not allowed null (name)');
    //   logger.error(err.toString());

    //   res.status(500).json({ err: err.toString() });
    // }

    // 비즈니스 로직 호출
    const result = await goodsUtil.getData(params);
    logger.info(`(goods.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
