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
            v-model="formData.loginPassword"
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
              <el-button
                class="send-email-btn"
                type="primary"
                size="large"
                @click="showEmailDialog()"
              >
                获取验证码
              </el-button>
            </div>
            <el-popover placement="left" :width="500" trigger="click">
              <div>
                <p>1. 在垃圾箱中查找邮箱验证码</p>
                <p>
                  2. 在邮箱中【头像->设置->反垃圾->白名单->设置邮件地址白名单】
                </p>
                <p>3. 将邮箱添加到白名单</p>
              </div>
              <template #reference>
                <span
                  class="a-link tips"
                  :style="{ 'font-size': '14px', cursor: 'pointer' }"
                >
                  未收到邮箱验证码？
                </span>
              </template>
            </el-popover>
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
          <el-form-item prop="reRegisterPassword">
            <el-input
              size="large"
              clearable
              placeholder="请再次输入密码"
              v-model="formData.reRegisterPassword"
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
          <el-button
            class="op-btn"
            type="primary"
            size="large"
            @click="submitForm()"
          >
            <span v-if="opType == 0">注册</span>
            <span v-if="opType == 1">登录</span>
            <span v-if="opType == 2">重置密码</span>
          </el-button>
        </el-form-item>
      </el-form>
    </Dialog>
    <!-- send email code Dialog -->
    <Dialog
      :show="emailDialogConfig.show"
      :title="emailDialogConfig.title"
      :buttons="emailDialogConfig.buttons"
      :showCancel="false"
      width="500px"
      @close="emailDialogConfig.show = false"
    >
      <el-form
        :model="emailFormData"
        :rules="rules"
        ref="emailFormDataRef"
        label-width="80px"
      >
        <el-form-item label="邮箱" prop="email">
          {{ emailFormData.email }}
        </el-form-item>
        <el-form-item label="验证码" prop="checkCode">
          <div class="check-code-panel">
            <el-input
              v-model="emailFormData.checkCode"
              placeholder="请输入验证码"
              size="large"
              clearable
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img
              :src="emailCheckCodeUrl"
              class="check-code"
              @click="changeCheckCode(1)"
            />
          </div>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
import { useStore } from "vuex";
import md5 from "js-md5";

const { proxy } = getCurrentInstance();
const store = useStore();
// api
const api = {
  checkCode: "/api/checkCode",
  sendEmailCode: "/sendEmailCode",
  register: "/register",
  login: "/login",
  resetPwd: "/resetPwd",
};
// Dialog参数
const dialogConfig = reactive({
  show: false,
  title: "标题",
});
const emailDialogConfig = reactive({
  show: false,
  title: "邮箱验证码",
  buttons: [
    {
      type: "primary",
      text: "发送验证码",
      click: () => {
        sendEmailCode();
      },
    },
  ],
});
// 对外方法
// type: 0-注册 1-登录 2-找回密码
const opType = ref();
const showPanel = (type) => {
  opType.value = type;
  resetForm();
};
defineExpose({ showPanel });

// 获取验证码
const checkCodeUrl = ref(api.checkCode);
const emailCheckCodeUrl = ref(api.checkCode);
const changeCheckCode = (type) => {
  if (type == 0) {
    checkCodeUrl.value =
      api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
  } else {
    emailCheckCodeUrl.value =
      api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
  }
};

// 表单配置
const formData = ref({});
const formDataRef = ref();
const emailFormData = ref({});
const emailFormDataRef = ref();
// 表单密码校验
const checkRePassword = (rule, value, callback) => {
  if (value !== formData.value.registerPassword) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
};
// 表单校验
const rules = {
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "请输入正确的邮箱" },
  ],
  loginPassword: [{ required: true, message: "请输入密码" }],
  emailCode: [{ required: true, message: "请输入邮箱验证码" }],
  nickName: [{ required: true, message: "请输入昵称" }],
  registerPassword: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "密码由8-18位的数字、字母、特殊字符组成",
    },
  ],
  reRegisterPassword: [
    { required: true, message: "请再次输入密码" },
    {
      validator: checkRePassword,
      message: "两次输入的密码不一致",
    },
  ],
  checkCode: [{ required: true, message: "请输入图片验证码" }],
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
    formDataRef.value.resetFields();
    formData.value = {}; // 手动清空表单数据
    // rememberMe:登陆时如果cookie里有数据，粘贴回表单
    if (opType.value == 1) {
      const cookieLoginInfo = proxy.VueCookies.get("loginInfo");
      if (cookieLoginInfo) {
        cookieLoginInfo.loginPassword = cookieLoginInfo.password;
        formData.value = cookieLoginInfo;
      }
    }
  });
};

// 获取邮箱验证码的点击事件
const showEmailDialog = () => {
  formDataRef.value.validateField("email", (valid) => {
    if (!valid) return;
    emailDialogConfig.show = true;
    nextTick(() => {
      changeCheckCode(1);
      emailFormDataRef.value.resetFields();
      emailFormData.value = {
        email: formData.value.email,
      };
    });
  });
};
// 发送邮件
const sendEmailCode = () => {
  emailFormDataRef.value.validate(async (valid) => {
    if (!valid) return;
    const parmas = Object.assign({}, emailFormData.value);
    parmas.type = opType.value == 0 ? 0 : 1; // 0-注册 1-找回密码
    let result = await proxy.Request({
      url: api.sendEmailCode,
      parmas: parmas,
      errorCallback: () => {
        changeCheckCode(1);
      },
    });
    if (!result) return;
    proxy.Message.success("验证码发送成功，请登录邮箱查看");
    emailDialogConfig.show = false;
  });
};
// 提交表单
const submitForm = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) return; // 校验不通过
    let parmas = {};
    Object.assign(parmas, formData.value);
    // 统一参数，处理密码
    if (opType.value == 0 || opType.value == 2) {
      parmas.password = parmas.registerPassword;
      delete parmas.registerPassword;
      delete parmas.reRegisterPassword;
    } else if (opType.value == 1) {
      parmas.password = parmas.loginPassword;
      delete parmas.loginPassword;
      // md5密码校验转换
      let cookieLoginInfo = proxy.VueCookies.get("loginInfo");
      let cookiePassword =
        cookieLoginInfo == null ? null : cookieLoginInfo.password;
      if (parmas.password !== cookiePassword) {
        parmas.password = md5(parmas.password);
      }
    }
    // 根据状态码调用api
    let url = null;
    if (opType.value == 0) {
      url = api.register;
    } else if (opType.value == 1) {
      url = api.login;
    } else if (opType.value == 2) {
      url = api.resetPwd;
    }
    let result = await proxy.Request({
      url: url,
      parmas: parmas,
      errorCallback: () => {
        changeCheckCode(0);
      },
    });
    if (!result) return;
    if (opType.value == 0) {
      // 注册->登录
      proxy.Message.success("注册成功，请登录");
      showPanel(1);
    } else if (opType.value == 1) {
      // rememberMe
      if (parmas.rememberMe) {
        const loginInfo = {
          email: parmas.email,
          password: parmas.password,
          rememberMe: parmas.rememberMe,
        };
        proxy.VueCookies.set("loginInfo", loginInfo, "7d");
      } else {
        proxy.VueCookies.remove("loginInfo");
      }
      // 登录
      dialogConfig.show = false;
      store.commit("updateLoginUserInfo", result.data);
      proxy.Message.success("登录成功");
    } else if (opType.value == 2) {
      // 重置密码->登录
      proxy.Message.success("密码重置成功，请登录");
      showPanel(1);
    }
  });
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
.check-code-panel {
  display: flex;
  .check-code {
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
