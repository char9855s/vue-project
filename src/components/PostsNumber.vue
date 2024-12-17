<template>
    <div class="post-navigation">
      <ul class="post-numbers">
          <!-- 动态渲染页码 -->
           <!-- 绑定函数 -->
          <li v-for="i in numbers" :key="i" 
            :class= "i == index ? 'number-index' : 'number-item' "
            @click = "pageSwitch(i)">
            {{ i }}
            <!-- 此处绑定一个查询函数 -->
          </li>
      </ul>
    </div>
  </template>
  
  <script setup>
    import { ref, watch } from 'vue';
    import { MashClosedisplay, selectPage } from '../assets/operation';
    

    const emit = defineEmits(['status'])
    const status = {
        "logging":false,
        "logging_message":null,
        "error":null,
        "tip":null
    }
    const props = defineProps({
        indexNum: {
        type: Number,
        required: true
        },
        maxNum: {
        type: Number,
        required: true
        }
    });

    const numbers = ref([]);
    const index = ref(props.indexNum)
    const maxpage = ref(props.maxNum)
    // Watch props to update numbers whenever indexNum or maxNum changes
    watch([() => index.value, () => maxpage.value], () => {
        generatePageNumbers(index.value, maxpage.value);
    });
    watch([() => props.indexNum, () => props.maxNum], () => {
        generatePageNumbers(props.indexNum, props.maxNum);
    });
  
    // 生成页码列表
    const generatePageNumbers = (indexNum, maxNum) => {
        const pages = [];
        const totalPages = Math.min(maxNum,indexNum+4);
        for (let i = Math.max(1,indexNum-4); i <= totalPages; i++) {
        pages.push(i);
        }
        numbers.value = pages;
    };
    
    // 初始化页码
    generatePageNumbers(props.indexNum, props.maxNum);

    
    async function pageSwitch(page){
        // 显示加载中
        status.logging = true
        status.logging_message = "loading"
        status.error = null
        status.tip = null
        emit('status',status)
        let response = await selectPage(page) 
        if ( response != null){
            // 渲染页码
            // console.log(response);
            // generatePageNumbers(response.index, response.pages)
            index.value = response.index
            maxpage.value = response.pages
            // 显示成功提示
            status.tip = {
                id: Date.now(),
                message: `查询完成`
            }
        }else{
            // 显示错误信息
            status.error = {
                id: Date.now(), // 使用时间戳作为唯一标识
                message: `查询错误`,
            }
        }
        // 关闭加载中
        status.logging = false
        status.logging_message = "loading"     
        MashClosedisplay()
        emit('status', status)
    }

</script>
  
  <style scoped>
  .post-numbers {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  
  .number-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    border: 1px solid #000;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .number-item:hover {
    background-color: #007bff;
    color: white;
  }
  
  .number-enter-active, .number-leave-active {
    transition: opacity 0.5s;
  }
  
  .number-enter, .number-leave-to /* .number-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  .number-index{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    border: 1px solid #05e8f4;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  </style>
  