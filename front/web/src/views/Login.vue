<template>
  <div>
    <Dialog
      :show="dialogConfig.show"
      :title="dialogConfig.title"
      :showCancel="false"
      width="400px"
      @close="dialogConfig.show = false"
    >
      <el-form
        class="login-register"
        :model="formData"
        :rules="rules"
        ref="formDataRef"
      >
        <!-- 登录 -->
        <!-- email -->
        <el-form-item prop="email">
          <el-input
            size="large"
            clearable
            placeholder="请输入邮箱"
            v-model="formData.email"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <!-- login password -->
        <el-form-item prop="loginPassword" v-if="opType == 1">
          <el-input
            size="large"
            clearable
            placeholder="请输入密码"
            v-model="formData.password"
            show-password
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 注册、重置密码 -->
        <div v-if="opType == 0 || opType == 2">
          <!-- emailCode -->
          <el-form-item prop="emailCode">
            <div class="send-email-panel">
              <el-input
                size="large"
                clearable
                placeholder="请输入邮箱验证码"
                v-model="formData.emailCode"
              >
                <template #prefix>
                  <span class="iconfont icon-checkcode"></span>
                </template>
              </el-input>
              <el-button class="send-email-btn" type="primary" size="large">
                获取验证码
              </el-button>
            </div>
          </el-form-item>
          <!-- nickName -->
          <el-form-item prop="nickName" v-if="opType == 0">
            <el-input
              size="large"
              clearable
              placeholder="请输入昵称"
              v-model="formData.nickName"
            >
              <template #prefix>
                <span class="iconfont icon-account"></span>
              </template>
            </el-input>
          </el-form-item>
          <!-- register password -->
          <el-form-item prop="registerPassword">
            <el-input
              size="large"
              clearable
              placeholder="请输入密码"
              v-model="formData.registerPassword"
              show-password
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
          <!-- register rePassword -->
          <el-form-item prop="reRegiserPassword">
            <el-input
              size="large"
              clearable
              placeholder="请再次输入密码"
              v-model="formData.reRegiserPassword"
              show-password
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
        </div>
        <!-- checkCode -->
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input
              size="large"
              clearable
              placeholder="请输入验证码"
              v-model="formData.checkCode"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img
              :src="checkCodeUrl"
              class="check-code"
              @click="changeCheckCode(0)"
            />
          </div>
        </el-form-item>
        <!-- 记住我 -->
        <el-form-item v-if="opType == 1">
          <div class="rememberMe">
            <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
          </div>
          <!-- 登录弹窗跳转 -->
          <div class="no-account">
            <a href="javascript:void(0)" class="a-link" @click="showPanel(2)">
              忘记密码
            </a>
            <a href="javascript:void(0)" class="a-link" @click="showPanel(0)">
              没有账号
            </a>
          </div>
        </el-form-item>
        <el-form-item v-if="opType == 0">
          <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">
            已有帐号
          </a>
        </el-form-item>
        <el-form-item v-if="opType == 2">
          <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">
            去登陆
          </a>
        </el-form-item>
        <el-form-item>
          <el-button class="op-btn" type="primary" size="large">
            <span v-if="opType == 0">注册</span>
            <span v-if="opType == 1">登录</span>
            <span v-if="opType == 2">重置密码</span>
          </el-button>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import Dialog from "@/components/Dialog.vue";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
// api
const api = {
  checkCode: "/api/checkCode",
};
// Dialog参数
const dialogConfig = reactive({
  show: false,
  title: "标题",
});
// 对外方法
// 0:注册 1:登录 2:找回密码
const opType = ref();
const showPanel = (type) => {
  opType.value = type;
  resetForm();
};
defineExpose({ showPanel });

// 表单配置
const formData = ref({});
const formDataRef = ref();
const rules = {
  title: [{ required: true, message: "请输入内容" }],
};

// 表单重置
const resetForm = () => {
  dialogConfig.show = true;
  if (opType.value == 0) {
    dialogConfig.title = "注册";
  } else if (opType.value == 1) {
    dialogConfig.title = "登录";
  } else if (opType.value == 2) {
    dialogConfig.title = "重置密码";
  }
  nextTick(() => {
    changeCheckCode(0);
    formData.value = {}; // 手动清空表单数据
    formDataRef.value.resetFields();
  });
};

// 验证码
const checkCodeUrl = ref(api.checkCode);
const changeCheckCode = (type) => {
  checkCodeUrl.value =
    api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
};
</script>

<style lang="scss" scoped>
.login-register {
  .send-email-panel {
    display: flex;
    justify-content: space-between;
    .send-email-btn {
      margin-left: 5px;
    }
  }
  .check-code-panel {
    display: flex;
    .check-code {
      margin-left: 5px;
      cursor: pointer;
    }
  }
  .rememberMe {
    width: 100%;
  }
  .no-account {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .op-btn {
    width: 100%;
  }
}
</style>
