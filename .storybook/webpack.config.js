const path = require("path");

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.sass$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, "../")
  });
  storybookBaseConfig.module.rules.push({
    test: /\.jsx?$/,
    loaders: [ require.resolve('@storybook/addon-storysource/loader') ],
    enforce: 'pre',
  })
  storybookBaseConfig.resolve =  {extensions: ['.js','.jsx']}

  return storybookBaseConfig;
};