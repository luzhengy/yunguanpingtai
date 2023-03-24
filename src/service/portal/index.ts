import KZJRequest from "../index";

enum Task {
  list = "portal/items", //列表
  categories = "portal/categories", //分类
}

interface GetPortalListParamsType {
  name: string;
  category_id: string;
}
// 获取门户网站分类
export function getPortalCategory() {
  return KZJRequest.get({
    url: Task.categories,
    showLoading: false,
    takeToken: true,
  });
}

//获取门户网站列表
export function getPortalList(params: GetPortalListParamsType) {
  return KZJRequest.get({
    url: Task.list,
    params: params,
    showLoading: false,
    takeToken: true,
  });
}
//获取门户网站详情
export function getPortalInfo(portalId: string) {
  return KZJRequest.get({
    url: Task.list,
    params: portalId,
    showLoading: false,
    takeToken: true,
  });
}
