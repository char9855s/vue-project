<template>
<!-- 头部 -->
  <header v-if="isLogin">
    <Title @isLoging = "isLogin = $event"/>
  </header>
  <!-- 遮罩 -->
  <div class="backgroundMash"></div>
  <!--  -->
  <div id="display" v-if="isLogin">
    <Display/>
  </div>
    <Addpost v-if="isLogin"/>
  <main id="login-reg" v-else>
    <Login @isLoging = "isLogin = $event"/>
  </main>


</template>

<script setup>
  import Title from './components/Title.vue';
  import Display from './components/Display.vue';
  import Login from './components/Login.vue';
  import { ref } from 'vue';
  import Addpost from './components/Addpost.vue';
  import { TokenValidation } from './assets/operation';
  const isLogin = ref(false)
  // 验证是否登录过
  TokenValidation().then(isValid =>{
    isLogin.value = isValid
  })
  
</script>


<style>
</style>
<link rel="stylesheet" href="assets/style.css">