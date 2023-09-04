<template>
  <el-container id="layout-container">
     <el-aside id="layout-aside" :width="collapse?'60px':'250px'">
        <layout-aside />
        </el-aside>
     <el-container>
        <el-header id="layout-header" height="75px">
            <layout-header />
        </el-header>
        <el-main id="layout-main">
            <layout-main />
        </el-main>
     </el-container>
  </el-container>
</template>

<script>
import LayoutAside from './components/Aside.vue'
import LayoutHeader from './components/Header.vue'
import LayoutMain from './components/Main.vue'
import {computed} from 'vue';
import {useStore} from 'vuex'
export default {
name: "Layout",
components: {
LayoutAside,LayoutHeader,LayoutMain
},
setup(props){
    const store=useStore()
    const collapse=computed(()=>store.state.app.collapse)
     return {collapse}
}
}
</script>

<style lang="scss" scoped>
#layout-container{
    height: 100vh;
    display: flex;
}
#layout-aside{
    background-color: #344a5f;
     @include webkit(transition, all .3s ease 0s);
}   
#layout-header{
    background-color: $color_white;
    position: relative;
    z-index: 10;
    @include webkit(box-shadow,0 0 10px 0 rgba(0,0,0,.5))

}
#layout-main{
    background-color: #bc77a1;
    height: calc(100vh - 75px);
}
</style>