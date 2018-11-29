// 身份证校验
export let idReg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
// 手机号校验
export let telReg = /^1[2-9][0-9]{9}$/
// 订单编号
export let orderNo = /^[A-Za-z0-9]+$/g
// 匹配字符
export let reg1 = /\W+/g
// 匹配汉字
export let reg2 = /^[\u2E80-\u9FFF]+$/g
