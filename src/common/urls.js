import {request} from '../utils/request.js'
// request 参数说明：(url，方法，数据参数，是否需要token)
// 获取token
export const getToken = data => request(`/api/wx_code/xcx_token?code=${data.code}&nickname=${data.nickname}&headimgurl=${data.headimgurl}&gender=${data.gender}`, 'get', {}, false)
// 获取验证码
export const sendCode = data => request(`/api/wx/user/code?mobile=${data.mobile}`, 'get', data, true)
// 注册
export const register = data => request(`/api/wx/user/register?mobile=${data.mobile}&code=${data.code}`, 'post', data, true)
// 查询区域
export const city = data => request(`/api/wx_index/city?lng=${data.lng}&lat=${data.lat}`, 'get', data, true)
export const cities = data => request(`/api/wx_index/city`, 'get', data, true)
// 查询banner轮播图
export const banner = data => request(`/api/wx_index/banner`, 'get', data, true)
// 查询分类图
export const indexClass = data => request(`/api/wx_index/indexClass`, 'get', data, true)
// 查询热卖项目or搜索
export const hotItem = data => request(`/api/wx_index/index_project?cityId=${data.cityId}`, 'get', {}, true)
export const cityId = data => request(`/api/wx_index/index_project?cityId=${data.cityId}&projectTypeId=${data.projectTypeId}&rank=${data.rank}`, 'get', {}, true)
export const xiadan = data => request(`/api/wx_index/index_project?cityId=${data.cityId}&projectTypeId=${data.projectTypeId}`, 'get', {}, true)
export const project = data => request(`/api/wx_index/index_project?cityId=${data.cityId}&name=${data.name}`, 'get', {}, true)
// 根据项目id查询项目
export const projectById = data => request(`/api/wx_index/projectById?id=${data.id}`, 'get', {}, true)
// 查询附加服务
export const fujia = data => request(`/api/wx_project/service_data`, 'get', {}, true)
// 查询预定时间
export const getDate = data => request(`/api/wx_project/getDate?id=${data.id}`, 'get', {}, true)

// 注册
// export const register = data => request(`/wx/user/register?mobile=${data.mobile}&code=${data.code}`, 'post', data, true)
// 获取验证码
// export const code = data => Util.http.get(`/wx/user/code?mobile=${data.mobile}`, {})
// 根据id查询富文本
export const richText = data => request(`/api/wx/rich_text?id=${data.id}`, 'get', {}, true)
// 查询联系人
export const searchContacter = data => request(`/api/wx/user_person_data/get/user_data`, 'get', {}, true)
// 添加联系人
export const addContacter = data => request(`/api/wx/user_person_data/add/user_data?name=${data.name}&mobile=${data.mobile}&card=${data.card}`, 'post', {}, true)
// 编辑用户
export const editUser = data => request(`/api/wx/user_person_data/put/user_data`, 'post', data, true)
// 删除用户
export const delUser = data => request(`/api/wx/user_person_data/del/${data.id}`, 'delete', data, true)
// 确认订单
export const addOrder = data => request(`/api/wx_project/addOrder`, 'post', data, true)

// 微信支付
export const wxPaid = data => request(`/api/wx_pay/wx_pay?orderNo=${data.orderNo}`, 'get', {}, true)
// 退款
export const refund = data => request(`/api/wx_project/refund`, 'post', data, true)
// 取消订单
export const putOrder = data => request(`/api/wx/user/putOrder?id=${data.id}`, 'put', {}, true)
// 删除订单
export const delOrder = data => request(`/api/wx/user/order/${data.id}`, 'delete', {}, true)
// 查询订单
export const orders = data => request(`/api/wx/user/order?pageSize=${data.pageSize}&pageIndex=${data.pageIndex}&orderStatus=${data.orderStatus}`, 'get', {}, true)
// 查询用户信息
export const center = data => request(`/api/wx/user/user_data?isIndex=${data.isIndex}`, 'get', {}, true)
// 申请开票
export const kaiPiao = data => request(`/api/wx/user/add/order_invoice`, 'post', data, true)
// 查询发票
export const fapiao = data => request(`/api/wx/user_invoice/get`, 'get', {}, true)
// 设置默认
export const setDefault = data => request(`/api/wx/user_invoice/setDefault/${data.id}`, 'put', {}, true)
// 添加发票
export const addFapiao = data => request(`/api/wx/user_invoice/add`, 'post', data, true)
// 删除发票
export const delFapiao = data => request(`/api/wx/user_invoice/del/${data.id}`, 'delete', data, true)
// 编辑发票
export const editFapiao = data => request(`/api/wx/user_invoice/put`, 'post', data, true)
// 查询地址
export const address = data => request(`/api/wx/ship_addrs/list`, 'get', {}, true)
// 设为默认地址
export const setDefaultAddress = data => request(`/api/wx/ship_addrs/setDefault/${data.id}`, 'put', {}, true)
// 添加收货地址
export const insert = data => request(`/api/wx/ship_addrs/insert`, 'post', data, true)
// 删除
export const delAddress = data => request(`/api/wx/ship_addrs/delete/${data.id}`, 'delete', data, true)
// 编辑
export const editAddress = data => request(`/api/wx/ship_addrs/edit`, 'put', data, true)
// 查询问题
export const questions = data => request(`/api/wx/user/common_issue?pageSize=${data.pageSize}&pageIndex=${data.pageIndex}&orderStatus=${data.orderStatus}`, 'get', {}, true)
