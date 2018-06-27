import Vue from 'vue'
import App from './App'
import mpvueToastRegistry from 'mptoast/registry'

import {request} from './utils/request.js'

Vue.prototype.$axios = request
mpvueToastRegistry(Vue)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#2C2D31',
      backgroundColor: 'black',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#888888',
      selectedColor: '#F3A68D',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: '/static/assets/home.png',
        selectedIconPath: '/static/assets/home-active.png',
        backgroundColor: 'white'
      }, {
        pagePath: 'pages/order/main',
        text: '订单',
        iconPath: '/static/assets/order.png',
        selectedIconPath: '/static/assets/order-active.png',
        backgroundColor: 'white'
      }, {
        pagePath: 'pages/center/main',
        text: '我的',
        iconPath: '/static/assets/mine.png',
        selectedIconPath: '/static/assets/mine-active.png',
        backgroundColor: 'white'
      }]
    }
  }
}