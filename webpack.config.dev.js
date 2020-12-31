const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = {
  ...webpackConfig,
  mode: 'development',
  entry: [
    webpackConfig.entry,
    'webpack-hot-middleware/client',
  ],
  plugins: [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
};
