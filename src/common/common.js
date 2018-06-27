// 倒计时60s函数
export const time60s = (timeNum, showTime) => {
  console.log(timeNum)
  console.log(showTime)
  if (timeNum === 0) {
    timeNum = 60
    showTime = false
    clearTimeout(interval)
    return
  } else {
    timeNum -= 1
    showTime = true
  }
  let interval = setTimeout(() => {
    getTimeNum(timeNum, showTime)
  }, 1000)
}
