import Vue from 'vue'
import router from './router.js'
import SvgIcon from '@/components/SvgIcon.vue'
import store from './store.js'
import App from './App.vue'
import './registerServiceWorker'
import './styles/index.scss'

Vue.component('svg-icon', SvgIcon)
Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  beforeCreate () {
    // 导入全部svg文件
    const req = require.context('./assets/icons', false, /\.svg$/)
    const requireAll = requireContext => requireContext.keys().map(requireContext)
    requireAll(req)
  },
  render: h => h(App)
})
