module.exports = ({ config }) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        enforce: 'pre',
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        test: /\.stories\.js?$/,
      },
    ],
  },
});
