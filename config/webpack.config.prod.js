require('dotenv').config();
const {resolve} = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  optimization: {
    minimizer: [new TerserPlugin()],
  },  
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: resolve(__dirname, '..', 'src', 'client', 'index.html'),
      //favicon: resolve(__dirname, '..', 'src', 'client', 'static', 'favicon.png'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      SERVICE_URL: JSON.stringify(process.env.BACKEND_HOSTNAME)
    })
  ]
});
