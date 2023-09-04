const path = require("path");
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "" : "./",
  // 输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  /** vue3.0内置了webpack所有东西，
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("scg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/components/svgIcon/icon"],
      });
  },
  configureWebpack: (config) => {
    config.resolve = {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@u": path.resolve(__dirname, "./src/utils"),
        "@c": path.resolve(__dirname, "./src/components"),
        "@a": path.resolve(__dirname, "./src/api"),
      },
    };
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`,
      },
    },
    requireModuleExtension: true,
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      [process.env.VUE_APP_API]: {
        target: process.env.VUE_BASE_URL, //目标服务器地址
        changeOrigin: true, //是否跨域
        ws: false,
        secure: false,
        pathRewrite: {
          [`^${process.env.VUE_APP_API}`]: "", //重写路径
        },
      },
    },
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {},
  lintOnSave: false, //关闭eslint检查
};
