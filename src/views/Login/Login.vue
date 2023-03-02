<template>
  <div class="loginBg">
    <div class="loginContainer">
      <h1>博物馆文物柜管理系统</h1>
      <input v-model="name" type="text" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" /><br />
      <div class="identifyDiv">
        <input
          v-model="checkCode"
          size="small"
          type="text"
          placeholder="验证码"
          class="identify"
        />
        <SIdentify
          class="identifyImg"
          @click="refreshCode"
          :identifyCode="identifyCode"
        />
      </div>
      <el-button @click="handleLogin" size="large" type="primary"
        >登 录</el-button
      >
      <!-- <a @click="goToRegister">还没有账号?点我去注册-</a> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/request/user.js";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import SIdentify from "@/components/SIdentify.vue";
const router = useRouter();
const store = useStore();
const name = ref("");
const password = ref("");
const checkCode = ref("");
const handleLogin = () => {
  if (name.value.trim() == "") {
    ElMessage({
      message: "请输入用户名",
      center: true,
      offset: 200,
    });
  } else if (password.value.trim() == "") {
    ElMessage({
      message: "请输入密码",
      center: true,
      offset: 200,
    });
  } else if (checkCode.value.trim() == "") {
    ElMessage({
      message: "请输入验证码",
      center: true,
      offset: 200,
    });
  } else if (checkCode.value.trim() !== identifyCode.value) {
    ElMessage({
      message: "验证码错误",
      center: true,
      offset: 200,
    });
  } else {
    const data = { name: name.value, password: password.value };
    login(data).then((res) => {
      if (res.data.data.length !== 0) {
        console.log("res==>", res);
        const token = res.data.token;
        const username = res.data.data[0].name;
        const level = res.data.data[0].identity;
        const password = res.data.data[0].password;
        const phone = res.data.data[0].phone;
        const address = res.data.data[0].address;
        store.commit("changeAdminLevel", level);
        store.commit("changeUsername", username);
        store.commit("changeToken", token);
        store.commit("changePhone", phone);
        store.commit("changePassword", password);
        store.commit("changeAddress", address);
        sessionStorage.setItem("token", token);
        // sessionStorage.setItem("masters", JSON.stringify(res.data.data[0]));
        console.log("token==>", token);
        router.push("/home");
      } else {
        ElMessage({
          message: "用户名或密码错误",
          center: true,
          offset: 200,
        });
      }
    });
  }
};
onMounted(() => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
  sessionStorage.removeItem("token");
});
const goToRegister = () => {
  router.push("/register");
};
// 图形验证码
let identifyCodes = "1234567890";
let identifyCode = ref("3212");

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const makeCode = (o, l) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[randomNum(0, o.length)];
  }
};

const refreshCode = () => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
};
</script>

<style scoped>
.loginBg {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  background-image: url("@/assets/background.png");
  background-repeat: no-repeat;
  background-size: 120%;
  background-position-x: 60%;
  background-position-y: 65%;
}
.loginContainer {
  width: 27rem;
  height: 27rem;
  display: flex;
  margin-left: 20%;
  flex-direction: column;
  align-items: center;
  border-radius: 5%;
  background-color: #ffffff;
  box-shadow: 0 0 5rem rgb(111, 107, 107);
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
.identify {
  width: 8rem;
  height: 2.5rem;
  margin-top: -8px;
  margin-left: -7rem;
  margin-right: 1rem;
}
.identifyDiv {
  position: relative;
  margin-bottom: 1rem;
}
.identifyImg {
  position: absolute;
  top: -25%;
  left: 72%;
}
a {
  margin-top: 1rem;
  color: red;
  cursor: pointer;
}
</style>