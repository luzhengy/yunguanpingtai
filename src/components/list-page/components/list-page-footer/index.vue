<template>
   <div class="pagination-box">
      <!-- 自定义分页total文本 -->
      <div class="pagination-total-text">
         当前显示{{ pagination?((pagination.page_num - 1) * pagination.limit == 0 ? 1 : (pagination.page_num - 1) *
            pagination.limit):
         null}}到{{
pagination?pagination.page_num * pagination.limit: null}}条,共{{ pagination?.total }}条数据
      </div>
      <el-pagination v-if="pagination" :pager-count="7" background layout="prev, pager, next"
         :total="pagination.total ? pagination.total : 0" @current-change="handleChangeCurrentPageNum" />
   </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
// 分页筛选数据类型接口
interface PaginationType {
   //当前页码
   page_num: number,
   // 每页显示数据量
   limit: number,
   //数据总量
   total?: null | number,
}
const { pagination } = defineProps({ pagination: Object as PropType<PaginationType> })
const emit = defineEmits(['changePageNum'])
// 分页选择器页码改变功能
function handleChangeCurrentPageNum(newPageNum) {
   // 更改页码
   emit("changePageNum", newPageNum)
}
</script>
<style lang="scss">
.pagination-box {
   margin-top: 20px;

   .el-pagination {
      float: right;
   }

   .pagination-total-text {
      float: left;
   }
}
</style>