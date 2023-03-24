<template>
    <div class="public-portal">
        <header>
            <div class="title">
                PatSnap Portal
            </div>
            <div class="describe">
                "p.patsnap.info" the only domain you need to remember.
            </div>
            <a target="_blank" rel="noopener noreferrer" class="add-web-button" @click="handleAddWeb">🙏 请添加你的项目</a>
            <el-row :span="24" class="cat-box">
                <div class="current-cat">
                    <span class="current-cat-name">
                        标签
                    </span>
                    <span class="num">{{ portalList.length }}个站点</span>
                </div>
                <ul class="cat-list">
                 <li v-for="(item, index) in  portalCates " :key="item.id">
                    <li class="cat-list-item"  v-if="item.item_ids"
                        :class="item.checked ? 'checked' : ''" @click="handleSelectProtalCate(item.id)">
                        <span class="cate-name">
                            {{ item.name }}
                        </span>
                        <span class="dot" :style="{ backgroundColor: dotBackgroundColors[index] }"></span>
                    </li>
                 </li>
                    
                </ul>

            </el-row>
        </header>
        <main>
            <el-row :span="24" class="content">
                <!-- 搜索 -->
                <div class="search-box">
                    <input id="searchbar" placeholder="搜索项目名称……" v-model.trim="searchInputValue" @input="searchPortalList">
                </div>
                <el-col :span="24" style="margin-top: 2vh;margin-bottom: 3vh;">
                    <!-- 骨架屏 -->
                    <el-skeleton :loading="loading" animated>
                        <!-- 数据未加载完占位展示 -->
                        <template #template>
                            <div class="card-box" v-for="item in 15" :key="item">
                                <div class="img-box">
                                    <el-skeleton-item variant="image" style="height:150px" />
                                </div>
                                <div class="portal-info">
                                    <div class="portal-name">
                                        <el-skeleton-item variant="h1" style="width:40%; height:24px" />
                                    </div>

                                    <div class="portal-describe">
                                        <el-skeleton-item v-for="item in 4" :key="item" variant="p"
                                            style="width: 100%; height:14px;margin-bottom: 4px;" />
                                    </div>
                                </div>
                                <div class="portal-cat">
                                </div>

                            </div>
                        </template>
                        <!-- 数据已加载完展示 -->
                        <template #default>
                            <div class="main">
                                <div class="card-box shadow" v-for="item in  portalList" :key="item.name">
                                    <a :href="item.url" target="_blank">
                                        <div class="img-box">
                                            <img :src="item.icon_url" alt="">
                                        </div>
                                        <div class="portal-info">
                                            <div class="portal-name">

                                                <a>
                                                    {{ item.name }}
                                                </a>
                                            </div>

                                            <div class="portal-describe">
                                                {{ item.description }}
                                            </div>
                                        </div>
                                        <div class="portal-cat">
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </template>
                    </el-skeleton>
                    <!-- 数据为空时显示 -->
                    <el-empty v-if="portalList.length == 0 && !loading" description="暂无数据" />
                </el-col>
            </el-row>
        </main>
    </div>
</template> 

<script lang="ts" setup>

import { getPortalCategory, getPortalList } from "../../service/portal/index"
import { useRouter } from "vue-router";
import { Message } from "@/utils/message";

let paginationKey = $ref(null)
let loading: boolean = $ref(false)
let searchInputValue: string = $ref(null)
let portalCates = $ref([])
let portalList = $ref([])
let checkedCateId: string = $ref('')
let checkedCateName: string = $ref("")
let currentProtalId: string = $ref(null)
let dotBackgroundColors: string[] = $ref(['#39ca30', '#dfd545', '#a44fb7', '#127f82', '#fe6829'])
const Router = useRouter()

