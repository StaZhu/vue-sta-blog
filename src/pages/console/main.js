import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import SvgIcon from '@/components/SvgIcon.vue'
import App from './App.vue'
import './styles/index.scss'
import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Tree,
  Alert,
  Container,
  Header,
  Main,
  Message
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.prototype.$message = Message

Vue.component('svg-icon', SvgIcon)
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate () {
    // 导入全部svg文件
    const req = require.context('./assets/icons', false, /\.svg$/)
    const requireAll = requireContext => requireContext.keys().map(requireContext)
    requireAll(req)
  },
  render: h => h(App)
})
