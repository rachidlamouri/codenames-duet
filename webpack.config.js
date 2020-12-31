const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      store: path.resolve(__dirname, 'src/store/'),
      styles: path.resolve(__dirname, 'src/styles/'),
    },
    extensions: [
      '.js',
      '.vue',
    ],
  },
};
