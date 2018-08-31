const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helper = require('./root.helper');
const AOT = process.env.AOT;

module.exports = () => {
  return {
    entry: {
      // polyfills: helper.root('src', 'polyfills.ts'),
      // vendor: helper.root('src', 'vendor.ts'),
      app: helper.root('src', 'main.ts'),
    },

    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.less', '.html'],
      modules: [helper.root('src'), helper.root('node_modules')],
      mainFields: ['main', 'module']
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          polyfills: {
            test: /[\\/]node_modules[\\/](core-js|zone\.js|classlist\.js|web-animations-js)/,
            name: 'polyfills',
            chunks: 'initial',
            priority: -5,
            enforce: true
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -10,
            enforce: true
          }
        }
      }
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: AOT ? ['@angular-devkit/build-optimizer/webpack-loader', '@ngtools/webpack'] : [{
            loader: 'ng-router-loader',
            options: {
              loader: 'async-import',
              genDir: 'compiled',
              aot: AOT
            }}, 'awesome-typescript-loader', 'angular2-template-loader']
        },
        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          options: {
            emitErrors: false,
            failOnHint: false,
            fix: true
          }
        },
        {
          test: /\.html$/,
          include: helper.root('src', 'app'),
          use: 'html-loader'
        },
        {
          test: /\.css$/,
          include: helper.root('src', 'app'),
          use: ['to-string-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          include: helper.root('src', 'app'),
          use: ['to-string-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: 'file-loader?name=assets/[name].[hash].[ext]'
        }
      ]
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new CopyWebpackPlugin([
        {from: 'src/assets', to: 'assets'},
        {from: 'examples', to: 'examples'}
      ])
    ]
  };
};
