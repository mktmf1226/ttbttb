const superagent = require('superagent');
const dotenv = require('dotenv');
const logger = require('./logger');

dotenv.config();

// api 호출 주소
// api 키
const goodsDataConfig = {
  url: process.env.API_URL,
  key: process.env.API_KEY,
};

const goodsUtil = {
  async getData(params) {
    let response = null;
    const result = {};
    let goodsData = null;
    try {
      response = await superagent.get(goodsDataConfig.url).query({
        serviceKey: goodsDataConfig.key,
        returnType: params.returnType,
        page: params.page,
        perPage: params.perPage,
        // numOfRows: params.numOfRows,
        // pageNo: params.pageNo,
        // sidoName: params.sidoName,
        // ver: params.ver,
      });
      goodsData = JSON.parse(response.text).data;
      goodsData.forEach((v) => {
        if (result[v['상품명']] !== undefined) {
          result[v['상품명']].push(v);
        } else {
          result[v['상품명']] = [v];
        }
      });
      logger.debug(`(goodsUtil.getData)-${result}`);
    } catch (err) {
      logger.error(`(goodsUtil.getData)-${err.toString()}`);
    }
    return result;
  },
};

module.exports = goodsUtil;
