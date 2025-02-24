<template>
  <el-config-provider :locale="locale" :message="config">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import { reactive } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const config = reactive({
  max: 1,
});
const locale = zhCn;
</script>

<style lang="scss" scoped></style>
