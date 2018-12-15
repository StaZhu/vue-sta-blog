import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import { Message } from 'element-ui'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    rules: [],
    logo: '',
    isCollapsed: false
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_RULES: (state, rules) => {
      state.rules = rules
    },
    SET_LOGO: (state, logo) => {
      state.logo = logo
    },
    REVERSE_ISCOLLAPSED: (state) => {
      state.isCollapsed = !state.isCollapsed
    }
  },
  actions: {
    login: ({ commit }, userInfo) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/api/authorizations',
          data: {
            username: userInfo.username,
            password: userInfo.password
          },
          headers: {
            'Content-type': 'application/json'
          },
          timeout: 10000
        }).then(response => {
          Cookie.set('ACCESS_TOKEN', response.data.access_token)
          resolve()
        }).catch(error => {
          if (error.response) {
            Message.error(error.response.data.message)
          } else {
            Message.error(error.toString())
          }
          reject(error)
        })
      })
    },
    logout: ({ commit }) => {
      Cookie.remove('ACCESS_TOKEN')
      commit('SET_NAME', '')
      commit('SET_RULES', [])
      commit('SET_LOGO', '')
    },
    getInfo: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/api/info',
          timeout: 10000
        }).then(response => {
          commit('SET_NAME', response.data.name)
          commit('SET_RULES', response.data.rules)
          commit('SET_LOGO', response.data.logo)
          resolve()
        }).catch(error => {
          if (error.response) {
            Message.error(error.response.data.message)
          } else {
            Message.error(error.toString())
          }
          reject(error)
        })
      })
    },
    toggleSidebar: ({ commit }) => {
      Cookie.set('IS_COLLAPSED', Cookie.get('IS_COLLAPSED') === 'false' ? 'true' : 'false', { expires: 7 })
      commit('REVERSE_ISCOLLAPSED')
    },
    initSidebar: ({ commit }) => {
      if (Cookie.get('IS_COLLAPSED') === undefined) {
        // 初始化
        Cookie.set('IS_COLLAPSED', 'false', { expires: 7 })
      } else {
        // 获取原始值
        if (Cookie.get('IS_COLLAPSED') === 'true') {
          commit('REVERSE_ISCOLLAPSED')
        }
      }
    }
  },
  getters: {
    name: state => state.name,
    rules: state => state.rules,
    logo: state => state.loge,
    isCollapsed: state => state.isCollapsed
  }
})
