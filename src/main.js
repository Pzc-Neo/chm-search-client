import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './lib/elementUI'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
