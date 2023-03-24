<template>
    <div class="apply-purview">
        <el-main>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-tabs type="card" v-model="tableSelected">
                    <el-tab-pane label="个人用户" name="first">
                        <el-form-item label="个人Console账号" label-width="150px">
                            <el-col :span="8">
                                <el-input type="text" disabled autocomplete="off" show-word-limit>
                                </el-input>
                            </el-col>
                        </el-form-item>
                        <!-- 配置资源权限 -->
                        <DeployResourcePurview></DeployResourcePurview>
                    </el-tab-pane>
                    <el-tab-pane label="个人代理用户" name="second">
                        <!-- 配置资源权限 -->
                        <DeployResourcePurview></DeployResourcePurview>
                    </el-tab-pane>
                    <el-tab-pane label="服务key" name="third">
                        <!-- 配置资源权限 -->
                        <DeployResourcePurview></DeployResourcePurview>
                    </el-tab-pane>
                    <el-tab-pane label="Ec2机器" name="fourth">
                        <!-- 配置资源权限 -->
                        <DeployResourcePurview></DeployResourcePurview>
                    </el-tab-pane>
                    <el-tab-pane label="K8S服务" name="fifth">
                        <!-- 配置资源权限 -->
                        <DeployResourcePurview></DeployResourcePurview>
                    </el-tab-pane>
                    <el-tab-pane label="Role" name="sixth">
                        <!-- 配置资源权限 -->
                        <DeployResourcePurview></DeployResourcePurview>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-main>
    </div>
</template>

<script lang="ts" setup>
import ListPageHead from "@/components/list-page/components//list-page-header/index.vue";
import DeployResourcePurview from "./components/deploy-resource-purview.vue"
// 当前选中的tab标签
const tableSelected = $ref<string>('first')
let ruleForm = {
    account: null,
    proxyType: 1,
    serviceKeyExistStatus: 0,
    serviceKey: null,
    cloudAccount: null,
    serviceName: null,
    keyEnvUse: null,
    cloudService: null,
    resourceName: null,
    resourcePurview: null,
}

let rules = {
    Name: [
        { trigger: 'blur', required: true },
    ],
    SourceUrl: [
        { trigger: 'blur', required: true },
    ],
    DestUrl: [
        { trigger: 'blur', required: true },
    ],
    QueueUrl: [
        { trigger: 'blur' },
    ],
    CronJob: [
        { trigger: 'blur' },
    ],
    ProfileFrom: [
        { trigger: 'blur', required: true },
    ],
    ProfileTo: [
        { trigger: 'blur', required: true },
    ],
    Others: [
        { trigger: 'blur', required: true },
    ],
}
</script>
<style lang="scss">
.apply-purview {
    .el-main {
        background-color: #fff;
    }
}
</style>
