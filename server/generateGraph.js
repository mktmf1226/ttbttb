const mermaid = require('mermaid');

// Mermaid.js 초기화
mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
});

// Mermaid 코드
const graphCode = `
  erDiagram
  style defaultEntity lineColor black
  style defaultRelationship lineColor black

  entity "Audio Collection" {
      _id ObjectId
      audio String
      transcription ObjectId
  }

  entity "Transcribe Collection" {
      _id ObjectId
      text String
      spelling ObjectId
  }

  entity "Spelling Collection" {
      _id ObjectId
      result String
  }

  "Audio Collection" ||..|| "Transcribe Collection" : "transcription"
  "Transcribe Collection" ||..|| "Spelling Collection" : "spelling"
`;

// 그래프 생성
const svgCode = mermaid.render('graphDiv', graphCode);

// SVG 코드 출력
console.log(svgCode);
