// 前端需要内容
/*
    posts[
        url // 图片地址
        title // 文章标题
        body // 文章内容
        info{ // 文章详细信息
            author // 作者
            pageView // 浏览量   
    ]
*/

import axios from "axios";

const posts = [
    {
        url : "http",
        title : "测试标题1",
        body : "测试内容",
        info : {
            author : "测试作者",
            pageView : 123
        }
    },
    {
        url : "http",
        title : "测试标题2",
        body : "测试内容",
        info : {
            author : "测试作者",
            pageView : 123
        }
    },
    {
        url : "http",
        title : "测试标题3",
        body : "测试内容",
        info : {
            author : "测试作者",
            pageView : 123
        }
    },
    {
        url : "http",
        title : "测试标题4",
        body : "测试内容",
        info : {
            author : "测试作者",
            pageView : 123
        }
    }
]

export function box(post){
    // 使用js创建，减少html和js的耦合性
    // 创建box盒子
    const box = document.createElement('div')
    // 添加类
    /**
     * Pid
     * Title
     * body
     * imgUrls[]
     * label
     * userName
     */
    box.classList.add('box')

    // 左侧图片部分
    const leftImgDiv = document.createElement('div')
    leftImgDiv.classList.add('left-img');
    const bodyLeftimg = document.createElement('img')
    // TODO 后面修改为显示封面
    bodyLeftimg.src = post.imgUrls.length == 0 ? "none" : post.imgUrls[0];
    bodyLeftimg.alt = "图片加载失败"
    // 添加到容器中
    leftImgDiv.appendChild(bodyLeftimg);

    

    // 右侧信息部分
    const rightBodyDiv = document.createElement('div');
    rightBodyDiv.classList.add('right-body');
    // 标题
    const bodyTitle = document.createElement('span')
    bodyTitle.textContent = post.Title;
    rightBodyDiv.appendChild(bodyTitle);

    // 右侧内容
    const bodyFontDiv = document.createElement('div')
    bodyFontDiv.classList.add('body-font')
    const bodySpan = document.createElement('span')
    bodySpan.textContent = post.body
    bodyFontDiv.appendChild(bodySpan);

    // 文章作者和浏览量
    const bodyInfoDiv = document.createElement('div');
    bodyInfoDiv.classList.add('body-info');
    const authorspan = document.createElement('span');
    authorspan.classList.add('author');
    authorspan.textContent = post.userName == 'None'? '匿名': post.userName;
    const pageViewSpan = document.createElement('span');
    pageViewSpan.classList.add('post-view');
    pageViewSpan.textContent = post.updateTime.slice(0,16).replace('T',' ');
    bodyInfoDiv.appendChild(authorspan);
    bodyInfoDiv.appendChild(pageViewSpan);

    // 组装右侧信息
    rightBodyDiv.appendChild(bodyTitle);
    rightBodyDiv.appendChild(bodyFontDiv);
    rightBodyDiv.appendChild(bodyInfoDiv);

    box.appendChild(leftImgDiv)
    box.appendChild(rightBodyDiv)

    // 添加点击函数
    box.addEventListener('click', function() {
        bodyInfoDisplay(this);
    })

    // 创建详细信息浮动框
    const floatBoxDiv = document.createElement('div');
    floatBoxDiv.classList.add('float-box');

    // 浮动框头部信息
    // 容器
    const postInfoDiv = document.createElement('div');
    postInfoDiv.classList.add('post-info');

    // 头部
    const postInfoHeaderDiv = document.createElement('div');
    postInfoHeaderDiv.classList.add('post-info-header');

    const authorImgDiv = document.createElement('div');
    authorImgDiv.classList.add('post-info-header-authorimg');
    const authorImg = document.createElement('img');
    // TODO 头像图片
    authorImg.src = "##";
    authorImgDiv.appendChild(authorImg);
    const authorNameDiv = document.createElement('div');
    authorNameDiv.classList.add('post-info-header-authorname');
    const authorNameSpan = document.createElement('span');
    authorNameSpan.textContent = post.userName == 'None'? '匿名': post.userName;
    authorNameDiv.appendChild(authorNameSpan);

    // 关闭按钮
    const closeDiv = document.createElement('div');
    closeDiv.classList.add('float-box-close');
    closeDiv.addEventListener('click', function () {
        bodyInfoDisplayNone(this);
    });
    const closeImg = document.createElement('img');
    closeImg.src = "/src/components/icons/closepost.png"
    closeDiv.appendChild(closeImg);

    // 组装头部信息
    postInfoHeaderDiv.appendChild(authorImgDiv);
    postInfoHeaderDiv.appendChild(authorNameDiv);
    postInfoHeaderDiv.appendChild(closeDiv);
    postInfoDiv.appendChild(postInfoHeaderDiv);

    // 详细信息内容
    // 容器
    const postInfoBodyDiv = document.createElement('div');
    postInfoBodyDiv.classList.add('post-info-body');

    const bodyTitleDivFloat = document.createElement('div');
    bodyTitleDivFloat.classList.add('post-info-body-title');
    const titleSpanFloat = document.createElement('span');
    titleSpanFloat.textContent = post.Title;
    bodyTitleDivFloat.appendChild(titleSpanFloat);
    const bodyFontDivFloat = document.createElement('div');
    bodyFontDivFloat.classList.add('post-info-body-font');
    const bodySpanFloat = document.createElement('span');
    bodySpanFloat.textContent = post.body;
    bodyFontDivFloat.appendChild(bodySpanFloat);
    const bodyImgDivFloat = document.createElement('div');
    bodyImgDivFloat.classList.add('post-info-body-img');
    // 遍历添加图片
    if ( post.imgUrls.length != 0){
        post.imgUrls.forEach((imgurl) => {
            const img = document.createElement('img');
            img.src = `${imgurl}`;
            bodyImgDivFloat.appendChild(img);
        })
    }

    // 组装详细内容
    postInfoBodyDiv.appendChild(bodyTitleDivFloat);
    postInfoBodyDiv.appendChild(bodyFontDivFloat);
    postInfoBodyDiv.appendChild(bodyImgDivFloat);

    // 组装postinfo
    postInfoDiv.appendChild(postInfoBodyDiv)

    // 组装完整的 float-box
    floatBoxDiv.appendChild(postInfoDiv);

    // 创建一个大盒子，将两个元素包含起来
    const posts = document.createElement('div')
    posts.classList.add('post')
    posts.id = 'post'
    posts.appendChild(box)
    posts.appendChild(floatBoxDiv)
    return posts
}


