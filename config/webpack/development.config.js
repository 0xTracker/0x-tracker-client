const DotenvPlugin = require('dotenv-webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const { getConfig, paths } = require('./base.config');

const ENVIRONMENT = 'development';

module.exports = merge(getConfig(ENVIRONMENT), {
  devServer: {
    compress: true,
    contentBase: paths.output,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    overlay: true,
    port: 3000,
    stats: 'errors-only',
  },
  devtool: 'cheap-module-source-map',
  entry: {
    main: ['react-hot-loader/patch', './src/index.js'],
  },
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
    new DotenvPlugin({ safe: true }),

    // Replace out process.env.NODE_ENV in source files with 'development'
    new webpack.EnvironmentPlugin({
      NODE_ENV: ENVIRONMENT,
    }),

    // Hot module reloading
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new ErrorOverlayPlugin(),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});
