<template>
    <div class="list-page-head">
        <!-- 操作 -->
        <el-row type="flex" :span="24" justify="space-between">
            <el-col :span="6" style="font-size:20px;text-align: left;color: #252b3a;">
                <el-button color="#626aef" plain large>添加域名</el-button>
            </el-col>
            <!--搜索框-->
            <el-col :span="6">
                <el-input placeholder="请输入内容" class="search" clearable size="large">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>


</script>
<style lang="scss">
.list-page-head {
    margin-bottom: 20px;
}
</style>
