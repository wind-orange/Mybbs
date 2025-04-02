<template>
  <div>
    <div class="header">
      <div
        class="header-content"
        :style="{ width: proxy.globalInfo.bodyWidth + 'px' }"
      >
        <!-- logo -->
        <router-link to="/" class="logo a-link">
          <span v-for="item in logoInfo" :style="{ color: item.color }">
            {{ item.letter }}
          </span>
        </router-link>
        <!-- 板块信息 -->
        <div class="menu-panel"></div>
        <!-- 个人操作 -->
        <div class="user-info-panel">
          <!-- 帖子相关操作 -->
          <div class="op-btn">
            <el-button type="primary">
              发帖
              <span class="iconfont icon-add"></span>
            </el-button>
            <el-button type="primary">
              搜索
              <span class="iconfont icon-search"></span>
            </el-button>
          </div>
          <!-- login scesess to userInfo -->
          <template v-if="userInfo.userId">
            <!-- 消息 -->
            <div class="message-info">
              <el-dropdown>
                <el-badge class="item" :value="12">
                  <div class="iconfont icon-message"></div>
                </el-badge>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>回复我的</el-dropdown-item>
                    <el-dropdown-item>赞了我的文章</el-dropdown-item>
                    <el-dropdown-item>下载了我的附件</el-dropdown-item>
                    <el-dropdown-item>赞了我的评论</el-dropdown-item>
                    <el-dropdown-item>系统消息</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <!-- 个人 -->
            <div class="user-info">
              <el-dropdown>
                <Avatar :userId="userInfo.userId" :width="50"></Avatar>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>我的主页</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
          <!-- login and register -->
          <el-button-group :style="{ 'margin-left': '10px' }" v-else>
            <el-button type="primary" plain @click="login(1)">登录</el-button>
            <el-button type="primary" plain @click="login(0)">注册</el-button>
          </el-button-group>
        </div>
      </div>
      <div>
        <router-view />
      </div>
    </div>
    <!-- 登录注册 -->
    <Login ref="loginRef"></Login>
  </div>
</template>

<script setup>
import Login from "@/views/Login.vue";
import {
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  watch,
  onMounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const store = useStore();

// api
const api = {
  getUserInfo: "/getUserInfo",
};

// logo字段
const logoInfo = ref([
  {
    letter: "M",
    color: "#3285FF",
  },
  {
    letter: "y",
    color: "#FB3624",
  },
  {
    letter: "B",
    color: "#FFBA02",
  },
  {
    letter: "b",
    color: "#25B24E",
  },
  {
    letter: "s",
    color: "#FD3224",
  },
]);

// 登陆注册
const loginRef = ref(null);
const login = (type) => {
  loginRef.value.showPanel(type);
};
onMounted(() => {
  getUserInfo();
});

// 从后台获取用户信息
const getUserInfo = async () => {
  let result = await proxy.Request({
    url: api.getUserInfo,
  });
  if (!result) return;
  if (!result.data) {
    console.log("用户信息数据为空");
    return;
  }
  store.commit("updateLoginUserInfo", result.data);
};
// 监听登录用户的信息
const userInfo = ref({});
watch(
  () => store.state.loginUserInfo,
  (newVal) => {
    if (newVal != undefined && newVal != null) {
      userInfo.value = newVal;
    } else {
      userInfo.value = {};
    }
  },
  { immediate: true, deep: true }
);
// 监听是否登录超时
watch(
  () => store.state.showLogin,
  (newVal) => {
    if (newVal) {
      login(1);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  position: fixed; // 将元素固定在浏览器窗口的某个位置，页面滚动，元素也不会移动
  box-shadow: 0 2px 6px 0 #ddd;
  .header-content {
    margin: 0 auto;
    align-items: center;
    height: 60px;
    display: flex;
    .logo {
      text-decoration: none;
      span {
        font-size: 35px;
      }
    }
    .menu-panel {
      flex: 1;
    }
    .user-info-panel {
      width: 350px;
      display: flex;
      align-items: center;
      .op-btn {
        .iconfont {
          margin-left: 5px;
        }
      }
      .message-info {
        .icon-message {
          font-size: 25px;
          color: rgb(147, 147, 147);
        }
        margin-left: 5px;
        margin-right: 25px;
        cursor: pointer;
      }
    }
  }
}
</style>