created: {
    handleGetProtalCates()
    handleGetProtalList()
}
// 获取portal分类数据
function handleGetProtalCates(): void {
    //获取portalHub里的分类数据
    getPortalCategory().then((res) => {
        if (res.status === 200) {

            portalCates = res.data.map(item => ({ ...item, checked: false }))

        }
    });
}
// // 获取portal列表数据
function handleGetProtalList(): void {
    loading = true
    //获取portal列表
    getPortalList({
        name: searchInputValue ? searchInputValue : null,
        category_id: checkedCateId ? checkedCateId : null
    }).then((res) => {
        if (res.status = 200) {
            portalList = res.data

        }
        setTimeout(() => {
            loading = false
        }, 800);
        console.log(portalList)

    })
        .catch(err => {
            setTimeout(() => {
                loading = false
            }, 800);
        })
}
//搜索表格数据
function searchPortalList() {
    // //判断当前输入框是否输入了数据
    if (searchInputValue) {
        checkedCateId = null
        //把输入框中输入的数据存储到路由上
        Router.push({
            path: "/portal",
            query: { portal_name: searchInputValue },
        });

    } else {
        Router.push("/portal");
    }

    portalCates.forEach(item => {
        if (item.id == 'all') {
            item.checked = true
        }
        else {
            item.checked = false
        }
    });
    //  重新获取数据
    handleGetProtalList();
}
// //选中portal分类
function handleSelectProtalCate(categoryId) {
    if (checkedCateId == categoryId) {
        portalCates = portalCates.map(item => ({ ...item, checked: false }))
        checkedCateId = null
        Router.push("/portal")
    }
    else {
        checkedCateId = categoryId
        portalCates.forEach(item => {
            if (item.id == categoryId) {
                item.checked = true
                checkedCateName = item.name
            }
            else {
                item.checked = false
            }
        })
        Router.push({
            path: "/portal", query: { portal_cate_name: checkedCateName },
        })
    }


    // 清除输入框里的数据
    searchInputValue = null
    handleGetProtalList()




}
function handleAddWeb() {
    Message('功能正在开发中敬请期待', 'info')

}
</script>
<style  lang="scss">
* {
    box-sizing: border-box;
}

ul {
    list-style: none;
}

.public-portal {
    padding: 0;
    width: 100%;
    min-width: 370px;
    height: 100vh;
    background-color: #fff;
    overflow: auto;
    // padding-bottom: 50px;
    header {
        margin: 0 12%;
        position: relative;
        padding-top: 3rem;
        font-weight: 400;
        text-align: center;
        background-color: #fff;

        .title {
            color: #1C1E21;
            font-size: 34px;
            font-weight: 700;
            line-height: 1;
        }

        .describe {
            color: #1C1E21;
            font-size: 20px;
            line-height: 2rem;
            margin-top: 20px;
            margin-bottom: 20px;
            display: -webkit-box;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    white-space: normal;
                    word-break: break-all;
                    word-wrap: break-word
        }

        .add-web-button {
            background-color: hsl(167 68% 30%);
            border: 1px solid hsl(167 68% 30%);
            border-radius: calc(0.4rem * 1);
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            font-weight: 700;
            line-height: 1.5;
            text-align: center;
            transition-duration: 200ms;
            transition-property: color, background, border-color;
            -webkit-user-select: none;
            user-select: none;
            white-space: nowrap;
            padding: 9px 24px;
        }

        .cat-box {
            width: 100%;
            margin-top: 20px;
            .current-cat {
                width: 100%;
                text-align: left;

                .current-cat-name {
                    font-size: 24px;
                    color: #1C1E21;
                    font-weight: 700;
                    margin-right: 8px;
                }

                .num {
                    font-size: 16px;
                }
            }

            .cat-list {
                margin-top: 20px;
                width: 100%;
                padding-left: 0px;

                .cat-list-item {
                    float: left;
                    padding: 4px 13px;
                    border: 2px solid #a4a6a8;
                    margin-right: 5px;
                    margin-bottom: 5px;
                    border-radius: 4px;
                    cursor: pointer;

                    &:hover {
                        box-shadow: 0 0 2px 1px #a4a6a8;
                    }
                }

                .checked {
                    background-color: rgba(148, 225, 208, .25);
                    border: 2px solid hsl(167deg 68% 17%);
                    opacity: .9;

                    &:hover {
                        box-shadow: 0 0 2px 1px hsl(167deg 68% 26%);
                        opacity: .75;
                    }
                }

                .dot {
                    display: inline-block;
                    background-color: rgb(57, 202, 48);
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    margin-left: 8px;

                }
            }



        }
    }
}

