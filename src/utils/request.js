import axios from 'axios'
import { message } from 'antd'
import { removeToken, hasToken, getToken } from './token'
import { history } from 'utils/history'

export const baseURL = 'http://geek.itheima.net/v1_0'
const request = axios.create({
  baseURL,
  timeout: 5000,
})

// 配置拦截器
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (hasToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    // 对token过期进行统一的处理
    if (!error.response) {
      // 如果error信息中没有response，网络超时导致。
      message.error('It is busy, try later!')
      return Promise.reject('It is busy, try later!')
    }
    if (error.response.status === 401) {
      // 代表token过期了
      // 1. 删除token
      removeToken()
      // 2. 给提示消息
      message.warn('Login expired', 1)
      // 3. 跳转登录页
      // 难点：在非组件中，是无法使用Redirect，也无法访问到history对象。
      history.push('/login')
    }
    return Promise.reject(error)
  }
)

export default request
