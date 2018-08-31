const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const commonConfig = require('./webpack.common');

const helper = require('./root.helper');
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

// const environment = require('../environment/env.dev');
// const CONFIG = environment.DEV_ENV;

module.exports = () => {
  return webpackMerge(commonConfig(), {
    devtool: 'cheap-module-source-map',
    mode: 'development',

    output: {
      path: helper.root('dist'),
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: helper.root('src', 'app'),
          use: ['style-loader', 'css-loader?sourceMap']
        },
        {
          test: /\.less$/,
          exclude: helper.root('src', 'app'),
          use: ['style-loader', 'css-loader?sourceMap', 'less-loader']
        }
      ]
    },


    plugins: [
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(ENV)
      }),

      new HtmlWebpackPlugin({
        template: helper.root('src', 'index.html'),
        chunksSortMode: 'dependency'
      }),

      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'sync',
        defer: /polyfills|vendors|app/,
        preload: /polyfills|vendors|app/
      })
    ],

    devServer: {
      host: "0.0.0.0",
      historyApiFallback: true,
      stats: 'minimal',
      watchOptions: {
        ignored: /node_modules/
      }
    }
  });
};
