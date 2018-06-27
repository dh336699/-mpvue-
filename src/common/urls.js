import {request} from '../utils/request.js'
// request 参数说明：(url，方法，数据参数，是否需要token)
// 获取token
export const getToken = data => request('/api/wx/user/wx-token', 'get', data, false)
// 获取轮播图
export const getBanners = data => request('/api/index/getBanners', 'get', {}, true)
// 获取当前用户信息
export const getUserInfo = data => request('/api/core/getUserInfo', 'get', {}, true)
// 注册短信发送
export const regSms = data => request('/api/common/reg-sms', 'get', data, true)
// 身份验证（经营者、领导人
export const verify = data => request('/api/wx/user/verify', 'post', data, true)
// 获取内容分类列表
export const contentLists = data => request('/api/wx/content/typeList', 'get', data, true)
// 获取内容列表
export const list = data => request('/api/wx/content/list', 'get', data, true)
// 查询内容详情
export const contentDetail = data => request('/api/wx/content/selectById', 'get', data, true)
// 获取内容详情中的留言列表
export const selectByContentId = data => request('/api/wx/message/selectByContentId', 'get', data, true)
// 添加留言
export const insert = data => request('/api/wx/message/insert', 'post', data, true)
// 获取工具列表
export const toolList = data => request('/api/wx/tool/list', 'get', data, true)
// 查询用户信息
export const selectUser = data => request('/api/wx/user/selectUser', 'get', data, true)
// 成为经营者
export const business = data => request('/api/wx/audit/business', 'post', data, true)
// 经营者审核列表
export const audit = data => request('/api/wx/audit/list', 'get', data, true)
// 编辑用户信息
export const edit = data => request('/api/wx/user/edit', 'put', data, true)
// 成为领导人
export const leader = data => request('/api/wx/audit/leader', 'post', data, true)
// 审核操作
export const updateStatus = data => request('/api/wx/audit/updateStatus', 'put', data, true)
// 访客模式
export const visitor = data => request('/api/wx/user/visitor', 'put', data, true)
// 编辑用户手机号
export const editMobile = data => request('/api/wx/user/editMobile', 'put', data, true)
// 获取工具详情
export const getTools = data => request('/api/wx/tool/selectById', 'get', data, true)
