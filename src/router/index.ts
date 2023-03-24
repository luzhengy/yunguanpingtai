import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/components/Layout/index.vue";
import authGuard from "./authGuard";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/portal",
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  // apiHub
  {
    path: "/portal",
    name: "portal",
    component: () => import("@/views/portal/index.vue"),
  },
  {
    path: "/layout",
    redirect: "/workerOrders/createOrder/iam/applyPurview",
    component: Layout,
    children: [
      {
        path: "/demo",
        children: [
          {
            path: "/demo/tableList",
            name: "公共列表组件demo",
            component: () => import("@/views/demo/tableList.vue"),
          },
          {
            path: "/demo/applyResource",
            name: "申请Iam权限demo",
            component: () =>
              import("@/views/demo/apply-resource-purviewDemo.vue"),
          },
        ],
      },
      // 工单
      {
        path: "/workerOrders",
        name: "工单",
        children: [
          {
            path: "/workerOrders/createOrder",
            children: [
              {
                path: "/workerOrders/createOrder/iam",
                children: [
                  {
                    path: "/workerOrders/createOrder/iam/applyPurview",
                    name: "IAM申请权限",
                    component: () =>
                      import(
                        "@/views/worker-orders/iam/apply-iam-purview/index.vue"
                      ),
                  },
                  {
                    path: "/workerOrders/createOrder/iam/inquirePurview",
                    name: "查询已有权限",
                    component: () =>
                      import(
                        "@/views/worker-orders/iam/inquire-purview/index.vue"
                      ),
                  },
                ],
              },
            ],
          },
        ],
      },
      // 用户信息
      {
        path: "/userInfo",
        name: "用户信息",
        component: () => import("@/views/user-info/index.vue"),
      },
    ],
  },
  {
    path: "/:path(.*)",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
//全局路由守卫
router.beforeEach(authGuard);

export default router;
