<template>
  <div class="loginBg">
    <div class="loginContainer">
      <h1>注册页面</h1>
      <input v-model="newUser.name" type="text" placeholder="用户名" />
      <input v-model="newUser.password" type="password" placeholder="密码" />
      <input v-model="newUser.address" type="text" placeholder="地址" />
      <input v-model="newUser.phone" type="text" placeholder="电话号码" />
      <el-button @click="handleReg()" size="large" type="primary"
        >注 册</el-button
      >
      <a @click="goToLogin">去登录~</a>
    </div>
  </div>
</template>

<script setup>
import { reg } from "@/request/user.js";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { ElMessage } from "element-plus";
const newUser = reactive({
  name: "",
  password: "",
  address: "",
  phone: "",
});
const router = useRouter();
const handleReg = () => {
  console.log("regInfo===>", newUser);
  if (newUser.name.trim() === "") {
    ElMessage({
      offset: 200,
      message: "用户名不能为空",
      center: true,
    });
  } else if (newUser.password.trim() === "") {
    ElMessage({
      offset: 200,
      message: "密码不能为空",
      center: true,
    });
  } else if (newUser.address.trim() === "") {
    ElMessage({
      offset: 200,
      message: "地址不能为空",
      center: true,
    });
  } else if (newUser.phone.trim() === "") {
    ElMessage({
      offset: 200,
      message: "电话号码不能为空",
      center: true,
    });
  } else {
    const rules = checkUser();
    if (rules) {
      reg({ ...newUser }).then((res) => {
        console.log("reg res===>", res);
        ElMessage({
          offset: 200,
          message: "注册成功!",
          center: true,
        });
        setTimeout(() => {
          router.push("/");
        }, 50);
      });
    } else {
      ElMessage({
        offset: 200,
        message: "用户名应为4-12个字符",
        center: true,
      });
    }
  }
};
const checkUser = () => {
  const reg = /^\w{4,12}$/;
  if (!reg.test(newUser.name)) {
    return false;
  } else {
    return true;
  }
};
const goToLogin = () => {
  router.push("/");
};
</script>

<style scoped>
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
  margin-top: 3rem;
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
.el-button {
  margin-top: 1rem;
}
a {
  margin-top: 1rem;
  text-decoration: none;
  cursor: pointer;
  color: red;
}
</style>