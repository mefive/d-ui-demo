var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var BUILD_PATH = 'live';

module.exports = {
  entry: {
    polyfill: [
      'babel-polyfill',
    ],
    vendor: [
      'moment',
      'highcharts',
    ],
    react: [
      'react',
      'react-dom',
      'prop-types',
      'react-router',
    ],
  },
  output: {
    filename: '[name].[chunkhash].dll.js',
    path: path.join(__dirname, BUILD_PATH, 'dll'),
    library: '[name]_lib',
  },
  plugins: [
    new CleanWebpackPlugin(['live/dll/*.*']),
    new webpack.DllPlugin({
      path: path.join(__dirname, BUILD_PATH, 'dll', '[name]-manifest.json'),
      name: '[name]_lib',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    new UglifyJsPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
};
