var path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: path.join(SRC_DIR, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|png)?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  mode: 'development'
};
