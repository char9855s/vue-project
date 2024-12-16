
/*
Axios 请求
get请求

axios.get( url )
    .then(resopnse => { // 响应数据
        }
    )
    .cache( error => {  // 错误响应
        }
    )   

POST请求
axios.post( url,
        {
            requestBody // 请求体
        },
        {
            // 额外请求参数 自定义请求头， 超时时长...
        }

    )
    .then( response => {
        }
    )
    .cache ( error =>{
        }
    )

*/
import config from '../config/constants'
import axios from 'axios';

// 登录请求
// async标记异步请求
export async function requestLogin(username, password) {
    try {
        // 直接等待 axios 请求返回
        const response = await axios.post(`http://localhost:8080/api/login`, {
            'user': username,
            'password': password,
        }, {
            headers: { // 自定义请求头
                "Content-Type": "application/json"
            },
            timeout: 8000 // 超时时长
        });
        // 对响应消息处理
        let status = response.status
        if ( status == 200){
            // 登录成功，保存token信息
            const accToken = response.headers['acctoken'].replace("AccToken ", ''); // 注意：HTTP头会自动转为小写
            const bearer = response.headers['authorization'].replace("Bearer ", ''); // 同样，使用小写字母
            // accToken 存储到 sessionStorage
            sessionStorage.setItem('AccToken', accToken);
            // bearer 存放在localStorage中
            localStorage.setItem('Authorization', bearer)
            return "登录成功";
        }else{
            return "用户名不匹配"
        }
    } catch (error) {
        // 如果捕获到错误，返回错误消息
        return "用户名不匹配";
    }
}
