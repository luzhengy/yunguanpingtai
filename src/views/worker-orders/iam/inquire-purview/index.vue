<template>
  <div class="inquire-purview">
    <el-main>
      <el-form width="100%" ref="formRef" :model="formData" :rules="formRules">
        <!-- <el-form-item label="用户名" label-width="30%" prop="username">
                    <el-input placeholder="请输入用户名" style="width: 40%">
                    </el-input>
                </el-form-item> -->
        <el-form-item label="Access_Key_Id" label-width="30%" prop="queryAuthWhere">
          <el-input v-model="formData.queryAuthWhere" placeholder="请输入Access_Key_Id" style="width: 40%">
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="Role" label-width="30%" prop="git_addr">
                    <el-input placeholder="请输入Role" style="width: 40%">
                    </el-input>
                </el-form-item> -->
        <el-form-item label-width="30%" prop="git_addr">
          <el-button type="primary" @click="getUserPurview(formRef)">
            查询已有权限
          </el-button>
        </el-form-item>
      </el-form>
      <!--查询服务权限插件 -->
      <div class="json-show-box">
        <vue-json-pretty v-if="jsonData" size="large" :deep="3" path="res" :data="jsonData"
          :collapsed-on-click-brackets="true">
        </vue-json-pretty>
        <!-- 无数据状态 -->
        <el-empty description="暂无查询后的数据" v-else />
      </div>
    </el-main>
  </div>
</template>

<script lang="ts" setup>
// json数据展示插件
import { getServicePurview } from '@/service/workerFlow/iam/inquire-qurview';

import { FormInstance, FormRules } from 'element-plus';
import VueJsonPretty from 'vue-json-pretty';
let jsonData = $ref()
// 表单校验规则
const formRules = $ref<FormRules>({
  // 用户名校验规则
  username: [
    { message: "请输入用户名", trigger: "blur" },
  ],
  //Access_key_Id校验规则
  queryAuthWhere: [{ required: true, message: "请输入Access_Key_Id", trigger: "blur" }],
})
const formRef = $ref<FormInstance>()
let loadingStatus = $ref<Boolean>(false)
let formData = $ref({
  queryAuthWhere: "AKIAVZG6PPVKLR2D2VUO",
})
// 查询已有权限信息
let getUserPurview = async (formRef: FormInstance) => {
  if (!formRef) return
  await formRef.validate((valid, fields) => {
    if (valid) {
      loadingStatus = true
      // 预验证通过进行查询权限
      getServicePurview(formData).then(res => {
        if (res.status == 200) {
          jsonData = res.data
        }
      })
      loadingStatus = false
    }
    else {
      return
    }
  })


}
created: {
  getUserPurview(formRef)
}

</script>
<style lang="scss">
.inquire-purview {
  background-color: #fff;
  width: 100%;

  .el-form {
    width: 60%;
    min-width: 670px;
    margin: 0 auto;

    .el-input {
      min-width: 110px;
    }
  }

  .json-show-box {
    width: 60%;
    min-width: 670px;
    margin: 0 auto;
    background-color: #F5F6F9;
  }
}
</style>
