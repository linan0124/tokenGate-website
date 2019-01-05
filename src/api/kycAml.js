import fetch from '@/util/fetch'
// 认证列表
export function identificationList (query) {
  return fetch({
    url: '/user/approveList',
    method: 'post',
    params: query
  })
}
// 认证详情
export function identificationDetails (query) {
  return fetch({
    url: '/user/akcInfo',
    method: 'post',
    params: query
  })
}
// 认证详情 翻页
export function setPageTurning (query) {
  return fetch({
    url: '/user/numberPage',
    method: 'post',
    params: query
  })
}
// 审核接口
export function checkDetial (query) {
  return fetch({
    url: '/user/updateStatus',
    method: 'post',
    params: query
  })
}
// 提交认证
export function submitKyc (query) {
  return fetch({
    url: '/user/approveAML',
    method: 'post',
    params: query
  })
}
// 更新接口
export function updatePt (query) {
  return fetch({
    url: '/user/updateKycAml',
    method: 'post',
    params: query
  })
}
// 用户订单信息列表

export function getUserList (query) {
  return fetch({
    url: '/user/mintageInfo',
    method: 'post',
    params: query
  })
}
