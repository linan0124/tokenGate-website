import fetch from '@/util/fetch'

// 铸币列表
export function convertList (query) {
  return fetch({
    url: '/user/mintageInfo',
    method: 'post',
    params: query
  })
}

// 铸币列表 付款中刷新状态
export function changePayStatus (query) {
  return fetch({
    url: '/user/selectPurchaseOrder',
    method: 'post',
    params: query
  })
}

// 铸币列表 更改付款中状态
export function tryChangePayStatus (query) {
  return fetch({
    url: '/user/updateOrderStatus',
    method: 'post',
    params: query
  })
}

// 铸币列表 代币增发
export function issueToken (query) {
  return fetch({
    url: '/user/issueToken',
    method: 'post',
    params: query
  })
}

// 铸币列表 发币中刷新
export function getIssueTokenStatus (query) {
  return fetch({
    url: '/user/selectIssue',
    method: 'post',
    params: query
  })
}

// 铸币列表  代币转账
export function tokenTransferFrom (query) {
  return fetch({
    url: '/user/tokenTransferFrom',
    method: 'post',
    params: query
  })
}

// 铸币列表  转账中   刷新查询转账状态
export function selectTansfer (query) {
  return fetch({
    url: '/user/selectTansfer',
    method: 'post',
    params: query
  })
}

// 铸币详情
export function convertDetails (query) {
  return fetch({
    url: '/user/mintageQuery',
    method: 'get',
    params: query
  })
}
