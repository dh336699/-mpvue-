// import {getToken} from '@/common/urls'

const baseURL = 'https://daihao.frp.dev.wmeimob.com'

export function request(url, method, data, needToken) {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token')
    if (!needToken) {
      wx.request({
        url: baseURL + url, // 接口地址,
        data: data,
        method: method,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res)
        },
        fail(ret) {
          reject(ret)
        }
      })
    } else {
      if (!token) {
        wx.removeStorageSync('token')
        wx.redirectTo({
          url: '/pages/token/main'
        })
      } else {
        wx.request({
          url: baseURL + url, // 接口地址,
          data: data,
          method: method,
          header: {
            'content-type': 'application/json',
            Authorization: token
          },
          success(res) {
            if (res.statusCode === 403) {
              wx.redirectTo({
                url: '/pages/center/register/main'
              })
            } else if (res.statusCode === 401) {
              wx.removeStorageSync('token')
              wx.redirectTo({
                url: '/pages/token/main'
              })
            } else {
              resolve(res)
            }
          },
          fail(ret) {
            reject(ret)
          }
        })
      }
    }
  })
}
