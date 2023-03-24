// 定义接口返回数据的类型接口
export interface TDataType<T = any> {
    code: number
    data: T
  }
  
  export interface TRequestDefaultResult {
    code: number
  }
  