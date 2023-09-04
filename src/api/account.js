import service from "@/utils/request";
export function logOut(){
       return service.request({
        method:'post',
        url:'/logout/',
       })
}