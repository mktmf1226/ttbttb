const express = require('express');
const http = require('http');
const app = express();
const dotenv = require('dotenv');
const server = http.Server(app);
const fs = require('fs');
const request = require('request');
const multer = require('multer');
const bodyParser = require('body-parser');

dotenv.config();

var openApiURL = process.env.OPEN_API_URL;
var accessKey = process.env.ACCESS_KEY;
var languageCode = 'korean';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 저장경로 설정 : 현재 디렉토리.
// var upload = multer({ dest: __dirname });
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/test.html');
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // app.get('/', (req, res) => {
  //   // 현재 디렉토리에 있는 test.html 파일을 클라이언트에게 보낸다.
  //   res.sendFile('test.html', { root: __dirname });
  // });
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html', { 'Content-Type': 'text/html' });
  });

  // 클라이언트에게 음성파일을 받아서
  // 단일 파일 업로드 : upload.single('uploaded_file')의 매개변수(uploaded_file)는 form을 통해 전송되는 파일의 name속성을 가져야 함.
  app.post('/user', upload.single('uploaded_file'), function (req, res) {
    var audioFilePath = req.file.path;

    // 파일 가져오기. (동기)
    var audioData = fs.readFileSync(audioFilePath);

    // 음성 파일을 Base64로 Encoding 하여
    var requestJson = {
      argument: {
        // 언어 : 한국어로 설정.
        language_code: languageCode,
        // 음성 파일을 Base64로 Encoding.
        audio: audioData.toString('base64'),
      },
    };

    var options = {
      url: openApiURL,
      body: JSON.stringify(requestJson),
      headers: { 'Content-Type': 'application/json', Authorization: accessKey },
    };

    // ETRI Open API 서버에 HTTP 통신으로 전달한다.
    request.post(options, function (error, response, body) {
      //  ETRI Open API 서버가 음성인식 결과를 응답메세지에 넣어서 반환해주면,
      if (!error) {
        // 그 결과를 클라이언트에게 전송하고
        let json = JSON.parse(body);
        res.status(200).send(json.return_object.recognized);

        // 파일을 삭제한다.
        fs.unlink(req.file.path, function (err) {
          if (err) {
            console.log('Error : ', err);
          }
        });
      }
    });
  });
});
