const config = {
  request: {
    baseURL: 'http://www.ciyun.com',
    header: 'application/json',
    Authorization: wx.getStorageSync('token'),
    invaidToken: '/pages/token/main'
  }
}
export default config