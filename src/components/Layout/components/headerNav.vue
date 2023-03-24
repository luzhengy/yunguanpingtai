<template>
  <div class="header-nav" :class="isNavCollapse ? 'header-nav-collapse' : ''">
    <div class="header-nav-left">
      <!-- 折叠侧边栏按钮 -->
      <div @click="() => { emit('changeNavCollapseStatus') }" class="collapse-button">
        <el-icon color="#515A6E" v-if="!isNavCollapse">
          <Fold />
        </el-icon>
        <el-icon color="#515A6E" v-else>
          <Expand />
        </el-icon>
      </div>
    </div>
    <div class="header-nav-right">
      <!-- 用户信息 -->
      <el-dropdown class="user-info-dropdown" size="large" @visible-change="handleDropdownShow">
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon class="el-icon--right" v-if="dropdownVisible"><arrow-up /></el-icon>
          <el-icon class="el-icon--right" v-else><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="() => { router.push('/userInfo') }">
              <i class="iconfont icon-yonghuxinxi"></i>
              <span>账号信息</span>
            </el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu>
            <el-dropdown-item :icon="SwitchButton" @click="handleLoginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup name="HeaderNav">
import { ElMessageBox } from 'element-plus'
import {
  SwitchButton,
} from '@element-plus/icons-vue';
import { Message } from "@/utils/message";
import { useRouter } from 'vue-router';

const router = useRouter()
const emit = defineEmits(['changeNavCollapseStatus'])
// 侧边栏水平折叠展开状态
interface Props {
  isNavCollapse?: boolean
}
let { isNavCollapse = false } = defineProps<Props>()
// 用户名
let username = $ref<string>()
// 下拉框显示隐藏状态
let dropdownVisible = $ref<Boolean>(false)
function handleLoginOut(): void {
  ElMessageBox.confirm('是否确定退出登录', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 清除token
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      // 跳转到登录页面
      router.push("/login")
      Message('退出登录成功', 'success')
    })
    .catch(() => {
      Message('已取消', 'info')
    })

}
function handleDropdownShow(status): void {
  dropdownVisible = status
}
created: {
  username = localStorage.getItem('username')
}
</script>
<style lang="scss">
.header-nav {
  position: fixed;
  top: 0;
  left: 232px;
  width: calc(100vw - 232px);
  height: 60px;
  padding: 0 20px;
  padding-right: 70px;
  background-color: $topNav-background;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  z-index: 999;

  .header-nav-left {
    float: left;
    line-height: 60px;
    .collapse-button {
      cursor: pointer;
    }
  }

  .header-nav-right {
    float: right;

    .user-info-dropdown {
      float: left;
      height: 100%;
      line-height: 60px;
      cursor: pointer;

      .userName {
        color: #606266;
        font-size: 14px;
      }

      i {
        margin-top: 2px;
      }
    }
  }
}

.header-nav-collapse {
  left: 64px;
  width: calc(100vw - 64px);
}</style>
