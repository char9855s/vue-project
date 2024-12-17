<template>
    <!-- 分栏显示，左右两侧 -->
     <!-- 左侧保留 -->
    <div class="login-left-box">
    </div>
    <!--  -->
    <div class="login-right-box">
        <div class="login-box">
            <div class="title">
                <div class="desc">{{ title_message }}</div>
                <div class="img" v-if="title_message == '密码登录'">
                    <img src="./icons/QRCode.png" alt="">
                </div>
            </div>
            <div class="input-container">
                <div class="userm" v-if="title_message == '用户注册'">
                    <input type="text" placeholder="用户名" v-model="userm">
                </div>
                <div class="row">
                    <input type="text" :placeholder= username_message v-model="username">
                </div>
                <div class="password">
                    <input type="password" :placeholder= passowrd_message v-model="passowrd">
                </div>
                <div class="requirepassowrd" v-if="title_message == '用户注册'">
                    <input type="password" placeholder="确认密码" v-model="requirepassowrd" >
                </div>
                <div class="email" v-if="title_message == '用户注册'">
                    <input type="text" placeholder="邮箱" v-model="email">
                </div>
            </div>
            <div class="btn-container" @click= btnFunction>
                <div :class="loginORregClass" ></div>
            </div>
            <div class="bon-bar">
                <!-- 切换注册样式 -->
                 <div class="register" @click = "login_reg_switch">
                    <span></span>
                 </div>
                 <!-- 切换找回密码样式 -->
                 <div class="frogetpassword" @click = "">
                    <span></span>
                 </div>
            </div>
        </div>
    </div>

    
</template>


<script setup>
    import { ref } from 'vue';
    
    import { MashOpendisplay, MashClosedisplay } from '../assets/operation';
    
    import { requestLogin, requestReg } from '../assets/request';
import axios from 'axios';

    const userm = ref('')
    const username = ref('')
    const passowrd = ref('')
    const requirepassowrd = ref('')
    const email = ref('')

    const loadMessage = ref('logging')
    const btnFunction = ref(login)
    const loginORregClass = ref('btn-login')
    const username_message = ref("请输入账号")
    const passowrd_message = ref("请输入密码")
    const title_message = ref("密码登录")

    const emit = defineEmits(['isLoging','error','logging', 'logging_message','tip'])

    function login_reg_switch(){
        // 当前是登录页面，切换为注册页面
        if (title_message.value == "密码登录"){
            // 移除账号密码
            username.value = ''
            passowrd.value = ''
            title_message.value = "用户注册"
            username_message.value = "账号"
            passowrd_message.value = "密码"

            // 切换控件
            loadMessage.value = "regging"
            loginORregClass.value = "btn-reg"
            // 切换绑定函数
            btnFunction.value = reg
        }else {
            // 移除密码，邮箱，确认密码
            passowrd.value = ''
            requirepassowrd.value = ''
            email.value = ''
            title_message.value = '密码登录'
            username_message.value = "请输入账号"
            passowrd_message.value = "请输入密码"

            loadMessage.value = "logging"
            loginORregClass.value = "btn-login"
            btnFunction.value = login

        }   
    }

    async function reg(){
        // 校验字段
        let over = true
        if ( userm.value == ''){
            triggerError("用户名不能为空")
            over = false
        }
        if ( username.value == ''){
            triggerError("账号不能为空")
            over = false
        }
        if ( passowrd.value == ''){
            triggerError("密码不能为空")
            over = false
        }
        if ( passowrd.value != requirepassowrd.value){
            triggerError("密码不一致")
            over = false
        }
        // 如果存在错误
        if (!over){
            return
        }
        // 显示加载
        emit('logging', true)
        // 打开遮罩
        MashOpendisplay()
        // 后端注册请求
        let responsemessage = await requestReg(userm.value, username.value, passowrd.value, email.value)
        emit('logging', false)
        emit('logging_message','regging')
        MashClosedisplay()
        if ( responsemessage == "注册成功"){
            // 弹出提示
            triggerTip("注册成功")
            // 清除输入框
            userm.value = null
            passowrd.value = null
            requirepassowrd.value = null
            email.value = null

            // 切换回登录界面
            login_reg_switch()
        }else{
            triggerError(responsemessage)
        }
    }

    

    async function login(){
        // TODO 账号密码校验
        let over = true
        if ( username.value == ''){
            triggerError("账号不能为空")
            over = false
        }
        if ( passowrd.value == ''){
            triggerError("密码不能为空")
            over = false
        }
        if ( !over ){
            return
        }
        // 打开遮罩显示登陆中，
        MashOpendisplay()
        
        emit('logging', true)
        // 清空密码框
        let loginpassword = passowrd.value
        passowrd.value = ''
        // 后端登录请求
        let requestmesage = await requestLogin(username.value, loginpassword)
        // 关闭遮罩
        MashClosedisplay()
        emit('logging',false)
        emit('logging_message', "logging")
        if ( requestmesage != "登录成功"){
            triggerError(requestmesage)
            return
        }
        triggerTip('登录成功')
        
        // 登录完成，必要字段保存 通知父组件进入index
        emit('isLoging', true)
    }

    // 触发错误时调用的函数
    function triggerError( fromError) {
        // 创建一个唯一的错误对象
        const error = {
            id: Date.now(), // 使用时间戳作为唯一标识
            message: `${fromError}`,
        };

        // 添加到错误列表
        emit('error', error)
    }

    function triggerTip(fromTip){
        const tip = {
            id: Date.now(),
            message: `${fromTip}`
        }
        emit('tip', tip)
    }

