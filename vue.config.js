// 生产环境
const isProduction = process.env.NODE_ENV === 'production';

// 减少体积的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 压缩代码插件
const CompressionPlugin = require('compression-webpack-plugin');
// 匹配那些文件会被压缩
const productionGzipExtensions = new RegExp('.(' + ['js', 'css'].join('|') + ')$');

// cdn加载的插件
const cdn = {
  css: [],
  // cdn加载js文件
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.6/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.5.1/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.20.0/axios.min.js',
  ]
}

module.exports = {
  publicPath:'/',
  outputDir:'dist',
  assetsDir: "static",
  indexPath: "index.html",
  lintOnSave: false,//关闭eslint
  css: {
    // px2rem插件配置，设置原始设计稿的宽度为1920px
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({remUnit: 192}), // 换算的基数
        ]
      }
    }
  },

  chainWebpack: config => {
    // 生产环境配置
    if (isProduction) {
      // 生产环境注入cdn
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args;
        });

      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          filename: "[file].gz[query]",//记得不要用path,用file,不然会打包不成功
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240, //对10K以上的数据进行压缩
          minRatio: 0.8,
          deleteOriginalAssets: false //是否删除源文件
        }));
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      // 用cdn方式引入
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios'
      }

      config.plugins.push(
        // 使用UglifyJsPlugin去掉console 可以略微降低文件大小
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,  //生产环境自动删除console
            },
            warnings: false,
          },
          sourceMap: false,
          parallel: true //使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
        })
      );
    }
  },
}