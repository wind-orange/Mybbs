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
        <!-- password -->
        <el-form-item prop="password">
          <el-input
            size="large"
            clearable
            placeholder="请输入密码"
            v-model="formData.password"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
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
        <el-form-item>
          <div class="rememberMe">
            <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
          </div>
          <div class="no-account">
            <a href="javascript:void(0)" class="a-link">忘记密码</a>
            <a href="javascript:void(0)" class="a-link">没有账号</a>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="op-btn">登录</el-button>
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

// 表单配置
const formData = ref({});
const formDataRef = ref();
const rules = {
  title: [{ required: true, message: "请输入内容" }],
};

// 验证码
const checkCodeUrl = ref(api.checkCode);
const changeCheckCode = (type) => {
  checkCodeUrl.value =
    api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
};
// 对外方法
// 0:注册 1:登录 2:找回密码
const opType = ref();
const showPanel = (type) => {
  dialogConfig.show = true;
  opType.value = type;
};
defineExpose({ showPanel });
</script>

<style lang="scss" scoped>
.login-register {
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
  .op-btn{
    width: 100%;
  }
}
</style>
