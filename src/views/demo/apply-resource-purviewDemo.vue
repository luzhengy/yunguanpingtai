<template>
    <div class="apply-purview">
        <el-main>
            <el-header>
                <!-- 步骤条 -->
                <el-steps :active="currentSetNum" align-center>
                    <el-step title="选择基础配置" />
                    <el-step title="配置资源权限" />
                    <el-step title="确认配置信息" />
                </el-steps>
            </el-header>
            <el-main>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="40%">
                    <el-tabs v-if="currentSetNum == 1" tab-position="top" type="card" v-model="tableSelected">
                        <el-tab-pane label="个人用户" name="first">
                            <el-form-item label="个人Console账号">
                                <el-col :span="8">
                                    <el-input type="text" disabled autocomplete="off" show-word-limit>
                                    </el-input>
                                </el-col>
                            </el-form-item>

                        </el-tab-pane>
                        <el-tab-pane label="个人代理用户" name="second">
                            <el-form-item label="代理类别" prop="proxyType">
                                <el-radio-group v-model="ruleForm.proxyType">
                                    <el-radio :label="1">Dynamodb代理</el-radio>
                                    <el-radio :label="2">S3代理</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="服务key" name="third">
                            <el-form-item label="是否拥有服务Key" prop='serviceKeyExistStatus'>
                                <el-radio-group v-model="ruleForm.serviceKeyExistStatus">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- 已拥有服务key -->
                            <template v-if="ruleForm.serviceKeyExistStatus == 1">
                                <el-form-item label="服务key" prop='serviceKey'>
                                    <el-col :span="8">
                                        <el-input v-model="ruleForm.serviceKey" placeholder="请输入已拥有的服务key"></el-input>
                                    </el-col>
                                </el-form-item>
                            </template>
                            <!-- 未拥有服务key -->
                            <template v-else>
                                <el-form-item label="云账号" prop='cloudAccount'>
                                    <el-col :span="5">
                                        <el-select style="min-width: 260px" v-model="ruleForm.cloudAccount"
                                            placeholder="请选择云账号">
                                            <el-option v-for="(item, index) in cloudAccountArr" :key="index"
                                                :value="item.label" :label="item.label">

                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="服务名称" prop='serviceName'>
                                    <el-col :span="8">
                                        <el-input placeholder="请输入服务名称" v-model="ruleForm.serviceName"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="Key所在环境" prop='keyEnvUse'>
                                    <el-col :span="5">
                                        <el-select v-model="ruleForm.keyEnvUse" placeholder="请选择key所在环境">
                                            <el-option v-for="item in usedEnvs" :key="item.value" :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-form-item>

                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="Ec2机器" name="fourth">
                            <el-form-item label="云环境" rules prop='keyEnvUse'>
                                <el-col :span="5">
                                    <el-select v-model="ruleForm.keyEnvUse" placeholder="请选择云环境">
                                        <el-option v-for="item in usedEnvs" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="机器ID">
                                <el-col :span="8">
                                    <el-input placeholder="请输入EC2机器ID" v-model="ruleForm.serviceName"></el-input>
                                </el-col>
                            </el-form-item>

                        </el-tab-pane>
                        <el-tab-pane label="K8S服务" name="fifth">
                            <el-form-item label="云环境" prop='keyEnvUse'>
                                <el-col :span="5">
                                    <el-select v-model="ruleForm.keyEnvUse" placeholder="请选择云环境">
                                        <el-option v-for="item in usedEnvs" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="服务名称">
                                <el-col :span="8">
                                    <el-input placeholder="请输入服务名称" v-model="ruleForm.serviceName"></el-input>
                                </el-col>
                            </el-form-item>

                        </el-tab-pane>
                        <el-tab-pane label="Role" name="sixth">
                            <el-form-item label="云环境" prop='keyEnvUse'>
                                <el-col :span="5">
                                    <el-select v-model="ruleForm.keyEnvUse" placeholder="请选择云环境">
                                        <el-option v-for="item in usedEnvs" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="Role名称">
                                <el-col :span="8">
                                    <el-input placeholder="请输入Role名称" v-model="ruleForm.serviceName"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-tab-pane>
                    </el-tabs>
                    <DeployResourcePurview v-else-if="currentSetNum == 2"></DeployResourcePurview>
                    <template v-else-if="currentSetNum == 3">
                        <el-descriptions title="基础配置" column="1" border>
                            <el-descriptions-item label="选择类型">Ec2机器</el-descriptions-item>
                            <el-descriptions-item label="云环境">美国生产环境(747875099153)</el-descriptions-item>
                            <el-descriptions-item
                                label="机器ID">THV6aGVuZ3lpOjNyRm1UbUpVQU1uQk5YZERIQWdSRUo=</el-descriptions-item>
                        </el-descriptions>
                        <el-descriptions class="deploy-resource-descriptions" title="资源配置" column="1" direction="vertical"
                            border>
                            <el-descriptions-item label="环境"> <el-tag>开发QA</el-tag> <el-tag>中国release</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="云服务">Dynamodb
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-descriptions class="deploy-resource-descriptions" style="margin-bottom:30px"
                            direction="vertical" column="3" border>
                            <el-descriptions-item label="只读权限">
                                <el-tag> 表名1 </el-tag>
                                <el-tag> 表名2</el-tag>
                                <el-tag> 表名3 </el-tag>
                                <el-tag> 表名4 </el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="读写权限">
                                <el-tag> 表名1 </el-tag>
                                <el-tag> 表名2</el-tag>
                                <el-tag> 表名3 </el-tag>
                                <el-tag> 表名4 </el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="删除权限">
                                <el-tag> 表名1 </el-tag>
                                <el-tag> 表名2</el-tag>
                                <el-tag> 表名3 </el-tag>
                                <el-tag> 表名4 </el-tag>
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-descriptions class="deploy-resource-descriptions" column="1" direction="vertical" border>
                            <el-descriptions-item label="环境"> <el-tag>海外环境</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="云服务">Dynamodb
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-descriptions class="deploy-resource-descriptions" direction="vertical" column="3" border>
                            <el-descriptions-item label="只读权限">
                                <el-tag> 表名1 </el-tag>
                                <el-tag> 表名2</el-tag>
                                <el-tag> 表名3 </el-tag>
                                <el-tag> 表名4 </el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="读写权限">
                                <el-tag> 表名1 </el-tag>
                                <el-tag> 表名2</el-tag>
                                <el-tag> 表名3 </el-tag>
                                <el-tag> 表名4 </el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="删除权限">
                                <el-tag> 表名1 </el-tag>
                                <el-tag> 表名2</el-tag>
                                <el-tag> 表名3 </el-tag>
                                <el-tag> 表名4 </el-tag>
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-descriptions class="deploy-resource-descriptions" column="1" direction="vertical" border>
                            <el-descriptions-item label="云服务">S3
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-descriptions class="deploy-resource-descriptions" direction="vertical" column="3" border>

                            <el-descriptions-item label="删除权限">
                                <el-tag> 表名1 </el-tag>
                                <el-tag> 表名2</el-tag>
                                <el-tag> 表名3 </el-tag>
                                <el-tag> 表名4 </el-tag>
                            </el-descriptions-item>
                        </el-descriptions>
                    </template>
                    <template v-else-if="currentSetNum == 4">
                        <el-descriptions title="基础配置" column="1" border>
                            <el-descriptions-item label="选择类型">Ec2机器</el-descriptions-item>
                            <el-descriptions-item label="云环境">美国生产环境(747875099153)</el-descriptions-item>
                            <el-descriptions-item
                                label="机器ID">THV6aGVuZ3lpOjNyRm1UbUpVQU1uQk5YZERIQWdSRUo=</el-descriptions-item>
                        </el-descriptions>
                        <el-descriptions class="deploy-resource-descriptions" title="资源配置" column="3" border>
                            <el-descriptions-item label="环境"> <el-tag>开发QA</el-tag> <el-tag>中国release</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="云服务">
                                <el-descriptions column="1" border>
                                    <el-descriptions-item>
                                        s3
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        s3
                                    </el-descriptions-item>
                                </el-descriptions>
                            </el-descriptions-item>
                        </el-descriptions>
                        <!-- <el-descriptions class="deploy-resource-descriptions" style="margin-bottom:30px"
                            direction="vertical" column="3" border>
                            <el-descriptions-item label="只读权限">
                                <el-tag> 表名1 </el-tag>
                                <el-tag> 表名2</el-tag>
                                <el-tag> 表名3 </el-tag>
                                <el-tag> 表名4 </el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="读写权限">
                                <el-tag> 表名1 </el-tag>
                                <el-tag> 表名2</el-tag>
                                <el-tag> 表名3 </el-tag>
                                <el-tag> 表名4 </el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="删除权限">
                                <el-tag> 表名1 </el-tag>
                                <el-tag> 表名2</el-tag>
                                <el-tag> 表名3 </el-tag>
                                <el-tag> 表名4 </el-tag>
                            </el-descriptions-item>
                        </el-descriptions> -->

                    </template>
                </el-form>
            </el-main>
            <el-footer>
                <el-button type="info" v-if="currentSetNum > 1" @click="() => {
                    currentSetNum -= 1
                }">
                    上一步
                </el-button>
                <el-button v-if="currentSetNum <= 2" type="primary" @click="() => { currentSetNum += 1 }">
                    下一步
                </el-button>
                <el-button v-if="currentSetNum == 3" type="primary">
                    确认提交
                </el-button>
            </el-footer>
        </el-main>
    </div>
