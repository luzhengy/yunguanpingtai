<template>
    <div class="bread-crumb-nav" :class="isNavCollapse?'bread-crumb-nav-collapse':''">
        <div class="breadcrumb">
            <div class="breadcrumb-item" :class="item.activated ? 'active' : ''"
                v-for="(item,index) in  breadCrumbNavData" :key="item.name">
                <i class="iconfont" :class="item.iconName"> </i>
                <router-link :to="item.path">{{ item.name }}</router-link>
                <el-icon v-if="item.path != '/'" @click="closeBreadCrumbItem(item.name)">
                    <Close />
                </el-icon>
            </div>
        </div>
    </div>
</template> 

<script setup lang="ts" name="breadCrumbNav">
import { useRoute } from "vue-router";
import { MenuNavData } from "./src/menuNavData";
import { watch } from "vue"
const route = useRoute()
const breadCrumbNavData = $ref([])
interface Props {
  isNavCollapse?: boolean
}
const { isNavCollapse } = defineProps<Props>()
// 监听路由变化
watch(() => route.name, (newValue
) => {
    let index = breadCrumbNavData.findIndex(item => item.path == route.path)
    //取消选中效果
    breadCrumbNavData.forEach(item => {
        item.activated = false
    })
    if (index == -1) {
        // 查找对应的图标名称
        let iconName: string = seekIconName(newValue as string, MenuNavData)
        breadCrumbNavData.push({
            name: newValue,
            path: route.path,
            iconName: iconName,
            activated: true
        })
    }
    else {
        breadCrumbNavData[index].activated = true
    }
}, { immediate: true })

//通过路由查找对应图标名称
function seekIconName(routeName: string, arr: any[]): string {
    arr.forEach(item => {
        if (item.authName == routeName) {
            return item.iconName
        }
        else {
            if (item.children) {
                return seekIconName(routeName, item.children)
            }
            else {
                return
            }
        }
    })
    return
}
//关闭路由面包屑功能
function   closeBreadCrumbItem(routeName:string):void{
    let index = breadCrumbNavData.findIndex(item => item.name == routeName)
    breadCrumbNavData.splice(index,1)
}
</script>
<style  lang="scss">
.bread-crumb-nav {
    position: fixed;
    top:60px;
    left: 232px;
    width: 100%;
    height: 50px;
    padding: 0px 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
    z-index: 999;
    .breadcrumb {
        .breadcrumb-item {
            margin-right: 5px;
            padding: 0 20px;
            height: 34px;
            line-height: 34px;
            transition: padding .3s cubic-bezier(.645, .045, .355, 1) !important;
            font-weight: 500;
            display: inline-block;
            font-size: 14px;
            color: #303113;
            box-sizing: border-box;

            i {
                margin-right: 5px;

            }

            .el-icon {
                display: none;
                font-size: 12px !important;
                margin-left: 5px;

                &:hover {
                    background-color: #a8abb2;
                    border-radius: 50%;
                    color: #fff;
                    cursor: pointer;
                }
            }

            &:hover {
                background-color: $breadcrumb-item-hover;
                color: $menu-item-active;
                border-bottom: 2px solid $menu-item-active ;

                a {
                    color: $menu-item-active;
                }

                .el-icon {
                    display: inline-block;
                }
            }

            &.active {
                background-color: $breadcrumb-item-hover;
                color: $menu-item-active;
                border-bottom: 2px solid $menu-item-active ;

                .el-icon {
                    display: inline-block;
                }

                a {
                    color: $menu-item-active;
                }
            }
        }
    }
}
.bread-crumb-nav-collapse{
    left: 64px;
}
</style>