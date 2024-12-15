<template>
<!-- 头部 -->
  <header v-if="isLogin">
    <Title/>
  </header>
  <!-- 遮罩 -->
  <div class="backgroundMash"></div>
  <!--  -->
  <div id="display" v-if="isLogin">
    <Display/>
  </div>
    <Addpost v-if="isLogin"/>
  <main id="login-reg" v-else>
    <Login/>
  </main>


</template>

<script setup>
  import Title from './components/Title.vue';
  import Display from './components/Display.vue';
  import Login from './components/Login.vue';
  import { ref } from 'vue';
  import Addpost from './components/Addpost.vue';

  const isLogin = ref(false)
</script>


<style>
</style>
<link rel="stylesheet" href="assets/style.css">