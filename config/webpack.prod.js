const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: "production",
  target: "browserslist",
  optimization: {
    // 是否开启代码压缩优化，默认mode为开发环境false，生产环境为true
    // minimize:false,
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin({
        exclude: /node_modules/,
      }),
      // 压缩js
      new TerserPlugin({
        // 多进程压缩 默认true 进程数为os.cpus().length - 1
        parallel: true,
        // 提取注释默认true 提取规则：/^\**!|@preserve|@license|@cc_on/i
        extractComments: false
      })
    ],
    // moduleIds:"deterministic",
    //设置chunkId的计算规则 natural:自然数按照引入顺序增加, deterministic:hash, named:文件名
    // 默认生产环境deterministic 开发named
    // chunkIds:"natural"
  },
  cache: {
    // 开启编译缓存，文件系统类型，存放于node_modules/.cache/webpack文件夹
    type: "filesystem",
    // 自定义缓存存放路径
    // cacheDirectory: path.resolve(__dirname,'../cache')
  },
});
