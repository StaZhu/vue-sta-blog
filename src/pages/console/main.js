import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import SvgIcon from '@/components/SvgIcon.vue'
import App from './App.vue'
import './styles.scss'
import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  Button,
  DatePicker,
  TimePicker,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tree,
  Alert,
  Col,
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
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Col)
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
