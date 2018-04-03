/* eslint-env node */
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var LodashWebpackPlugin = require('lodash-webpack-plugin');

var BUILD_PATH = 'live';

if (process.env.NODE_ENV === 'production') {
  var dllFiles = fs.readdirSync(`./${BUILD_PATH}/dll/`).map(function (file) {
    if (file.indexOf('dll.') >= 0) {
      return `dll/${file}`;
    }
    return null;
  }).filter(Boolean);
}

module.exports = function () {
  let config = {
    entry: {
      index: './src/app/index',
    },
    output: {
      filename: 'js/[name].[chunkhash:7].js',
      path: path.resolve(__dirname, BUILD_PATH),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            path.join(__dirname, 'src'),
            path.join(__dirname, '/node_modules/d-ui/')
          ],
          use: 'babel-loader',
        },
        {
          test: /\.(sc|c|sa)ss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
          }),
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100,
                name: 'images/[name].[hash:7].[ext]',
              },
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'font/[name].[hash:7].[ext]',
              },
            }
          ]
        },
        {
          test: /\.(rar|jar|zip)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1,
                name: 'files/[name].[hash:7].[ext]',
              },
            }
          ]
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new ExtractTextPlugin('css/[name].[chunkhash:7].css'),
    ],
  };

  if (process.env.NODE_ENV === 'production') {
    config = merge(config, {
      plugins: [
        new LodashWebpackPlugin(),

        new CleanWebpackPlugin([
          '*.html', 'js/*.*', 'images/*.*', 'css/*.*',
        ], { root: path.join(__dirname, BUILD_PATH) }),

        new webpack.DllReferencePlugin({
          context: '.',
          // eslint-disable-next-line
          manifest: require(`./${BUILD_PATH}/dll/ashim-manifest.json`),
        }),
        new webpack.DllReferencePlugin({
          context: '.',
          // eslint-disable-next-line
          manifest: require(`./${BUILD_PATH}/dll/react-manifest.json`),
        }),
        new webpack.DllReferencePlugin({
          context: '.',
          // eslint-disable-next-line
          manifest: require(`./${BUILD_PATH}/dll/vendor-manifest.json`),
        }),

        new HtmlWebpackPlugin({
          template: './src/templates/index.ejs',
          dllFiles,
          filename: 'index.html',
        }),

        // new UglifyJsPlugin({
        //   parallel: true,
        //   cache: true,
        // }),
      ],
    });
  } else {
    config = merge(config, {
      devtool: '#eval-source-map',
      devServer: {
        port: 9909,
        inline: false,
        hot: false,
        contentBase: path.resolve(__dirname, 'div'),
        host: '0.0.0.0',
        disableHostCheck: true,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/templates/index.html',
          filename: 'index.html',
        }),
      ]
    })
  }

  return config;
};
