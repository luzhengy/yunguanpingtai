import KZJRequest from '../../index'

interface GetPurviewParamsType {
    queryAuthWhere:string
  }
// 获取已有权限信息
export function getServicePurview(params:GetPurviewParamsType) {
  return KZJRequest.get({
    url: "/user/query_serve_auth",
    params: params,
    showLoading: true,
    takeToken: true
  })
}
