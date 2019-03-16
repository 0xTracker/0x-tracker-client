module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        test: /\.stories\.js?$/,
      },
    ],
  },
};
