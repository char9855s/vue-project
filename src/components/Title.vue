<template>
        <!-- 导航栏 -->
         <div class="header-title">
            <!-- 左侧区域 -->
             <div class="header-left">
                <ul>
                    <li>
                        <span style="--delay:0ms">l</span>
                        <span style="--delay:100ms">o</span>
                        <span style="--delay:200ms">g</span>
                        <span style="--delay:300ms">o</span>
                    </li>
                    <li>
                        <span style="--delay:0ms">首</span>
                        <span style="--delay:100ms">页</span>
                    </li>
                    <li>
                        222
                    </li>
                 </ul>
             </div>
             <!-- 搜索框 -->
              <div class="header-srect">
                <input type="text" name="select" id="select">
                <button type="button" @click= selectAll>
                    <img src="">
                </button>
              </div> 
              <!-- 右侧区域 -->
               <div class="header-right">
                    <ul>
                        <li>一键三连</li>
                        <li>退出登录</li>
                        <li @click = "outlog">个人信息</li>
                        <li>反馈</li>
                        
                    </ul>
               </div>
         </div>
</template>

<script setup>

    import { select } from '../assets/operation';

    const emit = defineEmits(['post', 'logging_message','logging','tip','isLoging','error'])
    async function selectAll(){
        emit('logging_message','loading')
        emit('logging', true)
        const post = await select()
        if ( post != null){
            emit('post', post)
            triggerTip("查询完成")
        }else{
            emit('error',"查询错误")
        }
        emit('logging',false)
    }

    function outlog(){
        // 退出登录
        // 移除两个token
        localStorage.setItem('Authorization',null)
        sessionStorage.setItem('AccToken',null)
        // 通知父组件将isLogin更改为false
        emit('isLoging', false)
    }
    function triggerTip(fromTip){
        const tip = {
            id: Date.now(),
            message: `${fromTip}`
        }
        emit('tip', tip)
    }



</script>
