module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    enforce: 'pre',
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    test: /\.stories\.js?$/,
  });

  return defaultConfig;
};
