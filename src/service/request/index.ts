import type { AxiosInstance } from "axios";
import type { KZJRequestInterceptors, KZJRequestConfig } from "./type";
import { getErrMessage } from "./errCode";
import axios from "axios";
import { ElLoading } from "element-plus";
import type { LoadingInstance } from "element-plus/es/components/loading/src/loading.d";
import { Message } from "@/utils/message";

const DEFAULT_LOADING = false;

class ZJRequest {
  instance: AxiosInstance;
  interceptors?: KZJRequestInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;
  takeToken?: boolean;
  takeCookie?: boolean;
  immediately?: boolean;
  constructor(config: KZJRequestConfig) {
    //KZJRequestConfig继承自AxiosRequestConfig并进行了拦截器接口扩展
    this.instance = axios.create(config); //根据传入配置手动创建实例
    this.interceptors = config.interceptors; //添加拦截器
    this.showLoading = config.showLoading ?? DEFAULT_LOADING; //控制loading显示
    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor, //请求成功拦截
      this.interceptors?.requestInterceptorCatch //请求失败拦截
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor, //响应成功拦截
      this.interceptors?.responseInterceptorCatch //响应失败拦截
    );
    //全局请求拦截器
    this.instance.interceptors.request.use(
      (res) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据....",
            background: "rgba(0, 0, 0, 0.5)",
          });
        }
        return res;
      },
      (err) => {
        console.log("全局拦截请求失败");
        return err;
      }
    );
    //全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // 移除Loading
        setTimeout(() => {
          this.loading?.close();
        }, 1000);
        console.log(res);
        return res;
      },
      (err) => {
        console.log(err);
        // console.log("全局拦截响应失败", err);
        //移除Loading
        this.loading?.close();
        // //错误状态码解析信息
        if (err && err.response) {
          // console.log(err.response.data)
          err = getErrMessage(err);
          Message(err.message, "error");
        }
        //err.response
        return err.response;
      }
    );
  }
  request<T = any>(config: KZJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        //判断单独请求是否存在请求成功拦截 是则执行其拦截并返回请求接口的配置信息
        // 返回 config/res 的目的是拦截器中可能会对其改变所以需要拿到最新的结果返回过来
        config = config.interceptors.requestInterceptor(config);
      }
      //判断单独请求是否需要显示loading 与配置不一致时才修改
      // console.log(config.showLoading)
      if (config.showLoading === !this.showLoading) {
        this.showLoading = config.showLoading;
      }

      //这里以及上面的request传入泛型T的目的是返回的结果的类型可以由发送时定义
      //这时默认下面的responseInterceptor(res)中的res是AxiosResponse
      //但是我们想用我们发送定义的接口类型这时候就需要传入泛型来解决
      this.instance.request<any, T>(config).then(
        (res) => {
          if (config.interceptors?.responseInterceptor) {
            //判断单独请求是否存在响应成功拦截 是则执行其拦截并返回响应成功的数据
            res = config.interceptors.responseInterceptor(res);
          }
          //无论响应是否成功失败都需要初始化showliadong的值以便响应下次请求的配置
          this.showLoading = DEFAULT_LOADING;
          resolve(res);
        },
        (err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        }
      );
    });
  }

  get<T = any>(config: KZJRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T = any>(config: KZJRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  delete<T = any>(config: KZJRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: KZJRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}
export default ZJRequest;
