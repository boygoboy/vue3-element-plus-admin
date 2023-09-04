import Cookies from "js-cookie";
const tokenKey = "tokenAdmin";
const userNameKey = "userName";

export function getToken(){
    return Cookies.get(tokenKey);
}

export function setToken(value){
   Cookies.set(tokenKey,value);
}

export function removeToken(){
    Cookies.remove(tokenKey);
}

export function getUserName(){
    return Cookies.get(userNameKey);
}

export function setUserName(value){
    Cookies.set(userNameKey,value);
}

export function removeUserName(){
    Cookies.remove(userNameKey);
}