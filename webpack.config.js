const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const baseDir = path.join(__dirname, 'example');
const buildDir = path.join(baseDir, 'public');

module.exports = {
  context: baseDir,
  entry: './client/',

  output: {
    filename: 'main.js',
    path: buildDir,
  },

  devServer: {
    contentBase: buildDir,
    compress: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader' ],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
    ],
  },

  plugins: [
    new MonacoWebpackPlugin(),
  ],

  mode: process.env.NODE_ENV,
};
