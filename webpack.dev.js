const { merge } = require('webpack-merge');
const webpack = require('webpack');
var path = require('path');
var DIST_DIR = path.join(__dirname, '/client/dist');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client/dist',
    port: 8000
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.LOGGER_LEVEL': JSON.stringify('info')
    })
  ]
});