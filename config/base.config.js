const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      },
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
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          // 源路径
          from: "./public",
          // 目标路径
          to: path.resolve(__dirname, "../build"),
          globOptions: {
            // index.html已经由html-webpack-plugin生成，再次复制会报错，所以这里忽略index.html不进行复制
            ignore: ["**/*index.html"]
          }
        }
      ],
      options: {
        // fs文件操作的并发数
        concurrency: 100,
      }
    })
  ],
  optimization: {
    // 是否开启代码压缩优化，mode为开发环境false，生产环境为true
    // minimize:false,
    // 优化压缩
    minimizer: [
      // 压缩css文件插件css-minimizer-webpack-plugin
      new CssMinimizerWebpackPlugin(),
      // 压缩js
      new TerserPlugin({
        // 多进程压缩 默认true 进程数为os.cpus().length - 1
        parallel: true,
        // 提取注释默认true 提取规则：/^\**!|@preserve|@license|@cc_on/i
        extractComments: false
      })
    ],
    // moduleIds:"deterministic",
    //设置chunkId的计算规则 natural自然数按照引入顺序增加 deterministic文件名hash named文件名
    // 默认生产环境deterministic 开发named
    // chunkIds:"natural"
  }
}