export async function select(){
    
    const display = document.getElementById("display")
    // 打开遮罩
    MashOpendisplay()

    display.innerHTML = "" // 清空原先内容
    try{
        const body = await selectPostAll()
        
        if ( body != null){
            let posts = body.posts
            posts.forEach((post) =>{
                display.appendChild(box(post))
            })
            return body
        }else{
            return null
        }
    }catch(error){
        return null
    }finally{
        MashClosedisplay()
    }
    
}

export async function selectPage(page){
    const display = document.getElementById("display")
    // 打开遮罩
    MashOpendisplay()

    display.innerHTML = "" // 清空原先内容
    try{
        const response = await selectPostPage(page)
        if ( response != null){
            // 渲染页面
            response.posts.forEach(post => {  
                display.appendChild(box(post))
            });
            
            return  {
                    "index":response.pageNum,
                    "pages":response.totalPages
                }
        }else{
            return null
        }
    }catch(error){        
        return null
    }
}
    


// 显示详细页面函数

export function bodyInfoDisplay( element ){
    const bodyinfo = element.nextElementSibling;
    
    
    bodyinfo.style.display = "block";

    // 打开遮罩
    MashOpendisplay()
}

// 隐藏详细页面函数

export function bodyInfoDisplayNone( element){
    // 向上寻找最近的float元素
    const bodyinfo = element.closest(".float-box");
    bodyinfo.style.display = "none"
    // 关闭遮罩
    MashClosedisplay();
    // const mask = document.querySelector(".backgroundMash")
    // mask.style.display = "none" 
}

// 遮罩打开显示
export function MashOpendisplay(){
    const mask = document.querySelector(".backgroundMash");
    mask.style.display = "block"
}

// 遮罩关闭显示
export function MashClosedisplay(){
    const mask = document.querySelector(".backgroundMash");
    mask.style.display = "none"
}

// 
export async function TokenValidation(){
    // 从localStorage域获取token，验证token是否有效
    let bearer = localStorage.getItem('Authorization')
    // TODO 后端验证
    // let isLogin = await //token校验;
    try{
        const response = await axios.get(`http://localhost:8080/vision/token`,{
            headers:{
                Authorization : bearer
            },
            timeout:8000
        })
        
        if ( response.status == 200){
            const accToken = response.headers['acctoken'].replace("AccToken ", '');
            sessionStorage.setItem('AccToken', accToken)
            return true
        }else{
            // 状态码错误移除临时令牌
            sessionStorage.setItem('AccToken', null)
            return false
        }
    }catch(error){
        // token校验失败移除保存信息
        sessionStorage.setItem('AccToken', null)
        localStorage.setItem('Authorization', null)
        return false
    }
    
}

// 查询全部帖子信息
export async function selectPostAll(){
    // 一次查询四个帖子
    try{
        const selectposts = await axios.get(`http://127.0.0.1:8080/operation/selectPost?pageSize=4`)
        if( selectposts.status == 200){
            // 返回post
            return selectposts.data
        }else{
            // 错误信息
        }
    }catch(error){
        // 错误信息
    }
}

// 查询指定页码帖子信息
export async function selectPostPage( number){
    // 一次查询四个帖子
    try{
        const posts = await axios.get(`http://127.0.0.1:8080/operation/selectPost?pageNum=${number}&pageSize=4`)
        if( posts.status == 200){
            // 返回post
            return posts.data
        }else{
            return null
            // 错误信息
        }
    }catch(error){        
        return null
        // 错误信息
    }
}




