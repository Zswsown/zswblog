import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

// 使用makedown编辑器
Vue.use(mavonEditor)

// 创建一个事件总线，用来解决图片加载时不可滚动的问题
Vue.prototype.$bus=new Vue()

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
