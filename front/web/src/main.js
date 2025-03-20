import "./assets/base.scss";
import VueCookies from "vue-cookies";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/icon/iconfont.css";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;
// 顶部导航栏设置全局宽度
app.config.globalProperties.globalInfo = {
  bodyWidth: 1300,
};

app.mount("#app");
