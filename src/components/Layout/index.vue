<template>
  <div class="Layout">
    <!-- 左侧侧边栏 -->
    <AsideNav :isNavCollapse="isNavCollapse"></AsideNav>
    <div :class="isNavCollapse?'content_collapse':''" class="content" >
      <!-- 顶部导航栏 -->
      <HeaderNav @changeNavCollapseStatus="changeNavCollapseStatus" :isNavCollapse="isNavCollapse"></HeaderNav>
      <!-- 面包屑导航栏 -->
      <BreadCrumbNav :isNavCollapse="isNavCollapse"></BreadCrumbNav>
      <div class="router-view-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" name="Layout" setup>
import AsideNav from "./components/asideNav.vue";
import HeaderNav from "./components/headerNav.vue";
import BreadCrumbNav from "./components/breadCrumbNav.vue";
import { useMediaQuery } from '@vueuse/core'
// 侧边栏折叠展开状态
let isNavCollapse = $ref<boolean>(useMediaQuery('(max-width: 1000px )'))
function changeNavCollapseStatus(): void {
  isNavCollapse = !isNavCollapse
}
</script>
<style  lang="scss">
.Layout {
  width: 100%;
  height: 100%;
  .aside-nav {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
  }
  .content {
    margin-left:232px ;
    height: calc(100vh - 110px);
    box-sizing: border-box;
    width: calc(100vw - 232px);
    .router-view-box {
      margin-top: 110px;
      padding: 20px;
      height: calc(100vh - 110px);
      background-color: #F6F8F9;
      box-sizing: border-box;
      overflow-y: visible;
      overflow-x: hidden;
    }
  }
  .content_collapse{
     width: calc(100vw - 64px);
     margin-left: 64px;
  }
}
</style>

