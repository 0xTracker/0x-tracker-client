const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const paths = {
  output: path.resolve(__dirname, '../../dist'),
  public: '/',
  staticFiles: 'public',
};

const getConfig = environment => ({
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/img',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: paths.output,
    publicPath: paths.public,
  },
  plugins: [
    // Copy public files (except index.html) to output
    new CopyWebpackPlugin([
      { from: paths.staticFiles, ignore: ['index.html'] },
    ]),

    // Generate index.html with asset paths injected
    new HtmlWebpackPlugin({
      template: path.resolve(paths.staticFiles, 'index.html'),
      templateParameters: { NODE_ENV: environment },
    }),

    new UnusedFilesWebpackPlugin({
      failOnUnused: true,
      globOptions: {
        ignore: [
          'src/**/*.stories.js',
          'src/components/hidden.js',
          'src/components/visible.js',
          'src/**/*.test.js',
          'src/**/*.test.js.snap',
          'src/test-util/**/*.*',
          'src/components/filter-button.js',
          'src/features/traders/components/traders-filter-dialog.js',
          'src/features/traders/components/traders-filter.js',
          'src/features/traders/components/trader-type-selector.js',
        ],
      },
      patterns: ['src/**/*.*'],
    }),
  ],
});

module.exports = {
  getConfig,
  paths,
};
