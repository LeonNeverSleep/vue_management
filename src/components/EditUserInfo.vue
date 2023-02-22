<template>
  <div style="margin: 20px" />
  <el-form
    label-position="left"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="用户名">
      <el-input v-model="formLabelAlign.name" />
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
import { useStore } from "vuex";
const labelPosition = ref("right");
const store = useStore();
const formLabelAlign = reactive({
  name: store.state.username,
  password: store.state.password,
  phone: store.state.phone,
  address: store.state.address,
});
const handleClear = () => {
  formLabelAlign.name = "";
  formLabelAlign.password = "";
  formLabelAlign.phone = "";
  formLabelAlign.address = "";
};
const handleChange = () => {
  console.log(formLabelAlign);
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
