import fetch from '@/util/fetch'

export function login (query) {
  return fetch({
    url: 'user/AdminLogin',
    method: 'post',
    params: query
  })
}

export function logout () {
  return fetch({
    url: '/foundation/user/logout',
    method: 'post'
  })
}
