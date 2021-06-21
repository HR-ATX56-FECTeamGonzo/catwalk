const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;

  return (merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.DefinePlugin({ 'process.env.API_KEY': JSON.stringify(env.API_KEY) })
    ]
  }));
};