</script>

<style>
    .login-left-box{
        height: 100%;
        min-width: 30%;
        max-width: 50%;
        flex-grow: 1;
    }

    .login-right-box{
        display: flex;
        align-items: center;
        justify-self: center;
    }

    .login-box{
        height: auto;
        width: 300px;
        overflow: hidden;
        display: flex;
        align-items: self-start;
        flex-wrap: wrap;
    }
    .title{
        display: flex;
        width: 100%;
        height: auto;
        margin-bottom: 30px;
        font-size: 1.5em;
        font-weight: 500;
        align-items: center;
        justify-content: center;
    }
    .title img{
        height: 1.5em;
    }
    .img{
        flex-grow: 1;
        display: flex;
        justify-content: end;
    }

    .input-container{
        width: 100%;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 30px;
    }
    .input-container *{
        width: 100%;
        font-size: 1em;
        padding-top: 18px;
        padding-bottom: 2px;
    }

    input{
        border-bottom: solid gray 1px;
        transition: 0.3s;
    }

    input:focus{
        border-bottom: solid black 1px;
        /*  添加一个阴影 */
        box-shadow: 0px 2px 2px black;
    }

    .btn-container{
        height: auto;
        width: 300px;
        padding: 10px 0px 13px 0;
        transition: 0.5s;
        background: linear-gradient(0deg, #464b50, #14191e);
    }

    .btn-container:hover{
        box-shadow: inset 0 0 5px 5px white;
        /* background-image: ; */
    }

    .btn-login, .btn-reg{
        width: 300px;
        font-size: 1em;
        font-weight: 500;
        display: flex;
        color: white;
        justify-content: center;
        align-items: center;
    }
    .btn-login::before{
        content: "登录";
    }

    .btn-reg::before{
        content: "注册";
    }


    .errors,    .completion-tips{
        /* 最上层显示 */
        z-index: 999;
        position: absolute;
        top: 5%;
        max-width: 250px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }


    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter-from,   .fade-leave-to {
        opacity: 0;
    }

    .logging, .regging ,.loading{
        z-index: 2;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 50px;
        font-size: 1.2em;
        border: solid 1px #BDBDBD;
        background-color: #F2F2F2;
        box-shadow: 0px 0px 5px 4px #BDBDBD;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .bon-bar{
        margin-top: 18px;
        width: 300px;
        height: 25px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .register,  .frogetpassword{
        border-bottom: gray 1px solid;
        transition: 0.2s;
    }

    .register span::before{
        content: "账号注册";
    }
    .frogetpassword span::before{
        content: "忘记密码";        
    }

    .register:hover,    .frogetpassword:hover{
        border-bottom: black 1px solid;
        /* 向外浮动 */
        transform: translateY(-3px);
    }


</style>