</template>

<script lang="ts" setup>
import DeployResourcePurview from "@/views/worker-orders/iam/apply-iam-purview/components/deploy-resource-purview.vue"
// 当前所在进度条
let currentSetNum = $ref(4)
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
//云账号所用环境
let usedEnvs = [
    {
        value: 'us_prod@us-east-1',
        label: '美国生产环境(747875099153)'
    },
    {
        value: 'us_prod@eu-central-1',
        label: '欧洲生产环境(747875099153)'
    },
    {
        value: 'cn_tencentCloud@ap-shanghai',
        label: '中国腾讯云环境(425896663)'
    }
]
// 云账号下拉框选项
let cloudAccountArr = [
    {
        value: '397751057748',
        label: '中国生产环境',
    }, {
        value: '747875099153',
        label: '美国生产环境'
    }, {
        value: '747875099153',
        label: 'EU生产环境'
    }, {
        value: '006694404643',
        label: '美国数据环境'
    }, {
        value: '053632946891',
        label: '中国Release环境'
    }, {
        value: '955466075186',
        label: '中国开发环境'
    }
]
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

        .el-tabs--card>.el-tabs__header {
            display: flex;
            justify-content: center;

        }

        .el-descriptions {
            width: 40%;
            margin: 0 auto 20px;

        }

        .deploy-resource-descriptions {
            text-align: center;
            margin-bottom: 0;

            .el-descriptions__label {
                text-align: center !important;
            }

            td {
                text-align: center;
            }
        }
    }


}
</style>
