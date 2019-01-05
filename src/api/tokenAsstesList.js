import fetch from '@/util/fetch'
// 通证资产列表
export function tokenList (query) {
  return fetch({
    url: '/user/assetList',
    method: 'post',
    params: query
  })
}
// 通证资产总量接口
export function tolalToken (query) {
  return fetch({
    url: '/user/totalQuery',
    method: 'post',
    params: query
  })
}
// 添加通证
export function addToken (query) {
  return fetch({
    url: '/user/addPass',
    method: 'post',
    params: query
  })
}
// 添加机构
export function addOrg (query) {
  return fetch({
    url: '/user/addBank',
    method: 'post',
    params: query
  })
}
// 机构列表
export function orgList (query) {
  return fetch({
    url: '/user/bankQuery',
    method: 'post',
    params: query
  })
}
// 查询平台信息
export function companyList (query) {
  return fetch({
    url: '/user/companyQuery',
    method: 'post',
    params: query
  })
}
