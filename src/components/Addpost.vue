<template>
    <!-- 此处添加其他内容 -->
     <!-- 点击弹出创建页面 -->
    <!-- 浮动图标添加功能 -->
    <div class="addpostbutton" @click= bodyInfoDisplay($event.currentTarget) >
        <img src="../components/icons/addpost.png" alt="添加" >
    </div>
    <!-- 添加帖子详细页面 -->
    <div class="float-box">
        <div class="post-info">
            <div class="post-info-header">
                <div class="post-info-header-label">
                    <!-- 作为帖子分类保留 -->
                </div>
                <div class="float-box-close" @click= bodyInfoDisplayNone($event.currentTarget) >
                    <img src="../components/icons/closepost.png" alt="关闭">
                </div>
            </div>
            <div class="post-info-body">
                <div class="post-info-body-title">
                    <input type="text" placeholder="请输入标题" name="addpostinfotitle" id="addpostinfotitle" class="addpostinfotitle" v-model="title">
                </div>
                <div class="post-info-body-font">
                    <input type="text" placeholder="请输入内容" name="addpostinfobody" id="addpostinfobody" class="addpostinfobody" v-model="body">
                </div>
                <div class="post-info-body-img" id = "postinfobodyAppPicture">
                    <!-- <div class="post-info-body-imgbox">
                        <div class="mashdeleteimg"></div>
                        <img src="" alt="">
                    </div> -->
                    
                    <img v-for="(image, index) in previewArray" :key="index" @click = removeImage(index) :src = image>
                    <!-- <img src="./icons/addpost.png" alt=""> -->
                </div>
                <div class="btn-post-info-body-img"  @click="triggerFileInput" >
                    <img src="./icons/add-picture.png" alt="">
                </div>

                <!-- 隐藏的文件上传控件 -->
                <input type="file" ref="fileInput" accept="image/*" multiple style="display: none" @change="handleImageUpload">
            </div>
            <!-- 底部按钮 -->
            <div class="post-info-bottom">
                <div class="btn-post-info-add-submit" @click = 'submitPost'></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { addPost, bodyInfoDisplay, bodyInfoDisplayNone } from '../assets/operation';


    const defaultImageUrl = './icons/default.png'; // 本地图片
    const imageArray = ref([])
    const previewArray = ref([]); // 用于存储图片的预览 URL
    const fileInput = ref(null)

    const title = ref('')
    const body = ref('')
    const label = ref("None") // 标签保留
    const anymous = ref(false) // 匿名保留

    const emit = defineEmits(['status'])

    const status = {
        "logging":false,
        "logging_message":null,
        "error":null,
        "tip":null
    }

    //输入框点击模拟
    const triggerFileInput = () => {
        fileInput.value.click(); // 模拟点击输入框
    };


    // 处理文件上传
    const handleImageUpload = async (event) => {
        // 清空输入缓存
        
        const files = event.target.files; // 获取用户选择的文件
        // 遍历文件并生成图片 URL
        for (let i = 0; i < files.length; i++) {
            const file = files[i];            
            // 检查文件类型是否为图片
            if (file && file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file);
                
                try{
                    // 将图片转化成base64
                    const imgbase64 = await convertToBase64(file)
                    imageArray.value.push(imgbase64)
                    previewArray.value.push(imageUrl); // 添加到预览数组
                }
                catch {
                    triggerError("文件格式错误")
                }
            }
        }
        fileInput.value.value = null
    };

    // 将图片文件转换为 Base64 的函数
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // 当文件读取成功时触发
        reader.onload = (e) => {
            resolve(e.target.result); // 返回 Base64 数据
        };

        // 当文件读取失败时触发
        reader.onerror = (err) => {
            reject(err); // 返回错误信息
        };

        // 读取文件为 Data URL（Base64 格式）
        reader.readAsDataURL(file);
    });
};
    // 移除图片
    const removeImage = (index) => {
        imageArray.value.splice(index, 1); // 从数组中移除图片
        previewArray.value.splice(index, 1);
    };


    // 数据提交
    async function submitPost() {
        // 字段校验
        let over = false
        
        
        if (title.value == ''){
            triggerError("标题不能为空")
            over = true
        }
        if (body.value == ''){
            triggerError('内容不能为空')
            over = true
        }
        // 如果未添加图片则添加一个默认图片
        if (imageArray.value.length == 0){ 
            triggerError('请添加一张图片')
            over = true
        }

        if(over){
            return
        }
        // const formData = new FormData()

        // formData.append('Token', sessionStorage.getItem('AccToken'))
        // formData.append('Title', title.value)
        // formData.append('Body',body.value)
        // formData.append('Label', label.value)
        // formData.append('Anonymous', anymous.value)

        // imageArray.value.forEach((img)=>{
        //     formData.append('imgs',img)
        // })

        const data = {
            'Token': sessionStorage.getItem('AccToken'),
            'Title': title.value,
            'Body': body.value,
            'Label': label.value,
            'Anonymous':anymous.value,
            'imgs':imageArray.value
        }
        
        
        // 显示加载中
        status.logging = true
        status.logging_message = 'loading'
        emit('status',status)
        status.logging = false
        let response = await addPost(data)
        status.logging = false
        emit('status',status)
        if ( response == '添加完成'){
            triggerTip("添加完成")
            // 清除信息
            title.value = ''
            body.value = ''
            imageArray.value = []
            label.value = 'None'
            anymous.value = false
            previewArray.value = []
        }else{
            triggerError("添加失败")
        }
    }

    // 触发错误时调用的函数
    function triggerError( fromError) {
        // 创建一个唯一的错误对象
        status.error = {
            id: Date.now(), // 使用时间戳作为唯一标识
            message: `${fromError}`,
        };

        // 添加到错误列表
        emit('status',status)
        status.error = null
    }

    function triggerTip(fromTip){
        status.tip = {
            id: Date.now(),
            message: `${fromTip}`
        }
        emit('status',status)
        status.tip = null
    }
</script>

<style>
    .btn-post-info-add-submit, .btn-post-info-update, .btn-post-info-delete{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 100%;
        background-color: rgb(22, 131, 219);
        transition: 0.5s;
        margin: 0 30px 0 30px;
    }
    .btn-post-info-delete{
        /* 红色样式 */
        background-color: rgb(169, 26, 26);
    }
    .btn-post-info-add-submit::before{
        content: "提交";
    }

    .btn-post-info-update::before{
        content: "更新";
    }

    .btn-post-info-delete::before{
        content: "删除";
    }

    .btn-post-info-add-submit:hover, .btn-post-info-delete:hover, .btn-post-info-update:hover{
        transform: scale(105%);
    }
</style>
