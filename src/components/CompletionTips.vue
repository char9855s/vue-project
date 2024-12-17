<template>
    <div class="message-tip" id = 'message-tip'>
        <div class="tip">
            {{ message }}
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        message:{
            type: String,
            required: true
        }
    })
</script>
    
<style>
    .message-tip {
    display: flex;
    justify-content: center;
    align-self: center;
    height: 30px;
    width: 250px;
    /* position: absolute; */
    /* top: 20px; */
    justify-items: center;
    /* TODO 操作完成提示颜色 */
    background-color: rgba(0, 255, 251, 0.547);
    border: 1px rgb(0, 255, 106) solid;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0;
    transition: 0.5s;
  }
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>