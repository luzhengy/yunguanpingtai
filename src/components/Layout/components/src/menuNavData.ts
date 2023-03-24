interface MenuData {
  authName: String;
  path: String;
  iconName?: String;
  children?: any[];
}

// 菜单导航数据
export const MenuNavData: Array<MenuData> = [
  //一级菜单
  {
    authName: "工单",
    path: "/workerOrders",
    iconName: "icon-gongdan",
    //  二级菜单
    children: [
      // {
      //   path: "/myOrder",
      //   authName: "我的工单",
      //   iconName: "icon-wodegongdan",
      // },
      {
        path: "/createOrder",
        authName: "新建工单",
        iconName: "icon-chuangjiangongdan",
        children: [
          {
            path: "/iam",
            authName: "IAM",
            iconName: "",
            children: [
              {
                path: "/applyPurview",
                authName: "申请IAM权限",
                iconName: "",
              },
              {
                path: "/inquirePurview",
                authName: "查询已有权限",
                iconName: "",
              },
            ],
          },
      
        ],
      },
    ],
  },
  
];
