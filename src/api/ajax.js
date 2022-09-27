// 对axios的二次封装
import axios from 'axios'
// 引入进度条 nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入store
import store from '@/store'
const requests = axios.create({
  // 基础路径
  baseURL: '/api',
  // 超时时间
  timeout: 5000
})
// 请求拦截器
requests.interceptors.request.use((config) => {
  // config：配置对象里面属性包含 headers 请求头
  if (store.state.detail.uuid_token) {
    // 请求头添加字段 userTempId不能乱写是后端提供
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 响应成功的回调函数
  nprogress.done()
  return res.data
}, (err) => {
  console.log(err.message)
  return Promise.reject(new Error('faile'))
})

export default requests
