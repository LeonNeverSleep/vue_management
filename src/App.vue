<template>
  <router-view />
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
// 监听页面刷新事件
window.onbeforeunload = changeHref;

function changeHref() {
  router.push("/");
}
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
