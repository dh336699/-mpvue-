// 时间戳处理函数 转换的格式为：2018-1-2 => 2018-01-02 || 2018-01-02 10:00:00
export function transform13Time(timestamp, type) {
  // var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M = padStart(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = padStart(date.getDate())
  var h = ' ' + padStart(date.getHours()) + ':'
  var m = padStart(date.getMinutes()) + ':'
  var s = padStart(date.getSeconds())
  // console.log(typeof m)
  if (m <= 10) {
    m = '0' + m
  }
  // var s = date.getSeconds()
  if (!type) { // 不传返回年月日
    return Y + M + D
  } else {
    return Y + M + D + h + m + s
  }
}
// 时间处理函数 例如：2018-1-2 => 2018-01-02
export function padStart(str) {
  str = str.toString()
  str = str.padStart(2, '0')
  return str
}
export function transform13Times(timestamp, type) {
  // var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate()
  var h = ' ' + date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds()
  // console.log(typeof m)
  if (m <= 10) {
    m = '0' + m
  }
  // var s = date.getSeconds()
  if (!type) { // 不传返回年月日
    return Y + M + D
  } else {
    return Y + M + D + h + m + s
  }
}

// 倒计时60s函数
export const time60s = (timeNum, showTime) => {
  console.log(timeNum)
  console.log(showTime)
  let interval = setTimeout(() => {
    time60s(timeNum, showTime)
  }, 1000)
  if (timeNum === 0) {
    timeNum = 60
    showTime = false
    clearTimeout(interval)
    return timeNum
  } else {
    timeNum -= 1
    showTime = true
    return timeNum
  }
}
// 微信上传图片-七牛
export const chooseImg = (img, imgPass, url) => {
  let that = this
  wx.chooseImage({
    count: 4, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      console.log(res)
      let tempFilePaths = res.tempFilePaths
      // evaluation.isUsedForShowImgs = tempFilePaths
      for (let i = 0; i < tempFilePaths.length; i++) {
        let key = Math.random().toString().substr(0, 2)
        that.uploadFun(i, res, key, img, imgPass, url)
      }
    }
  })
}
export const uploadFun = (i, res, key, img, imgPass, url) => {
  let that = this
  wx.uploadFile({
    url,
    filePath: res.tempFilePaths[i],
    name: 'file',
    formData: {
      key: key,
      token: that.data.uploadToken
    },
    success: function(rest) {
      console.log(rest)
      img = [...that.data.justImage, res.tempFilePaths[i]]
      imgPass = [...that.data.justImage, that.data.domain + '/' + JSON.parse(rest.data).key]
      return {img, imgPass}
      // that.setData({
      //     justImage: [...that.data.justImage, res.tempFilePaths[i]], // 展示在页面的数组
      //     justImages: [...that.data.justImage, that.data.domain + '/' + JSON.parse(rest.data).key], // 传给后台的数组
      //     justShow: true
      // })
    }
  })
}
