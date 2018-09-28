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
