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

app.mount("#app");
