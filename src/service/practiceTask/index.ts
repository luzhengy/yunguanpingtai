import KZJRequest from '../index'

enum Task {
  list = 'tasks', //列表
}
interface GetListParamsType {
  name?: string,
  page_num: number,
  limit: number,
}
// 获取任务列表
export function getTasks(params:GetListParamsType ) {
  return KZJRequest.get({
    url: Task.list,
    params: params,
    showLoading: false,
    takeToken: true
  })
}

//删除任务
export function deleteTask(id:string) {
  return KZJRequest.delete({
    url: Task.list,
    params: id,
    showLoading: true,
    takeToken: true
  })
}

