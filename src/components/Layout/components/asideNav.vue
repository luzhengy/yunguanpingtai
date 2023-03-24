<template>
  <div :class="isNavCollapse ? 'aside-nav-collapse' : ''" class="aside-nav">
    <!--顶部logo -->
    <router-link to="/" class="logo-box">
      <i class="iconfont icon-yun">
      </i>
      <span>
        POP平台
      </span>
    </router-link>
    <el-menu :collapse="isNavCollapse" :router="true" active-text-color="#fff" background-color="#282C34"
      text-color="#fff" class="navBox" :default-active="currentRoutePath" menu-trigger="click"
      :collapse-transition="false">
      <el-sub-menu v-for="firstLevelItem in menuList" :key="firstLevelItem.path" :index="firstLevelItem.path">
        <!-- 一级导航 -->
        <template #title>
          <!-- 图标 -->
          <i class="iconfont" :class="firstLevelItem.iconName"></i>
          <!-- 文本 -->
          <span>{{ firstLevelItem.authName }}</span>
        </template>
        <!-- 二级导航 -->
        <template v-for="secondLevelItem in firstLevelItem.children" :key="secondLevelItem.authName">
          <template v-if="secondLevelItem.children">
            <!-- 三级导航 -->
            <el-sub-menu :index="firstLevelItem.path + secondLevelItem.path">
              <template #title>
                <!-- 图标 -->
                <i class="iconfont" :class="secondLevelItem.iconName"></i>
                <!-- 文本 -->
                <span>{{ secondLevelItem.authName }}</span>
              </template>
              <el-sub-menu v-for="thirdLevelItem in secondLevelItem.children" :key="thirdLevelItem.authName"
                :index="firstLevelItem.path + secondLevelItem.path + thirdLevelItem.path">
                <template #title>
                  <!-- 图标 -->
                  <i class="iconfont" :class="thirdLevelItem.iconName"></i>
                  <!-- 文本 -->
                  <span>{{ thirdLevelItem.authName }}</span>
                </template>
                <!-- 四级导航 -->
                <el-menu-item v-for="fourthLevelItem in thirdLevelItem.children"
                  :index="firstLevelItem.path + secondLevelItem.path + thirdLevelItem.path + fourthLevelItem.path">
                  {{ fourthLevelItem.authName }}
                </el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="firstLevelItem.path + secondLevelItem.path">
              <!-- 图标 -->
              <i class="iconfont" :class="secondLevelItem.iconName"></i>
              <span> {{ secondLevelItem.authName }} </span>
            </el-menu-item>
          </template>
        </template>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { watch } from "vue"
import { useRoute } from "vue-router";
import { MenuNavData } from "./src/menuNavData";
interface Props {
  isNavCollapse?: boolean
}
const { isNavCollapse = false } = defineProps<Props>()
//导航栏数据
let menuList = $ref<any[]>()
const route = useRoute()
// 当前路由路径
let currentRoutePath = $ref('')
created: {
  menuList = MenuNavData
  if (window.location.hostname === "127.0.0.1") {
    menuList.push({
      authName: "demo",
      path: "/demo",
      iconName: "icon-gongdan",
      children: [
        {
          path: "/tableList",
          authName: "列表公共组件展示",
        },
        {
          path: "/applyResource",
          authName: "申请Iam权限",
        },
      ],
    },)
  }
}
watch(() => route.path, (newValue
) => {
  currentRoutePath = newValue
}, { immediate: true })


</script>
<style scoped lang="scss">
.aside-nav {
  overflow: hidden;
  width: 232px;
  height: 100vh;
  background-color: $asideNav-background ;

  i {
    margin-right: 5px;
  }

  .logo-box {
    color: #fff;
    height: 58px;
    line-height: 58px;
    font-size: 20px;

    i {
      margin-right: 4px;
      font-size: 20px;
    }

  }
}

.aside-nav-collapse {
  overflow: hidden;
  width: 64px;
  height: 100vh;
  background-color: $asideNav-background ;

  i {
    margin-right: 5px;
  }

  .logo-box {
    color: #fff;
    height: 58px;
    line-height: 58px;
    overflow: hidden;

    i {
      margin-right: 0px;
      font-size: 24px;
    }

    span {
      display: none;
    }
  }
}

.el-submenu__title {
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;
  // i {
  //   font-size: 24px;
  //   color: #131314;
  //   margin-right: 28px;
  // }

  // span {
  //   color: #050509cf;
  // }

  &:nth-child(2) {
    i {
      font-size: 30px;
    }
  }
}

.is-active {
  background-color: $menu-item-active;
  // .el-submenu__title {
  //   i {
  //     color: #1572e8;
  //   }

  //   span {
  //     color: #1572e8;
  //   }
  // }

  // >i {
  //   color: #1572e8 !important;
  // }
}

.el-menu {

  border-right: none;
}

.el-menu-item {
  width: 100%;
  min-width: 79px;
  overflow: hidden;

  &:hover {
    background-color: #1890FF !important;
  }

  // i {
  //   margin-right: 33px;
  //   font-size: 21px;
  //   color: rgb(19, 19, 20);
  // }
}
</style>
