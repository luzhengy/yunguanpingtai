import { Message } from "@/utils/message";

export default function authGuard(to, from, next) {
  //  判断用户是否登录
  if (localStorage.getItem("token") && localStorage.getItem("username")) {
    next();
  } else {
    if (to.name === "login" || to.name === "portal") {
      next();
    } else {
      Message("登录信息失效请重新登录", "error");
      next({ name: "login" });
    }
  }
}
