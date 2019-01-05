import fetch from '@/util/fetch'
// 用户持币资产列表
export function userToken (query) {
  return fetch({
    url: '/user/userCoinAssetList',
    method: 'post',
    params: query
  })
}
// 个人资产详情
export function userTokenDetail (query) {
  return fetch({
    url: '/user/userAssetInfo',
    method: 'post',
    params: query
  })
}
// 币种详情
export function TokenDetail (query) {
  return fetch({
    url: '/user/passTokenGetContract',
    method: 'post',
    params: query
  })
}
