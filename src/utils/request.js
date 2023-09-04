import axios from 'axios';
import router from '@/router/index.js'
import { getToken,getUserName ,removeToken,removeUserName} from '@u/cookies'
import {
    ElMessage
} from 'element-plus';
const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 5000
})

service.interceptors.request.use(function (config) {
    if(getToken()){
        config.headers['Token'] = getToken()
    }
    if(getUserName()){
        config.headers['UserName'] = getUserName()
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

service.interceptors.response.use(function (response) {
    const data = response.data
    if(data.resCode==0){
        return Promise.resolve(data)
    }else{
        ElMessage({
            message: data.message,
            type: 'error',
        })
        return Promise.reject(data)
    }
}, function (error) {
    const errorData = JSON.parse(error.request.response)
    if(error.resCode==1010){
        router.replace({
            name:'Login'
        })
        removeToken()
        removeUserName()
    }
    if (errorData.message) {
        ElMessage({
            message: errorData.message,
            type: 'error',
        })
    }
    return Promise.reject(errorData)
})

export default service