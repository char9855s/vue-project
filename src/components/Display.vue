<template>
    <div id="post" class="post" >
        <div class="box" @click = bodyInfoDisplay($event.currentTarget)>
            <div class="left-img">
                <!-- 左侧放置图片 -->
                <img src="" alt="">
            </div>
            <div class="right-body">
                <!-- 右侧显示信息 -->
                <div class="body-title">
                    <!-- 上部显示内容 -->
                    测试内容
                </div>

                <div class="body-font">
                    这是很长很长很长很长很长很长很长很长很长的内容
                    这是很长很长很长很长很长很长很长很长很长的内容
                    这是很长很长很长很长很长很长很长很长很长的内容
                </div>
                
                <div class="body-info" >
                    <!-- 下部显示信息 -->
                    <span class="author">作者</span>
                    <span class="pageView">点击量&nbsp;&nbsp;</span>
                </div>
            </div>
        </div>
        <!-- 点击卡片后弹出详细内容 -->
        <div class="float-box">
            <div class="post-info">
                <div class="post-info-header">
                    <div class="post-info-header-authorimg">
                        <span>作者头像</span>
                    </div>
                    <div class="post-info-header-authorname">
                        <span>作者姓名</span>
                    </div>
                    <div class="float-box-close" @click= bodyInfoDisplayNone($event.currentTarget) >
                        <img src="./icons/closepost.png" alt="关闭">
                    </div>
                </div>
                <div class="post-info-body">
                    <div class="post-info-body-title">
                        <span>文章标题</span>
                    </div>
                    <div class="post-info-body-font">
                        <span>文章内容
                        </span>
                    </div>
                    <div class="post-info-body-img">
                        <span>文章图片</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { bodyInfoDisplay,bodyInfoDisplayNone } from '../assets/operation';

</script>