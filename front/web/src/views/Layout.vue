<template>
  <div>
    <div class="header">
      <div
        class="header-content"
        :style="{ width: proxy.globalInfo.bodyWidth + 'px' }"
      >
        <!-- logo -->
        <router-link to="/" class="logo a-link">
          <span v-for="item in logoInfo" :style="{ color: item.color }">{{
            item.letter
          }}</span>
        </router-link>
        <!-- 板块信息 -->
        <div class="menu-panel"></div>
        <!-- 登录、注册，用户信息 -->
        <div class="user-info-panel">
          <div class="op-btn">
            <el-button type="primary">
              发帖
              <span class="iconfont icon-add"></span>
            </el-button>
            <el-button type="primary">
              搜索
              <span class="iconfont icon-search"></span>
            </el-button>
            <el-button-group :style="{ 'margin-left': '10px' }">
              <el-button type="primary" plain>登录</el-button>
              <el-button type="primary" plain>注册</el-button>
            </el-button-group>
          </div>
        </div>
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

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
      .op-btn{
        .iconfont{
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
