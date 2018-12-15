import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isExpanded: false,
    loadingNumber: 0
  },
  mutations: {
    REVERSE_ISEXPANDED: (state) => {
      state.isExpanded = !state.isExpanded
    },
    INCREASE_LOADING_NUMBER: (state) => {
      state.loadingNumber += 1
    },
    CLEAR_LOADING_NUMBER: (state) => {
      state.loadingNumber = 0
    }
  },
  actions: {
    toggleSidebar: ({ commit }) => {
      commit('REVERSE_ISEXPANDED')
    },
    increaseNumber: ({ commit }) => {
      commit('INCREASE_LOADING_NUMBER')
    },
    clearNumber: ({ commit }) => {
      commit('CLEAR_LOADING_NUMBER')
    }
  },
  getters: {
    isExpanded: state => state.isExpanded,
    loadingNumber: state => state.loadingNumber
  }
})
