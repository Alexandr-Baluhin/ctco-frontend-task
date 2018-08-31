const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ngtoolsWebpack = require('@ngtools/webpack');
const commonConfig = require('./webpack.common');

const helper = require('./root.helper');

const AOT = process.env.AOT;
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

// const environment = require('../environment/env.prod');
// const CONFIG = environment.PROD_ENV;

const htmlPluginConfiguration = {
  hash: true,
  minify: {
    caseSensitive: true,
    collapseWhitespace: true,
    keepClosingSlash: true
  }
};

module.exports = () => {
  return webpackMerge(commonConfig('prod', false), {
    devtool: 'source-map',
    mode: 'production',
    target: 'web',
    cache: true,
    performance: {
      hints: false
    },

    output: {
      path: helper.root('dist'),
      // publicPath: '/',
      filename: '[name].[hash].js',
      chunkFilename: '[name].chunk.js'
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: helper.root('src', 'app'),
          use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap']
        },
        {
          test: /\.less$/,
          exclude: helper.root('src', 'app'),
          use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'less-loader']
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(ENV)
      }),

      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      }),

      new HtmlWebpackPlugin(
        Object.assign({
          template: helper.root('src', 'index.html'),
          chunksSortMode: 'none',
        }, htmlPluginConfiguration)),

      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'sync',
        defer: /polyfills|vendors|app/,
        preload: /polyfills|vendors|app/,
        prefetch: [/chunk/]
      }),

      new CompressionPlugin({
        test: /\.(js|css)$/
      }),

      new ngtoolsWebpack.AngularCompilerPlugin({
        tsConfigPath: helper.root('tsconfig.json'),
        entryModule: helper.root('src', 'app', 'app.module#AppModule'),
        skipCodeGeneration: !AOT,
        sourceMap: true
      })
    ]
  });
};
