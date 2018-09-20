export const toast = (title, content, callback) => {
  wx.showModal({
    title,
    content,
    showCancel: false,
    success: callback
  })
}
export const toast2 = (title, content, callback, icon = 'none') => {
  wx.showToast({
    title,
    icon,
    content,
    success: callback
  })
}
export const accAdd = (arg1, arg2) => {
  let r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
