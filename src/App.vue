<template>
  <!-- 头部 -->
  <header v-if="isLogin">
    <Title  @isLoging = "isLogin = $event" 
            @logging = "logging = $event"
            @logging_message = "logging_message = $event" 
            @tip = "handltip" @error = "handlerrors" 
            @post = "handlpost" 
            />
  </header>
  <!-- 遮罩 -->
  <div class="backgroundMash"></div>
  <!--  -->
  <div id="display" v-if="isLogin">
    <Display/>
    <Display/>
    <Display/>
    <Display/>
  </div>
    <Addpost v-if="isLogin" @status = 'handlstatus' />
    <!-- 底部中间显示页码 -->
  
  <main id="login-reg" v-else>
    <Login @isLoging = "isLogin = $event" @error = "handlerrors" @logging = "logging = $event" @logging_message = "logging_message = $event" @tip = "handltip"/>
  </main>

  <!-- 页面底部信息 -->
  <footer>
    <PostsNumber v-if="isLogin" :indexNum = "postind" :maxNum = "postmax" @status = 'handlstatus' />
  </footer>

  <!-- 渲染加载组件 -->
  <div :class="logging_message" v-if="logging">
        <Logging />
     </div>
    <!-- 动态渲染多个 Error 组件 -->
    <div class="errors">
        <transition-group name="fade" tag="div">
      <ErrorMessage
        v-for="(error, index) in errors"
        :key="error.id"
        :message="error.message"
      />
    </transition-group>
    </div>

    <div class="completion-tips">
      <transition-group name="fade" tag="div">
      <CompletionTips
        v-for="(tip, index) in tips"
        :key="tip.id"
        :message="tip.message"
      />
    </transition-group>
    </div>

</template>

<script setup>
  import Title from './components/Title.vue';
  import Login from './components/Login.vue';
  import { ref } from 'vue';
  import Addpost from './components/Addpost.vue';
  import { TokenValidation } from './assets/operation';
  import ErrorMessage from './components/Error.vue';
  import Logging from './components/Logging.vue';
  import CompletionTips from './components/CompletionTips.vue';
  import PostsNumber from './components/PostsNumber.vue';
  import Display from './components/Display.vue';
  const logging = ref(false)
  const isLogin = ref(false)
  const logging_message = ref('logging')
  const postind = ref(1)
  const postmax = ref(1)
  const errors = ref([])
  const tips = ref([])
  // 验证是否登录过
  TokenValidation().then(isValid =>{
    isLogin.value = isValid
  })

  // 更新错误消息队列
  function handlerrors(error){
    errors.value.push(error)

    setTimeout(()=>{
      errors.value = errors.value.filter((e) => e.id !== error.id);
    }, 3000)
  }
  // 更新提示消息队列
  function handltip(tip){
    tips.value.push(tip)
    setTimeout(()=>{
      tips.value = tips.value.filter((e) => e.id !== tip.id);
    }, 3000)
  }
  
  function handlpost(newpost){
    postind.value = newpost.pageNum
    postmax.value = newpost.totalPages
  }
  /**
   *   "logging":false,
   *    "logging_message":null,
   *    "error":null,
   *    "tip":null
   */
  function handlstatus(status){
    
    logging.value = status.logging
    logging_message.value = status.logging_message
    
    if ( status.tip != null){
      handltip(status.tip)
    }
    if ( status.error != null){
      handlerrors(status.error)
    }
    
  }

  
</script>


<style>
</style>
