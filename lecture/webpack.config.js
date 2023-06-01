// const path = require("path")
// const webpack = require("webpack")

// module.exports = {
//   mode: "development", //production
//   devtool: "eval", //hidden-source-map
//   resolve: {
//     extensions: [".jsx", ".js", ".tsx", ".ts"],
//   },
//   entry: {
//     app: "./client", //client.tsx 가 메인이 될거임 이걸통해 app.js를 만듦,
//     module: {
//       rules: [
//         {
//           //babel 대신 ts설정 여기에서
//           test: /\.tsx?$/,
//           loader: "ts-loader", //ts-loader를 동해서 tsx를 변환하겠다
//         },
//       ],
//     },
//     plugins: [],
//     output: {
//       filename: "[name].js", //app.js
//       path: path.join(__dirname, "dist"), //npx webpack 실행 시 client.jsx를 통해 웹팩처리 후 dist 폴더가 생기고 dist안에 app.js가 들어있을것임
//     },
//   },
// }

const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: "development", // production
  devtool: "eval", // hidden-source-map
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },

  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [],
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/dist",
  },
}
