<template>
  <el-table class="table" style="width: 100%" :data="tableData" v-loading="tableLoading" :border="isBorderTable"
    :stripe="isStripeTable" :cell-style="cellStyleSet" empty-text="暂无数据">
    <!-- 列渲染 -->
    <el-table-column v-for="item  in tableColumnSet" :key="item.prop" :prop="item.prop"
      :align="item.align ? item.align : 'center'" :label="item.label" :minWidth="item.minWidth" :width="item.width"
      :formatter="customColumnValue">
    </el-table-column>
    <!-- 操作 -->
    <el-table-column align="center" width="155" minWidth="100" fixed="right" label="操作">
      <template #default="scope">
        <el-row :span="24" type="flex" justify="space-around" style="color: #015ff9">
          <el-col :span="5" v-if="scope.row.release == 0"><a class="enabled-a">发布</a></el-col>
          <el-col :span="5" v-if="scope.row.release == 1"><a class="enabled-a">重发</a></el-col>
          <el-col :span="5"><a class="enabled-a">修改</a></el-col>
          <!-- 更多操作 -->
          <el-col :span="5">
            <el-dropdown trigger="hover" placement="bottom" style="text-align: center">
              <span class="enabled-a"> 更多 </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <a class="dropdownA">删除用户</a>
                </el-dropdown-item>
                <el-dropdown-item v-if="scope.row.download">
                  <a class="dropdownA">下载测试报告</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup name="TableComponent">
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
interface Props {
  // 表格数据
  tableData: [object]
  // 表格加载控制
  tableLoading: boolean
  // 是否为带边框表格
  isBorderTable?: boolean
  // 是否为斑马纹表格
  isStripeTable?: boolean
  // 表格列配置
  tableColumnSet: TableColumnSetType[]
}
const { tableData, tableLoading, isBorderTable = false, tableColumnSet, isStripeTable = false } = defineProps<Props>()
// 单元格样式设置
function cellStyleSet({ row, column, rowIndex, columnIndex }): object {
  let columnStyle = {}
  tableColumnSet.forEach(item => {
    if (item.prop == column.rawColumnKey && item.style) {
      return columnStyle = item.style
    }
  })
  return columnStyle
}
// 单元格显示内容自定义
function customColumnValue(row, column, cellValue: any, index: number): any {
  //当前列索引
  let columnIndex: number = tableColumnSet.findIndex(item => item.prop == column.rawColumnKey)
  //当前列内容展示自定义配置
  let customValues: object = tableColumnSet[columnIndex].customValues
  // 当前列内容为空替换文字
  let emptyText: string = tableColumnSet[columnIndex].emptyText
  //设置列信息自定义展示内容
  for (var key in tableData[index]) {
    if (key == column.rawColumnKey) {
      //判断当前列是否配置了自定义展示
      if (customValues) {
        for (var customkey in customValues) {
          if (tableData[index][key] == customkey) {
            return customValues[customkey]
          }
        }
      }
      // 如果当前列数据为空
      else if (!tableData[index][key] && tableData[index][key] !== 0 && tableData[index][key] !== false) {
        console.log(tableData[index][key])
          //判断当前列是否配置了内容为空替换文字
          if(emptyText){
              return emptyText
          }
          return "暂无数据"
      } 
      return tableData[index][key]
    }
  }
}
</script>
<style lang="scss">

</style>