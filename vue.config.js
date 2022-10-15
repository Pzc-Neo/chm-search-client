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
    /**
     * Because our component's name is like `componentName/index.vue`.
     * So when we print somthing to console(such as log),
     * the path of component on the right side might be wrong.
     * That's why I add this option.
     */
    devtool: "source-map"
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "城墨聚搜"
      return args
    })
  }
})
