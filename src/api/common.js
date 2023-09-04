import service from "@/utils/request";

export function getCode(data){
    return service.request({
        method:'post',
        url:'/getCode/',
        data
    })
}

export function register(data){
    return service.request({
        method:'post',
        url:'/register/',
        data
    })
}

export function login(data){
    return service.request({
        method:'post',
        url:'/login/',
        data
    })
}