main {
    width: 100%;

    padding-top: 32px;
    background-color: #F7FDFD;

    .content {
        margin: 0 12%;

        .search-box {
            width: 100%;

            input {
                float: right;
                border: 1px solid gray;
                border-radius: 15px;
                height: 30px;
                padding: 10px;
            }
        }

        .main {
            display: grid;
            gap: 24px;
            grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
        }

        .el-skeleton {
            display: grid;
            gap: 24px;
            grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
        }

        .card-box {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-sizing: border-box;
            border: 1px solid #EBEEF5;
            cursor: pointer;
            background-color: #fff;
            border-radius: calc(0.2rem * 2);
            overflow: hidden;
            color: #767676;
            margin-top: 20px;

            .img-box {
                width: 100%;
                height: 150px;
                background-size: cover;
                background-repeat: no-repeat;
                position: relative;
                border-bottom: 2px solid #ebedf0;

                img {
                    width: 100%;
                    height: 100%;
                    max-width: 100%;
                    margin-bottom: -4px;
                }
            }

            .portal-info {
                padding: 16px 16px 0px;
                text-align: left;

                .portal-name {
                    margin-bottom: 12px;

                    a {
                        font-size: 16px;
                        color: #18816A;
                        font-weight: 700;
                        box-sizing: border-box;
                        background: linear-gradient(hsl(167 68% 30%), hsl(167 68% 30%)) 0 100%/0 1px no-repeat;
                        text-decoration: none;
                        transition: background-size .2s ease-out;

                        &:hover {
                            background-size: 100% 1px;
                        }
                    }


                }

                .portal-describe {
                    font-size: 13px;
                    color: #1C1E21;
                    line-height: 1.66;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    white-space: normal;
                    word-break: break-all;
                    word-wrap: break-word
                }

            }

            .portal-cat {
                width: 100%;
                height: 20px;
            }

            &.shadow {
                box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2) !important;
            }

            &:hover {
                border: 1px solid hsl(167deg, 68%, 30%);
            }

            // .portal-info {
            //     overflow: hidden;
            //     display: flex;
            //     width: 100%;
            //     height: 80px;

            //     .portal-img {
            //         img {
            //             width: 80px;
            //             height: 80px;
            //             border-radius: 15px;
            //         }
            //     }

            //     .portal-info-right {
            //         position: relative;
            //         flex: 1 1 auto;

            //         .portal-name {

            //             padding-left: 10px;
            //             font-size: 18px;
            //             font-weight: 600;
            //             text-overflow: ellipsis;
            //             display: -webkit-box;
            //             -webkit-line-clamp: 2;
            //             overflow: hidden;
            //             -webkit-box-orient: vertical;
            //             white-space: normal;
            //             word-break: break-all;
            //             word-wrap: break-word;

            //         }

            //         .portal-info-bottom {
            //             width: 100%;
            //             position: absolute;
            //             bottom: 0;
            //             left: 0;
            //             color: #767676;
            //             ;
            //             padding-left: 10px;

            //             .check-number {
            //                 float: left;

            //                 i {
            //                     margin-right: 2px;
            //                 }
            //             }

            //             .use-area {
            //                 float: right;
            //                 margin-right: 5px;

            //                 img {
            //                     margin-right: 3px;
            //                     width: 18px;
            //                     height: 18px;
            //                 }

            //                 // i {
            //                 //     margin-right: 2px;
            //                 // }
            //             }
            //         }
            //     }
            // }

            // .update-time {
            //     margin-top: 5px;
            //     text-align: right;
            //     color: #767676;
            // }

            // .el-divider--horizontal {
            //     margin: 15px 0;
            // }

            // .portal-describe {
            //     text-align: left;
            //     color: #767676;
            //     margin-top: 16px;
            //     line-height: 17px;
            //     font-size: 12px;
            //     height: 70px;
            //     word-wrap: break-word;
            //     overflow: hidden;
            //     text-overflow: ellipsis;
            //     display: -webkit-box;
            //     -webkit-line-clamp: 4; // 多行在这里修改数字即可，这里显示2行
            //     overflow: hidden;
            //     -webkit-box-orient: vertical;
            //     white-space: normal;
            //     word-break: break-all;
            //     word-wrap: break-word;
            // }


        }

    }

    .el-empty {
        width: 100%;
    }
}




@media screen and (max-width: 1450px) {
    .public-portal {
        main {
            width: 100%;
        }
    }
}
</style>
  