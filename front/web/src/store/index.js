import { createStore } from "vuex";

export default createStore({
  state: {
    loginUserInfo: null, // 登录用户信息
    showLogin: false, // 是否显示登录
  },
  getters: {
    getLoginUserInfo: (state) => {
      return state.loginUserInfo;
    },
  },
  mutations: {
    updateLoginUserInfo(state, value) {
      state.loginUserInfo = value;
    },
    showLogin(state, value) {
      state.showLogin = value;
    },
  },
});
