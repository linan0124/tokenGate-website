import Cookies from 'js-cookie'
import {logout} from 'api/login'
import Vue from 'vue'

const TokenKey = 'token' // token 关键字
const tip = '|' // 分隔符
const invalidTime = 10 // 失效时间，单位： 天

export function getToken () {
  const newtime = new Date().getTime()
  const cookie = Cookies.get(TokenKey)

  if (cookie) {
    const oldtime = cookie.split('|')[0]
    const token = cookie.split('|')[1]
    if (newtime > oldtime) {
      logout()
      removeToken()
      Vue.router.push('/login')
    } else {
      return token
    }
  } else {
    return false
  }
}

export function setToken (token) {
  const time = new Date().getTime() + invalidTime * 86400000
  return Cookies.set(TokenKey, time + tip + token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
