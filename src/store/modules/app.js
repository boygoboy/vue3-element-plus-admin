import { setToken, setUserName,getToken,getUserName,removeToken,removeUserName} from "@/utils/cookies.js";
import { login } from "@a/common.js";
import {logOut} from '@a/account.js'

const state = {
  collapse: JSON.parse(sessionStorage.getItem("collapse")) || false,
  token: "" || getToken(),
  username: "" || getUserName(),
};
const mutations = {
  SET_COLLAPSE(state) {
    state.collapse = !state.collapse;
    sessionStorage.setItem("collapse", JSON.stringify(state.collapse));
  },
  SET_TOKEN(state, value) {
    state.token = value;
    setToken(value);
  },
  SET_USERNAME(state, value) {
    state.username = value;
    setUserName(value);
  },
};
const actions = {
    loginAction(context,requestData){
        return new Promise((resolve,reject)=>{
            login(requestData).then(res=>{
                const data=res.data;
                context.commit("SET_TOKEN",data.token);
                context.commit("SET_USERNAME",data.username);
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    logoutAction(context){
        return new Promise((resolve,reject)=>{
            logOut().then(res=>{
             removeToken()
             removeUserName()
             context.commit("SET_TOKEN",'');
             context.commit("SET_USERNAME",'');
             resolve(res)
            }).catch(error=>{
                reject(error)   
            })
        })
    }
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
