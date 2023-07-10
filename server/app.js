const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsConfig = require('./config/corsConfig.json');
const models = require('./models/index');
const logger = require('./lib/logger');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const transcriptionRoutes = require('./routes/transcriptionRoutes');

const app = express();

logger.info('app start');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MongoDB에 연결
mongoose
  .connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB에 연결됨');
  })
  .catch((error) => {
    console.error('MongoDB 연결 오류:', error);
  });

// JSON 파싱 미들웨어 설정
app.use(express.json());

// /api 경로로 들어오는 요청을 transcriptionRoutes로 전달
app.use('/api', transcriptionRoutes);

// DB 연결 확인 및 table 생성
models.sequelize
  .authenticate()
  .then(() => {
    logger.info('DB connection success');

    // sequelize sync (table 생성)
    models.sequelize
      .sync()
      .then(() => {
        logger.info('Sequelize sync success');
      })
      .catch((err) => {
        logger.error('Sequelize sync error', err);
      });
  })
  .catch((err) => {
    logger.error('DB Connection fail', err);
  });

// app.use(logger('dev'));
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// // 서버 시작
// app.listen(PORT, () => {
//   console.log('http://localhost:${PORT}');
// });

module.exports = app;
