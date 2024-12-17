<template>
    <!-- 占满全屏居中显示 -->
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4V8" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M34 6.6795L32 10.1436" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M41.3203 14L37.8562 16" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M44 24H40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M41.3203 34L37.8562 32" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M34 41.3205L32 37.8564" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24 44V40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 41.3205L16 37.8564" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.67969 34L10.1438 32" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 24H8" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.67969 14L10.1438 16" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 6.6795L16 10.1436" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span></span>
</template>

<script setup>

    const props = defineProps(['logging_message'])
    
</script>

<style>
    
    .logging span, .regging span, .loading span{
        color: #333333;
        margin-left: 10px;
        font-weight: 500;
        
    }
    svg{
        animation: logging-svg-spin 2s linear infinite;
    }

    @keyframes logging-svg-spin {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(90deg);
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(270deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.logging span::before{
    content: "登录中";
}
.regging span::before{
    content: "注册中";
}
.loading span::before{
    content: "加载中";
}

</style>