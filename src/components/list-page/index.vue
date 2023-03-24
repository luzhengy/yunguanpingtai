<template>
  <div class="list-page">
    <el-header>
      <!--操作按钮以及搜索框 -->
      <ListPageHead></ListPageHead>
    </el-header>
    <el-main>
      <!-- 列表组件-->
      <ListPageMain :tableData="tableData ? tableData : [{}]" :tableLoading="tableLoading"
        :isBorderTable="PageData.tableDeploy.isBorderTable" :tableColumnSet="PageData.tableDeploy.tableColumnSet"
        :is-stripe-table="PageData.tableDeploy.isStripeTable">
      </ListPageMain>
      <!-- 分页组件-->
      <ListPageFooter :pagination="paginationData" @changePageNum="changePageNum"></ListPageFooter>
    </el-main>
  </div>
</template>
<script lang="ts" setup>
import ListPageHead from "./components/list-page-header/index.vue";
import ListPageMain from "./components/list-page-main/index.vue";
import ListPageFooter from "./components/list-page-footer/index.vue";
import type { PropType } from "vue"
import { Message } from "@/utils/message";
import { watch } from "vue"
//获取列表参数数据类型类型接口
interface GetListParamsType {
  name?: string,
  page_num: number,
  limit: number,
}
// 分页筛选数据类型接口
interface PaginationType {
  //当前页码
  page_num: number,
  // 每页显示数据量
  limit: number,
  //数据总量
  total?: null | number,
}
type alignType = 'left' | "center" | "right"
//表格列配置数据类型接口
interface TableColumnSetType {
  //列接收数据名称
  prop: string
  //列表头名称
  label: string,
  //文字对齐位置
  align?: string,
  //列宽
  width?: number
  // 列最小宽度
  minWidth?: number
  //列样式
  style?: object
  //自定义当前列显示内容
  customValues?: object
  //数据为空显示内容
  emptyText?: string
}
interface PageDataType {
  // 表格配置数据类型
  tableDeploy: {
    // 是否为带边框表格
    isBorderTable?: boolean,
    // 是否为斑马纹表格
    isStripeTable?: boolean,
    //获取表格数据的方法
    getTableDataAction: (params: GetListParamsType) => Promise<any>,
    //表格列配置
    tableColumnSet: TableColumnSetType[]
  }
  // 分页配置数据类型
  paginationDeploy: PaginationType
}

const { PageData } = defineProps({ PageData: Object as PropType<PageDataType> })
// 表格数据
let tableData = $ref<[object]>()
// 分页显示数据
let paginationData = $ref<PaginationType>({ ...PageData.paginationDeploy })
// 表格刷新控制变量
let tableLoading = $ref<boolean>(false)
created: {
  //开启表格加载
  tableLoading = true
  //获取表格数据
  getTableData()
}
//获取表格数据方法
function getTableData(): void {
  PageData.tableDeploy.getTableDataAction(PageData.paginationDeploy).then(res => {
    if (res.message == "成功") {
      // 关闭表格加载
      tableLoading = false
      // 存储表格数据
      tableData = res.data.list
      // 存储数据总量
      paginationData.total = res.data.total
    }
  }).catch(err => {
    // 关闭表格加载
    tableLoading = false
    Message('获取列表数据失败', 'error')
  })
}
//表格数据重构
// function customTableData(tableData: [object]): [object] {
//   let arr = tableData
//   arr.forEach(item => {
//     for (var key in item) {
//       // 如果数据为空
//       if (!item[key] && item[key] !== 0) {
//         //查询当前列是否配置了数据为空时替换展示文字
//         item[key] = getEmptyText(key)
//       }
//     }
//   })
//   // 获取配置的数据为空替换文字
//   function getEmptyText(objKey: string): string {
//     let emptyText
//     PageData.tableDeploy.tableColumnSet.forEach(item => {
//       if (item.prop == objKey && item.emptyText) {
//         emptyText = item.emptyText
//       }
//     })
//     if (emptyText) {
//       return emptyText
//     }
//     return "暂无数据"
//   }

//   return arr
// }
//页码数据修改
function changePageNum(newPageNum: number): void {
  paginationData.page_num = newPageNum
}
watch(() => paginationData.page_num, (newValue) => {
  PageData.paginationDeploy.page_num = newValue
  //获取最新的表格数据
  getTableData()
})

</script>
<style lang="scss">
.list-page {
  overflow: hidden;
  font-size: 14px;
  padding: 20px;
  background: #fff;
}
</style>
