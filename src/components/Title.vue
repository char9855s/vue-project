<template>
        <!-- 导航栏 -->
         <div class="header-title">
            <!-- 左侧区域 -->
             <div class="header-left">
                <ul>
                    <li class="header-left-logo">
                        <img src="./icons/logo2.png" alt="">
                    </li>
                    <li>
                        <span style="--delay:0ms">首</span>
                        <span style="--delay:100ms">页</span>
                    </li>
                    <!-- <li>
                        222
                    </li> -->
                 </ul>
             </div>
             <!-- 搜索框 -->
              <div class="header-srect">
                <input type="text" name="select" id="select">
                <button type="button" @click= selectAll>
                    <img src="./icons/search.png">
                </button>
              </div> 
              <!-- 右侧区域 -->
               <div class="header-right">
                    <ul>
                        <!-- <li>一键三连</li> -->
                        <li @click = "outlog">
                            <span style="--delay:0ms">退</span>
                            <span style="--delay:50ms">出</span>
                            <span style="--delay:100ms">登</span>
                            <span style="--delay:150ms">录</span>
                        </li>
                        <!-- 点击后重新渲染一个页面 -->
                        <li @click = "selectMypost">
                            <span style="--delay:0ms">我</span>
                            <span style="--delay:50ms">的</span>
                            <span style="--delay:100ms">发</span>
                            <span style="--delay:150ms">布</span>
                        </li>
                        <li>反馈</li>
                    </ul>
               </div>
         </div>
</template>

<script setup>

    import { select, selectPost,} from '../assets/operation';

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

    async function selectMypost() {
        emit('logging_message','loading')
        emit('logging', true)
        const post = await selectPost()
        if (post == 'None'){
            triggerTip("查询完成")
            emit('logging',false)
            return;
        }
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
