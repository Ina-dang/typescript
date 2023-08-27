const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

//웹팩 설정
module.exports = {
  // mode: 'development',
  mode: 'production',
  //시작점(Entry Point)잡기
  entry: './src/app.ts',
  //출력 경로잡기
  // filename: 'bundle.[contentcash].js' 처럼 동적으로도 가능
  output: {
    filename: 'bundle.js',
    //특정 경로 절대경로로 빌드를 가능하게해줌 => dist폴더 절대경로 구축 후 웹펙은 해당 경로를 사용해 output
    path: path.resolve(__dirname, 'dist'),
  },
  // devtool: 'inline-source-map',
  //app.ts 찾은 후 타입스크립트로 뭐할지 알려주기
  module: {
    //=> 웹팩 문서 loader보면됨
    rules: [
      {
        //ts파일로 끝나는지 정규식검사후 ts-loader사용
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
