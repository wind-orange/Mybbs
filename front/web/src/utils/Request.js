import axios from "axios";
import Message from "./Message";
import { ElLoading } from "element-plus";
import { useStore } from "vuex";

const store = useStore();

const contentTypeForm = "application/x-www-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json";

const instance = axios.create({
  baseURL: "/api",
  timeout: 10 * 1000,
});
// 请求前过滤器
let loading = null;
instance.interceptors.request.use(
  (config) => {
    if (config.showLoading) {
      loading = ElLoading.service({
        lock: true,
        text: "加载中......",
        background: "rgba(0,0,0,0.7",
      });
    }
    return config;
  },
  (error) => {
    if (error.config.showLoading && loading) {
      loading.close();
    }
    Message.error("请求发送失败");
    return Promise.reject("请求发送失败");
  }
);

// 请求后过滤器
instance.interceptors.response.use(
  (response) => {
    const { showLoading, errorCallback, showError } = response.config;
    if (showLoading && loading) {
      loading.close();
    }
    const responseData = response.data;
    if ((responseData.code = 200)) {
      return responseData;
    } else if ((responseData.code = 901)) {
      store.commit("showLogin", true); // 跳转登录框
      store.commit("updateLoginUserInfo", null); // 清空登录信息
      return Promise.reject({ showError: false, msg: "登陆超时" });
    } else {
      if (errorCallback) {
        errorCallback(responseData);
      }
      return Promise.reject({ showError: showError, msg: responseData.info });
    }
  },
  (error) => {
    if (error.config.showLoading && loading) {
      loading.close();
    }
    return Promise.reject({ showError: true, msg: "网络异常" });
  }
);

const Request = (config) => {
  const {
    url,
    parmas,
    dataType,
    errorCallback,
    showLoading = true,
    showError = true,
  } = config;
  let contentType = contentTypeForm;
  let formData = new FormData();
  for (let key in parmas) {
    formData.append(key, parmas[key] == undefined ? "" : parmas[key]);
  }
  if (dataType != null && dataType === "json") {
    contentType = contentTypeJson;
  }
  let headers = {
    "Content-Type": contentType,
    "X-Request-With": "XMLHttpRequest",
  };
  return instance
    .post(url, formData, {
      headers: headers,
      showLoading: showLoading,
      errorCallback: errorCallback,
      showError: showError,
    })
    .catch((error) => {
      if (error.showError) {
        Message.error(error.msg);
      }
      return null;
    });
};

export default Request;
