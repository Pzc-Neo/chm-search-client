/* eslint-disable quotes */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/style/index.scss";
        `
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '城墨聚搜'
      return args
    })
  }
})
