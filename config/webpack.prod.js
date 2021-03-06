const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css打包
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // css压缩
const TerserPlugin = require('terser-webpack-plugin') // js压缩
const common = require('./webpack.common.js')

// css和sass公共loader
const cssLoaders = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
    },
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer'],
      },
    },
  },
]

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [...cssLoaders],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [...cssLoaders, 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
  ],
})
