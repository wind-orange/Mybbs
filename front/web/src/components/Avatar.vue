<template>
  <div
    class="avatar"
    :style="{
      width: width + 'px',
      height: height + 'px',
      'border-radius': width / 2 + 'px',
    }"
  >
    <el-image
      v-if="userId"
      :style="{
        width: width + 'px',
        height: height + 'px',
        'border-radius': width / 2 + 'px',
      }"
      :src="proxy.globalInfo.avatarUrl + userId"
      fit="scale-down"
      loading="lazy"
      @click="gotoUserCenter"
    ></el-image>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();

const props = defineProps({
  userId: {
    type: String,
  },
  width: {
    type: Number,
    default: 60,
  },
  height: {
    type: Number,
    default: 50,
  },
  addLink: {
    type: Boolean,
    default: true,
  },
});

const gotoUserCenter = () => {
  if (props.addLink) {
    router.push("/user/" + proxy.userId);
  }
};
</script>

<style lang="scss">
.avatar {
  cursor: pointer;
}
</style>
