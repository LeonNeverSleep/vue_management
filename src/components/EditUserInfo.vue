<template>
  <div style="margin: 20px" />
  <el-form label-position="left" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
    <el-form-item label="用户名">
      <el-input disabled v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.password" />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="formLabelAlign.phone" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="formLabelAlign.address" />
    </el-form-item>
    <el-button class="clearForm" @click="handleClear">清空</el-button>
    <el-button class="editForm" @click="handleChange">修改</el-button>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { editUserData } from '@/request/user.js'
const labelPosition = ref("right");
const store = useStore();
const formLabelAlign = reactive({
  name: store.state.username,
  password: store.state.password,
  phone: store.state.phone,
  address: store.state.address,
});
const handleClear = () => {
  formLabelAlign.password = "";
  formLabelAlign.phone = "";
  formLabelAlign.address = "";
};
const handleChange = () => {
  console.log(formLabelAlign);
  const phoneRule = checkPhone();
  if (formLabelAlign.password.trim() == "") {
    ElMessage({
      offset: 200,
      message: "密码不能为空",
      center: true,
    });
  } else if (formLabelAlign.phone.trim() == "") {
    ElMessage({
      offset: 200,
      message: "电话号码不能为空",
      center: true,
    });
  } else if (formLabelAlign.address.trim() == "") {
    ElMessage({
      offset: 200,
      message: "地址不能为空",
      center: true,
    });
  } else if (!phoneRule) {
    ElMessage({
      offset: 200,
      message: "请输入正确的11位手机号",
      center: true,
    });
  } else {
    editUserData(formLabelAlign).then(() => {
      ElMessage({
        offset: 200,
        message: "修改个人信息成功",
        center: true,
      });
      store.commit("changeUsername", formLabelAlign.name);
      store.commit("changeAddress", formLabelAlign.address);
      store.commit("changePhone", formLabelAlign.phone);
      store.commit("changePassword", formLabelAlign.password);
    })
  }
};
const checkPhone = () => {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!reg.test(newUser.value.phone)) {
    return false;
  } else {
    return true;
  }
};
</script>
<style>
.el-form {
  margin: 5% 0 0 30%;
  position: relative;
}

.clearForm {
  position: absolute;
  top: 150%;
  left: 35%;
}

.editForm {
  position: absolute;
  top: 150%;
  left: 50%;
}
</style>
