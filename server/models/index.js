const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

dotenv.config();

const mongoDb = {
  url: process.env.MONGO_URI,
  dbName: process.env.MONGO_DB_NAME,
};

const db = {};
db.mongoose = mongoose;
db.url = `${mongoDb.url}/${mongoDb.dbName}`;
db.audio = require('./audio.js')(mongoose); // 함수처럼 mongoose 돌림
db.transcribe = require('./transcribe.js')(mongoose); // 함수처럼 mongoose 돌림
db.spell = require('./spell.js')(mongoose); // 함수처럼 mongoose 돌림

module.exports = db;
