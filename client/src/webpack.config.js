const path = require("path");

module.exports = {
  entry: "./src/index.js", // 웹팩 번들링의 시작점(entry point)
  output: {
    path: path.resolve(__dirname, "dist"), // 번들링된 파일의 출력 경로
    filename: "bundle.js", // 번들링된 파일의 이름
  },
  module: {
    rules: [
      {
        test: /\.js$/, // .js 확장자를 가진 모든 JavaScript 파일에 대해서
        exclude: /node_modules/, // node_modules 디렉토리를 제외하고
        use: [
          "babel-loader", // Babel 로더를 사용하여 ES6+ 문법을 변환]
          "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      // 다른 파일 형식에 대한 로더들을 추가로 설정할 수 있음
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
  // 플러그인 등 다른 구성 옵션들을 추가로 설정할 수 있음
};
