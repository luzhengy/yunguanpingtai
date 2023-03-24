<template>
    <div class="login">
        <el-header>
            <img src="../../assets/img/patsnap-log.png" alt="">
        </el-header>
        <el-main>
            <div class="main">
                <div class="main-left">
                    <img src="../../assets/img/login-page-left.png" alt="">
                </div>
                <div class="main-right">
                    <h1>
                        Patsnap Platform
                    </h1>
                    <!-- 表单 -->
                    <el-form ref="loginFormRef" class="loginForm" :model="loginFormData" label-position="top"
                        :rules="loginFormRules">
                        <!-- 用户名输入框-->
                        <el-form-item prop="username">
                            <el-input placeholder="请输入用户名" v-model.trim="loginFormData.username" size="large">
                            </el-input>
                        </el-form-item>
                        <!-- 密码输入框 -->
                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码" v-model.trim="loginFormData.password" show-password
                                size="large">
                            </el-input>
                        </el-form-item>
                        <!-- 登录按钮 -->
                        <el-form-item>
                            <el-button :loading="loadingStatus" size="large" type="primary" id="submitbtn"
                                @click="handleLogin(loginFormRef)" color="#28A745">
                                {{ loadingStatus?"登录中": "登录" }}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="footer">
                © 2007-2023 智慧芽信息科技（苏州）有限公司
            </div>

        </el-main>
    </div>
</template>

<script lang="ts" setup>
import { login } from "@/service/user/index"
import { Message } from "@/utils/message";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from 'element-plus'
//用户名校验规则
function checkUserName(rules, value, cd) {
    const name = /^[a-z]*$/;
    if (name.test(value) || value == "") {
        return cd();
    }
    cd(new Error("用户名仅由小写字母构成"));
}
const loginFormData = $ref({
    username: '',
    password: ""
})
const loginFormRef = $ref<FormInstance>()
// 表单校验规则
const loginFormRules = $ref<FormRules>({
    // 用户名校验规则
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { validator: checkUserName, trigger: "blur" }
    ],
    // 密码校验规则
    password: [{ required: true, message: "请输入密码", trigger: "blur" },],
})
let loadingStatus = $ref<Boolean>(false)
const Router = useRouter()
const handleLogin = async (formRef: FormInstance) => {
    if (!formRef) return
    await formRef.validate((valid, fields) => {
        if (valid) {
            loadingStatus = true
            // 预验证通过进行登录
            login(loginFormData).then(res => {
                if (res.status == '200') {
                    Message('登录成功', 'success')
                    Router.push("/layout")
                    localStorage.setItem("token",res.data.token)
                    localStorage.setItem("username",res.data.username )
                }
                loadingStatus = false
                //  else if(res.status=='400'){
                //      Message(res.data.message,'error')
                //  }
            }).catch(err=>{
                   loadingStatus=false
            })
        }
        else {
            return
        }
    })
}
</script>
<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .el-header {
        height: 46px;
        background-color: #f8f9fa;
        padding: 8px 16px;

        img {
            float: left;
            width: 118px;
            height: 30px;
            margin-left: 25px;
        }
    }

    .el-main {
        padding: 0;
        height: 100%;
        width: 100%;

        .main {
            height: 80%;
            width: 100%;

            .main-left {
                position: absolute;
                top: 20%;
                left: 0;
                width: 50%;
            }

            .main-right {
                position: absolute;
                top: 20%;
                left: 50%;
                width: 50%;

                h1 {
                    color: #212529;
                    font-weight: normal;
                    font-size: 28px;
                    margin-bottom: 16px;
                }

                .loginForm {
                    width: 100%;
                    max-width: 330px;
                    margin: auto;

                    .el-button {
                        width: 100%;
                    }
                }
            }

            @media screen and (max-width: 925px) {
                .main-left {
                    position: absolute;
                    top: 20%;
                    left: 0;
                    width: 100%;
                }

                .main-right {
                    display: none;
                }

            }
        }
    }

    .footer {
        height: 20%;
        text-align: center;

    }
}
</style>
