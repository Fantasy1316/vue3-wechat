module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "./src/assets/styles/mixins.scss";
          @import "./src/assets/styles/animation.scss";
        `,
      },
    },
  },
  // 禁止图片转base64，避免表情加载不出来
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: -1 }))
  },
}
