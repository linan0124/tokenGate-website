import fetch from '@/util/fetch'
// 赎回列表
export function redeemList (query) {
  return fetch({
    url: '/user/redeemInfo',
    method: 'post',
    params: query
  })
}

// 赎回中   主动修改状态
export function updateRedeemStatus (query) {
  return fetch({
    url: '/user/updateRedeemStatus',
    method: 'post',
    params: query
  })
}

// 赎回中   更新状态
export function selectRansom (query) {
  return fetch({
    url: '/user/selectRansom',
    method: 'post',
    params: query
  })
}

// 更新代币转账状态   ing
export function selectDisbursements (query) {
  return fetch({
    url: '/user/selectDisbursements',
    method: 'post',
    params: query
  })
}

// 执行法币赎回
export function disbursements (query) {
  return fetch({
    url: '/user/disbursements',
    method: 'post',
    params: query
  })
}

// 执行代币销毁
export function brunToken (query) {
  return fetch({
    url: '/user/brunToken',
    method: 'post',
    params: query
  })
}

// 更新代币销毁
export function selectBurn (query) {
  return fetch({
    url: '/user/selectBurn',
    method: 'post',
    params: query
  })
}

// 赎回详情页redeemQuery
export function redeemDetail (query) {
  return fetch({
    url: '/user/redeemQuery',
    method: 'post',
    params: query
  })
}
