const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  // mode: process.env.NODE_ENV,
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
    page3: './src/page3.js',
  },
  output: {
    filename: 'js/[name].[contenthash:6].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader', // url-loader具有file-loader全部功能，不同的是url-loader可以把资源转为base64
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'imgs', // 打包的图片放在该文件下
              publicPath: './imgs/', // 公共路径
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'fonts',
              publicPath: './fonts/',
              limit: 4096,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
        common: {
          chunks: 'initial',
          minChunks: 2,
          priority: -20,
          test: /[\\/]src[\\/]/,
          reuseExistingChunk: true,
          name: 'common',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'page1.html',
      chunks: ['page1'],
    }),
    new HtmlWebpackPlugin({
      filename: 'page2.html',
      chunks: ['page2'],
    }),
    new HtmlWebpackPlugin({
      filename: 'page3.html',
      chunks: ['page3'],
    }),
    new ESLintPlugin(),
  ],
}
