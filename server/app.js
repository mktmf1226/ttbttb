const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsConfig = require('./config/corsConfig.json');
const logger = require('./lib/logger');
const dotenv = require('dotenv');
const socket = require('./lib/socket');

const indexRouter = require('./routes/index');

const app = express();

dotenv.config();

const mongoDb = {
  url: process.env.MONGO_URI,
  dbName: process.env.MONGO_DB_NAME,
};

logger.info('app start');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MongoDB에 연결
const db = require('./models/index.js');
db.mongoose
  .connect(`${mongoDb.url}/${mongoDb.dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('mongoDb.url', mongoDb.url);
    console.log('mongoDb.dbName', mongoDb.dbName);
    console.log('db.mongoose', db.mongoose);
    console.log('db.transcribe.db', db.transcribe.db);

    logger.info('MongoDB 연결 성공.');
  })
  .catch((err) => {
    logger.error('MongoDB 연결 실패:', err);
    process.exit();
  });

// socket.io
// io = require('socket.io')();를 하면 bin/www에서 서버와 연결하기 어렵다
// bin/www와 socket 연결은 www 에서 적용한다
const io = require('socket.io')({
  path: '/socket.io', // 경로 설정
  cors: {
    origin: [
      'http://localhost:3000',
      'http://192.168.0.71:3000',
      'http://192.168.0.75:3000',
    ],
    credentials: true,
  },
  pingTimeout: 600000,
});
app.io = io;
global.io = io;

// JSON 파싱 미들웨어 설정
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.0.71:3000",
      "http://192.168.0.75:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// socekt.io 로직은 module.exports = app; 바로 직전에 입력
socket.socketHandler(io);

module.exports = app;
