import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '@/common/urls'

// import state from './states'
// import mutations from './mutations'
// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setToken(state, token) {
      console.log('setToken')
      wx.setStorageSync('token', token) // 存入缓存是为了下次进小程序时不用重新授权
      state.token = token
    }
  },
  actions: {
    async asyncToken({ commit, state }, products) {
      let { data } = await api.getToken(products)
      console.log(data)
      if (!data.code) {
        wx.hideLoading()
        commit('setToken', data.data.token)
        wx.switchTab({
          url: '/pages/shouye/main'
        })
      }
    }
  },
  getters: {
    getToken: state => state.token || wx.getStorageSync('token')
  }
})
