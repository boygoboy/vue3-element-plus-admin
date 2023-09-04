<!-- eslint-disable prettier/prettier -->
<template>
  <div class="header-wrap">
    <div class="wrap">
      <span class="menu-box" @click="switchCollapse">
        <svg-icon icon-name="menuBtn" class-name="menu-svg"></svg-icon>
      </span>
    </div>
    <div class="wrap">
      <div class="user-info">
        <div class="face-info">
          <img src="../../assets/images/logo-min.png" alt="user-avatar" />
          <span>{{username}}</span>
        </div>
        <span class="logo-out" @click="handleLogOut">
          <svg-icon icon-name="logout" class-name="logoout-svg"></svg-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref,getCurrentInstance } from 'vue';
import { useStore } from "vuex";
import {useRouter} from 'vue-router';
export default {
  name: "Header",
  props: {},
  setup(props) {
    const store = useStore();
    const {proxy}=getCurrentInstance()
    const {replace}=useRouter()
    const switchCollapse = () => {
      store.commit("app/SET_COLLAPSE");
    };
    const username=ref(store.state.app.username)
    const handleLogOut=()=>{
       proxy.$confirm('确认退出管理后台?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
       }).then(()=>{
         store.dispatch('app/logoutAction').then(res=>{
          proxy.$message({
            type:'success',
            message:res.message
          })
          replace({
            name:'Login'
          })
         })
       }).catch(error=>{

       })
    }
    return {
      switchCollapse,username,handleLogOut
    };
  },
};
</script>

<style scoped lang="scss">
.header-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .wrap {
    .menu-box {
      margin-left: 20px;
      cursor: pointer;
      .menu-svg {
        font-size: 24px;
      }
    }
  }
}
.user-info {
  display: flex;
  align-items: center;
  .face-info {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
    }
  }
  .logo-out {
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .logoout-svg {
      font-size: 24px;
    }
  }
}
</style>