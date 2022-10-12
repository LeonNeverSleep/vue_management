<template>
  <div class="loginBg">
    <div class="loginContainer">
      <h1>博物馆文物柜管理系统</h1>
      <input type="text" placeholder="用户名" />
      <input type="password" placeholder="密码" /><br />
      <el-button @click="handleLogin" size="large" type="primary"
        >登 录</el-button
      >
      <a @click="goToRegister">还没有账号?去注册一个</a>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const handleLogin = () => {
  router.push("/home");
};
const goToRegister = () => {
  router.push("/register");
};
</script>

<style>
.loginBg {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-x: 30%;
  background-position-y: 30%;
}
.loginContainer {
  width: 27rem;
  height: 27rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5%;
  background-color: #ffffff;
  box-shadow: 0 0 5rem rgb(16, 15, 15);
}
h1 {
  margin-top: 5rem;
}
input {
  margin-top: 0.5rem;
  width: 16rem;
  height: 2.5rem;
  line-height: 2.5rem;
  box-sizing: border-box;
  border: 2px solid #d5d5d5;
  padding: 10px 8px;
  background-color: #fff;
}
a {
  margin-top: 3rem;
  color: red;
}
</style>