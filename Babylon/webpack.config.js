const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  entry: path.resolve(appDirectory, "src/main.js"),
  output: {
    //name for the js file that is created/compiled in memory
    filename: "js/hanabiBundle.js",
  },
  resolve: {
    // extensions: [".ts"]
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(appDirectory, "./src"),
    },
  },
  devtool: "inline-source-map",
  devServer: {
    host: "127.0.0.1",
    port: 9123,
    disableHostCheck: true,
    contentBase: path.resolve(appDirectory, "public"), //tells webpack to serve from the public folder
    publicPath: "/",
    hot: true,
  },
  module: {
    rules: [
      // {test: /\.tsx?$/,
      // loader: "ts-loader"}
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 50,
              outputPath: "assets",
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, "public/index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  mode: "development",
};
