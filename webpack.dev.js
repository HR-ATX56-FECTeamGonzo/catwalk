const { merge } = require('webpack-merge');
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
});