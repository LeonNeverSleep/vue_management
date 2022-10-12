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
    <el-form-item label="手机号">
      <el-input v-model="formLabelAlign.phone" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="formLabelAlign.address" />
    </el-form-item>
    <el-form-item label="用户身份">
      <el-input v-model="formLabelAlign.identity" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";

const labelPosition = ref("right");

const formLabelAlign = reactive({
  name: "",
  phone: "",
  address: "",
  identity: "",
});
</script>
<style>
.el-form {
  margin: 5% 0 0 30%;
}
</style>
