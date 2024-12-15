<template>
    <!-- 此处添加其他内容 -->
     <!-- 点击弹出创建页面 -->
    <!-- 浮动图标添加功能 -->
    <div class="addpostbutton" @click= bodyInfoDisplay($event.currentTarget) >
        <img src="../components/icons/addpost.png" alt="添加" >
    </div>
    <!-- 添加帖子详细页面 -->
    <div class="float-box">
        <div class="post-info">
            <div class="post-info-header">
                <div class="float-box-close" @click= bodyInfoDisplayNone($event.currentTarget) >
                    <img src="../components/icons/closepost.png" alt="关闭">
                </div>
            </div>
            <div class="post-info-body">
                <div class="post-info-body-title">
                    <input type="text" placeholder="请输入标题" name="addpostinfotitle" id="addpostinfotitle" class="addpostinfotitle">
                </div>
                <div class="post-info-body-font">
                    <input type="text" placeholder="请输入内容" name="addpostinfobody" id="addpostinfobody" class="addpostinfobody">
                </div>
                <div class="post-info-body-img">
                    <span>文章图片</span>
                </div>
            </div>
            <!-- 底部按钮 -->
            <div class="post-info-bottom">

            </div>
        </div>
    </div>
</template>

<script setup>
    import { bodyInfoDisplay, bodyInfoDisplayNone } from '../assets/operation';

</script>