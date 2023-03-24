import type { AxiosResponse, AxiosRequestConfig } from 'axios'

//定义拦截器接口类型
//这里的responseInterceptor类型用泛型的目的是可能后面我们会采用自己定义的接口类型
export interface KZJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: any
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

//扩展AxiosRequestConfig类型加上自己写的拦截器接口
export interface KZJRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: KZJRequestInterceptors<T>
  showLoading?: boolean
  takeToken?: boolean
  takeCookie?: boolean
  immediately?: boolean
}
