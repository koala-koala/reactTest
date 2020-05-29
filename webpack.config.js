const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/containers/App.js",
  output: {
    /**
     * 目标文件输出path+filename
     * publicPath：浏览器外部资源路径
     * base(浏览器base) + publicPath + sourceUrl
     * 自动插入到页面的css、js路径都是filename
     */
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   test: /\.less$/,
      //   exclude: "/node_modules/",
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //         importLoaders: 2,
      //         localIdentName: "[local]__[hash:base64:5]"
      //       }
      //     },
      //     "less-loader"
      //   ]
      // },
      {
        test: /\.less$/,
        include: path.resolve("node_modules/antd"),
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9002,
    historyApiFallback: true
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
