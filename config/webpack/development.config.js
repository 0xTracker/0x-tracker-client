const DotenvPlugin = require('dotenv-webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const { getConfig, paths } = require('./base.config');

const ENVIRONMENT = 'development';

module.exports = merge(getConfig(ENVIRONMENT), {
  devtool: 'cheap-module-source-map',
  devServer: {
    compress: true,
    contentBase: paths.output,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    port: 3000,
    stats: 'errors-only',
  },
  entry: { main: ['babel-polyfill', './src/index.js'] },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // Replace out process.env.VARIABLE_NAME in source files with values from .env
    new DotenvPlugin(),

    // Replace out process.env.NODE_ENV in source files with 'development'
    new webpack.EnvironmentPlugin({
      NODE_ENV: ENVIRONMENT,
    }),

    // Hot module reloading
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new ErrorOverlayPlugin(),
  ],
});
