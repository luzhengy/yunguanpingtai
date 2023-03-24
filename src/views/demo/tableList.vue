<template>
  <div class="user-list">
  地方萨芬士大夫
    <!-- <ListPage    :PageData="PageData">
    </ListPage> -->
  </div>
</template>
<script lang="ts" setup>
import ListPage from "@/components//list-page/index.vue"
import { getTasks, deleteTask } from "@/service/practiceTask"
// style: { color: '#FF6C37', fontWeight: 700, textAlign: 'left', }
// customValues: {
//           0: '无副本数'
//         }, 
// emptyText:'暂无结束时间'
let PageData = $ref({
  //表格配置
  tableDeploy: {
    //获取表格数据的方法
    getTableDataAction: getTasks,
    //表格列配置
    tableColumnSet: [
      { prop: 'name',  },
      { prop: 'region', label: "输出信息",},
      {
        prop: 'number', label: "副本数", 
      },
      { prop: 'finish_time', label: "结束时间", },
      { prop: 'creator', label: "任务负责人",   },
    ],
    isStripeTable: true
  },
  // 分页配置
  paginationDeploy: {
    //当前页码
    page_num: 1,
    // 每页显示数据量
    limit: 5,
  }
})
created: {
  
}



</script>
<style lang="scss">
.user-list {}
</style>

