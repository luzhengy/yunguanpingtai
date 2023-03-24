import KZJRequest from "../index";
enum User {
  login = "user/login", //登录
  info = "user/info", //用户信息
}
interface LoginParamsType {
  username: string;
  password: string;
}
// interface  getUserInfoParamsType{
//   username:string
// }
// 登录
export function login(params: LoginParamsType) {
  return KZJRequest.post({
    url: User.login,
    data: params,
    showLoading: false,
    takeToken: true,
  });
}
// 获取用户信息
export function getUserInfo(params: string | number) {
  return KZJRequest.get({
    url: User.info,
    params: { querry: params },
    showLoading: true,
    takeToken: true,
  });
}
