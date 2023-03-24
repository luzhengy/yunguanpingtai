<template>
    <div class="apply-resource-purview">
        <div v-for="(item, index) in deployResourceArr" :key="index">
            <!-- 配置资源权限 -->
            <el-col :span="24" class="create-key-title">
                <span class="envName" v-if="deployResourceArr[index].envNameSelectedArr.length == 1">
                    {{ deployResourceArr[index].envNameSelectedArr[0] }}
                </span>
                <template v-else-if="deployResourceArr[index].envNameSelectedArr.length > 1">
                    <span class="envName">
                        (
                    </span>
                    <span class="envName" v-for="(envNameItem, envNameIndex) in deployResourceArr[index].envNameSelectedArr"
                        :key="envNameItem">
                        {{ envNameIndex < deployResourceArr[index].envNameSelectedArr.length - 1 ? envNameItem + '+' :
                            envNameItem }} </span>
                            <span class="envName">
                                )
                            </span>
                </template>
                <span v-if="deployResourceArr[index].envNameSelectedArr.length >= 1">环境下</span>
                配置资源权限
                <el-divider></el-divider>
            </el-col>
            <!-- 环境 -->
            <el-row :span='24'>
                <el-form-item label="环境" label-width="150px" prop='cloudAccount'>
                    <el-tooltip content="多选环境后,配置的资源权限将作用到勾选的多个环境中" placement="top" effect="dark">
                        <el-select multiple style="min-width: 260px" v-model="deployResourceArr[index].envValueSelectedArr"
                            placeholder="请选择环境" @change="selectedEnvChange">
                            <el-option v-for='envItem in item.accountEnvs' :disabled="envItem.disabled
                            " :value="envItem.value" :key="envItem.value" :label="envItem.label">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                </el-form-item>
            </el-row>
            <!-- 是否复用环境 -->
            <!-- 选择云服务 -->
            <el-row :span="24">
                <el-form-item label="云服务" label-width="150px" prop='keyEnvUse'>
                    <el-col :span="24">
                        <el-checkbox-group v-model="deployResourceArr[index].cloudServiceSelectedArr">
                            <el-checkbox v-for="serviceItem in  item.cloudServiceArr " :key="serviceItem.value"
                                :label="serviceItem.label" :value="serviceItem.value" border>
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <!--权限配置 -->
            <el-row :span="24" class="resource-purview" v-if="deployResourceArr[index].cloudServiceSelectedArr.length > 0">
                <el-col :span="17"
                    v-for="(serviceArrItem, serviceArrIndex)  in deployResourceArr[index].cloudServiceSelectedArr"
                    class="item">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="color:#409EFF">{{ serviceArrItem }} </span><span> 云服务下配置权限</span>
                            <el-button style="float: right; padding: 3px 0" type="text"
                                @click="removeCard(index, serviceArrIndex)">
                                <el-icon>
                                    <Close />
                                </el-icon>
                            </el-button>
                        </div>
                        <el-row :span="24" type="flex" justify="space-between">
                            <el-col :span="7">
                                <el-form-item label="只读权限" label-width="70px" prop='keyEnvUse'>
                                    <el-input type="textarea" :rows="2" placeholder="请输入表名用以配置只读权限">

                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="读写权限" label-width="70px" prop='keyEnvUse'>
                                    <el-input type="textarea" :rows="2" placeholder="请输入表名用以配置读写权限">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="删除权限" label-width="70px" prop='keyEnvUse'>
                                    <el-input type="textarea" :rows="2" placeholder="请输入表名用以配置删除权限">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
            <!-- 增加环境 -->
            <el-row :span="24" type="flex" justify="center">
                <el-button type="primary" :icon="Plus" @click="addOrRemoveDeployResource">在其他环境下配置资源权限</el-button>
                <el-button type="danger" :icon="Minus" v-if="deployResourceArr.length != 1"
                    @click="addOrRemoveDeployResource(index)">移除当前已配置资源权限</el-button>
                <!-- <el-button type="primary" :icon="Connection" style="margin-left:20px">
                    复制当前配置到新环境下
                </el-button> -->
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Message } from '@/utils/message';
import { Plus, Minus, Connection } from '@element-plus/icons-vue';
//  interface   InterDeployResourceArrItem{
//       envValueSelectedArr:string[],
//       envNameSelectedArr:string[],
//       cloudServiceLabelChecked:any,
//       cloudServiceSelectedArr:[],
//       accountEnvs:object[],
//       cloudServiceArr:object[]
//  }
//配置资源权限
let deployResourceArr = $ref([
    {
        // 选中环境
        envValueSelectedArr: [],
        envNameSelectedArr: [],
        cloudServiceLabelChecked: null,
        // 选中云服务
        cloudServiceSelectedArr: [],
        //账号所用环境
        accountEnvs: [
            {
                value: 'release',
                label: '中国release',
                disabled: false
            },
            {
                value: 'qa',
                label: '开发QA',
                disabled: false
            },
            {
                value: 'moreEnv1',
                label: '更多环境1',
                disabled: false
            },
            {
                value: 'moreEnv2',
                label: '更多环境2',
                disabled: false
            },
            {
                value: 'moreEnv3',
                label: '更多环境3',
                disabled: false
            },
            {
                value: 'moreEnv4',
                label: '更多环境4',
                disabled: false
            }
        ],
        //资源所在云服务
        cloudServiceArr: [
            {
                label: "Dynamodb",
                value: "dynamodb"
            },
            {
                label: "S3",
                value: "s3"
            },
            {
                label: "SQS",
                value: "sqs"
            },
            {
                label: "Lambda",
                value: "lambda"
            },
            {
                label: "CloudWatchLogs",
                value: "cloudWatchLogs"
            },
        ]
    },
])
//勾选的环境选项改变时触发
function selectedEnvChange(changedVal: string[]) {
    // 查询当前勾选的环境在deployResourceArr中的索引
    let index: number = deployResourceArr.findIndex(item => JSON.stringify(item.envValueSelectedArr) === JSON.stringify(changedVal))
    // 动态改变deployResourceArr中对应的envNameSelectedArr里的数据
    deployResourceArr[index].envNameSelectedArr = []
    deployResourceArr[index].accountEnvs.forEach(item => {
        if (deployResourceArr[index].envValueSelectedArr.indexOf(item.value) !== -1) {
            deployResourceArr[index].envNameSelectedArr.push(item.label)
        }
    })
    //禁用对应的环境选择器的环境选项
    deployResourceArr.forEach((item, resourceIndex) => {
        deployResourceArr[resourceIndex].accountEnvs = getDisabledAccountEnvs(resourceIndex, deployResourceArr[resourceIndex].accountEnvs)
    })
}
//动态计算出当前禁用后的环境选择框选项的所有数据
function getDisabledAccountEnvs(currentIndex: number, accountEnvs: any[]): any[] {
    // 其他已配置过的环境value合集
    let otherSelectedEnvValueArr: string[] = []
    deployResourceArr.forEach((item, index) => {
        if (index != currentIndex) {
            otherSelectedEnvValueArr = [...otherSelectedEnvValueArr, ...item.envValueSelectedArr]
        }
    })
    //计算出禁用后的数据
    accountEnvs = accountEnvs.map(envItem => {
        if (otherSelectedEnvValueArr.indexOf(envItem.value) !== -1) {
            return { ...envItem, disabled: true }
        }
        return { ...envItem, disabled: false }
    })
    return accountEnvs
}
function removeCard(index, serviceArrIndex) {
    deployResourceArr[index].cloudServiceSelectedArr.splice(serviceArrIndex, 1)
}
// 在其他环境下配置资源权限或移除当前已配置资源权限
function addOrRemoveDeployResource(index: number | null): void {
    // 移除当前已配置资源权限
    if (Number(index) || index == 0) {
        deployResourceArr.splice(index, 1)
        //禁用对应的环境选择器的环境选项
        deployResourceArr.forEach((item, resourceIndex) => {
            deployResourceArr[resourceIndex].accountEnvs = getDisabledAccountEnvs(resourceIndex, deployResourceArr[resourceIndex].accountEnvs)
        })
    }
    // 其他环境下配置资源权限
    else {
        let newAccOuntEnvs = getDisabledAccountEnvs(index, deployResourceArr[0].accountEnvs)
        // 如果已经勾选了所有的环境
        if (newAccOuntEnvs.every(item => item.disabled === true)) {
            Message('所有环境下均已配置了资源,无法在新的环境下继续配置', 'info')
            return
        }
        deployResourceArr.push({
            envValueSelectedArr: [],
            envNameSelectedArr: [],
            cloudServiceLabelChecked: null,
            cloudServiceSelectedArr: [],
            accountEnvs: newAccOuntEnvs,
            cloudServiceArr: [
                {
                    label: "Dynamodb",
                    value: "dynamodb"
                },
                {
                    label: "S3",
                    value: "s3"
                },
                {
                    label: "SQS",
                    value: "sqs"
                },
                {
                    label: "Lambda",
                    value: "lambda"
                },
                {
                    label: "CloudWatchLogs",
                    value: "cloudWatchLogs"
                },
            ]
        },)
    }

}
</script>
<style lang="scss">
.apply-resource-purview {
    .el-main {
        background-color: #fff;
        overflow: visible;
    }

    .create-key-title {
        text-align: center;
        font-weight: 700;
        color: #303133;
        font-size: 20px;
        margin-top: 20px;

        .envName {
            color: aqua;
        }


    }

    .el-divider {
        margin-top: 5px;
    }

    .clearfix {
        margin-bottom: 20px;
        text-align: center;
    }

    .box-card {
        margin-bottom: 20px;
    }

    .resource-purview {
        padding-left: 58px;

    }

    .resource-purview .item {
        margin-left: 30px;
    }

    .add-resource-purview {
        margin-left: 50px;
        margin-top: 153px;
    }

}
</style>
