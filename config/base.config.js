const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    chunkFilename: 'js/[id].chunk.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // 提取css文件
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-study',
      template: "./public/index.html",
      //favicon图标
      favicon: './src/Multiavatar-hurole.png'
    }),
    // 提取css为单独文件的插件mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[id].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          // 源路径
          from: "./public",
          // 目标路径
          to: path.resolve(__dirname,"../build"),
          globOptions:{
            // index.html已经由html-webpack-plugin生成，再次复制会报错，所以这里忽略index.html不进行复制
            ignore:["**/*index.html"]
          }
        }
      ],
      options:{
        // fs文件操作的并发数
        concurrency: 100,
      }
    })
  ],
  optimization: {
    // 优化压缩
    minimizer: [
      // 压缩css文件插件css-minimizer-webpack-plugin
      new CssMinimizerWebpackPlugin()
    ]
  }
}