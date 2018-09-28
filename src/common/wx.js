export const toast = (msg, callback) => {
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    success: callback
  })
}
export const toast2 = (title, icon = 'none', callback) => {
  wx.showToast({
    title,
    icon,
    success: callback
  })
}
export const setCookie = (key, value) => {
  wx.setStorageSync(key, value)
}
export const getCookie = key => {
  wx.getStorageSync(key)
}
export const chooseImgs = (count = 4) => {
  wx.chooseImage({
    count: count,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      return tempFilePaths
    }
  })
}
export const load = (title = 'Loading...', mask = true) => {
  wx.showLoading({
    title,
    mask
  })
}
export const hide = () => {
  wx.hideLoading()
}
export const setTitle = (title) => {
  wx.setNavigationBarTitle({
    title
  })
}
export const navTo = (url) => {
  wx.navigateTo({
    url
  })
}
export const newTo = (url) => {
  wx.redirectTo({
    url
  })
}
export const barTo = (url) => {
  wx.switchTab({
    url
  })
}
export const back = (url) => {
  wx.navigateBack()
}
