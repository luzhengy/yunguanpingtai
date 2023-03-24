<template>
    <div class="user-info">
        <el-main>
            <el-form-item label="公司:" label-width="30%" size="medium">
                <el-input type="text" :value="userInfo.gonsi" disabled>
                </el-input>
            </el-form-item>
            <el-form-item label="用户名:" label-width="30%" size="medium">
                <el-input type="text" :value="userInfo.username" disabled>
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱:" label-width="30%" size="medium">
                <el-input type="text" :value="userInfo.email" disabled>
                </el-input>
            </el-form-item>
            <el-form-item label="部门:" label-width="30%" size="medium">
                <el-input type="text" :value="userInfo.group" disabled>
                </el-input>
            </el-form-item>
            <el-form-item label="工号:" label-width="30%" size="medium">
                <el-input type="text" :value="userInfo.jobnumber" disabled>
                </el-input>
            </el-form-item>
            <el-form-item label="工作地:" label-width="30%" size="medium">
                <el-input type="text" :value="userInfo.work_place" disabled>
                </el-input>
            </el-form-item>
            <el-form-item label="创建日期:" label-width="30%" size="medium">
                <el-input type="text" :value="userInfo.created_at" disabled>
                </el-input>
            </el-form-item>
            <el-form-item label="最近登录:" label-width="30%" size="medium">
                <el-input type="text" :value="userInfo.updated_at" disabled>
                </el-input>
            </el-form-item>
        </el-main>

    </div>
</template>
<script lang="ts" setup>
import { getUserInfo } from '@/service/user';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter()
let userInfo = $ref({
    gonsi: "智慧芽信息科技(苏州)有限公司",
    username: "",
    email: '',
    group: "运维数据结构算法",
    jobnumber: "",
    work_place: " ",
    created_at: " ",
    updated_at: " "
})
created: {
    let username = localStorage.getItem("username")
    getUserInfo( username ).then(res => {
        if (res.status == 200) {
            for (var key in userInfo) {
                if (key in res.data.dingtalk_info) {
                    userInfo[key] = res.data.dingtalk_info[key]
                }
                if (key in res.data.ldap_info) {
                    if (key === 'created_at' || key === 'updated_at') {

                        userInfo[key] = res.data.ldap_info[key].split(".")[0].split('T')[0] + " " + res.data.ldap_info[key].split(".")[0].split('T')[1]
                    }
                    else {
                        userInfo[key] = res.data.ldap_info[key]
                    }


                }
            }
        }
    })
    // axios({
    //       method:"get",
    //       url:"http://api.pop.patsnap.info/v1/user/info?querry=luzhengyi",            //参数
    //       headers:{
    //           "Authorization":'Bearer' + `token ${localStorage.getItem('token')}`   //请求头携带的token
    //       }
    //   }).then(res=>{
    //     console.log(res)
    //   }).catch(err=>{
    //      console.log(err)
    //   })




}

</script>
<style lang="scss">
.user-info {
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;

    .el-main {
        width: 30%;
        margin: 0 auto;
        margin-top: 5%;

    }
}
</style>