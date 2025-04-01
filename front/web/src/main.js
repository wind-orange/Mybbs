import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// icon和全局样式
import "@/assets/icon/iconfont.css";
import "./assets/base.scss";

// 状态管理
import store from "./store";

// 全局方法
import VueCookies from "vue-cookies";
import Verify from "./utils/Verify";
import Message from "./utils/Message";
import Request from "./utils/Request";

// 全局组件
import Dialog from "./components/Dialog.vue";
import Avatar from "./components/Avatar.vue";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(store);

app.config.globalProperties.globalInfo = {
  bodyWidth: 1300, // 顶部导航栏全局宽度
  avatarUrl: "/file/getAvatar/", // 获取头像文件
};

// 调用全局方法
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.Verify = Verify;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Request = Request;

// 调用全局组件
app.component("Dialog", Dialog);
app.component("Avatar", Avatar);

app.mount("#app");
