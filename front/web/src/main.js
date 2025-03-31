import "./assets/base.scss";
import VueCookies from "vue-cookies";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/icon/iconfont.css";
// 全局方法
import Verify from "./utils/Verify";

// 全局组件
import Dialog from "./components/Dialog.vue";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;
// 顶部导航栏设置全局宽度
app.config.globalProperties.globalInfo = {
  bodyWidth: 1300,
};

// 调用全局方法
app.config.globalProperties.Verify = Verify;

app.component("Dialog", Dialog);
app.mount("#app");
