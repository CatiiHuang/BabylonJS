const path = require('path');
const resolve = (url) => path.resolve(__dirname, url);

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    main: resolve('../index.js'),
  },
  output: {
    path: resolve('../dist/'),
    publicPath: '/',
    filename: 'js/[name].[hash].js',
  },
  resolve: {
    alias: {
      '@': resolve('../'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50,
              outputPath: 'assets',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      hash: true,
      template: resolve('../public/index.html'),
    }),
  ],
  devServer: {
    contentBase: resolve('../dist'),
    host: 'localhost',
    compress: true,
    quiet: true,
    open: true,
    port: '8888',
  },
};
