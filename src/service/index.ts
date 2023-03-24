import ZJRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
import type { KZJRequestConfig } from './request/type'

const zjRequest = new ZJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: false, //默认接口没有Loading动画效果
  takeToken: false, // 携带token
  takeCookie: false, // 携带cookie
  immediately: false, // 立刻请求 普通请求会缓存2分钟刷新一次
  interceptors: {
    //请求成功的拦截
    requestInterceptor: (config: KZJRequestConfig) => {
      //携带token拦截
      const token = localStorage.getItem('token') ?? ''
      if (token && config.headers && config.takeToken) {
        config.headers.Authorization = `Bearer ${token}` ;  
        console.log('我已经加上了token')
      }
      const cookie = localCache.getCache('cookie') ?? ''
      if (cookie && config.takeCookie) {
        console.log(config.method + '请求加上了Cookie')
        if (config.method === 'post') {
          config.data.cookie = cookie
        } else if (config.method === 'get') {
          config.params.cookie = cookie
        }
      }
      if (config.immediately) {
        console.log('立刻请求不缓存')
        config.params.timestamp = Date.now()
      }
      return config
    },
    //请求失败的拦截
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截' + err)
      return err
    },
    //响应成功的拦截
    responseInterceptor: (res) => {
      // console.log('默认配置的响应成功拦截')
      return res
    },
    // //响应失败的拦截  若这里拦截了则全局不会拦截
    // responseInterceptorCatch: (err) => {
    //   // console.log('响应失败的拦截')
    //   // console.log(err.response)
    //   // if (err && err.response) {
    //   //   err = getErrMessage(err)
    //   //   Message(err.message, 'error')
    //   // }
    //   return err
    // }
  }
})
export default zjRequest
