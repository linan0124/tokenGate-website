import axios from 'axios'
// 路由引入
import router from 'vue-router'
import { Message } from 'element-ui'
import { getToken, removeToken } from 'util/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 5000, // 请求超时时间
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sentd
  if (getToken()) {
    // config.params.token = getToken()
    config.headers['token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  if (String(response.data.code) === '499') {
    removeToken()
    router.push('./login')
  } else if (String(response.data.code) === '200') {
    return response
  }
}, error => {
  console.log('err' + error)// for debug
  return Promise.reject(error)
}
)

export default service
