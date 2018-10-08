const _ = require('lodash');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const { getConfig, paths } = require('./base.config');

const ENVIRONMENT = 'production';

module.exports = (env = {}) =>
  merge(getConfig(ENVIRONMENT), {
    devtool: 'source-map',
    entry: {
      main: ['babel-polyfill', './src/index.js'],
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCssAssetsPlugin(),
      ],
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
      },
    },
    output: {
      filename: 'assets/js/[name].[chunkhash].bundle.js',
    },
    plugins: _.compact([
      new CleanWebpackPlugin([paths.output], {
        root: path.resolve(__dirname, '../../'),
      }),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash].bundle.css',
        chunkFilename: 'assets/css/[name].[contenthash].bundle.css',
      }),

      // Launch the bundle analyzer if --env.analyze=true is passed via  CLI
      env.analyze && new BundleAnalyzerPlugin(),

      new webpack.EnvironmentPlugin({
        NODE_ENV: ENVIRONMENT,
        REACT_APP_API_ENDPOINT: 'https://api.0xtracker.com',
        REACT_APP_AUTO_RELOAD_INTERVAL: '30 seconds',
      }),
    ]),
  });
