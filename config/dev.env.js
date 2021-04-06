const { merge } = require('webpack-merge');
const base = require('./base.config');
const path = require('path');

var dev = {
  mode: 'development',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    port: 8888,
    compress: true,
    hot: true
  },
  devtool: "inline-source-map",
}

module.exports = merge(base, dev)