import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios"; //引入axios
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'normalize.css/normalize.css';
import '@/router/permit.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import SvgIcon from '@/components/svgIcon/index.vue' // svg component
import '@/components/svgIcon/svg' // icon

const app=createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.config.globalProperties.$axios = axios; 
app.use(store).use(router).use(ElementPlus).component('svg-icon', SvgIcon).mount("#app");


