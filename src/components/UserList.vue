<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="id" label="Id" width="120" />
    <el-table-column prop="identity" label="Identity" width="120" />
    <el-table-column prop="address" label="Address" width="400" />
    <el-table-column prop="phone" label="Phone" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
          >Detail</el-button
        >
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { getUsers } from "@/request/user.js";
import { onMounted, reactive, ref } from "vue";
let tableData = ref(null);
onMounted(() => {
  getUsers().then((res) => {
    console.log("res=====>", res.data.data);
    tableData.value = res.data.data;
  });
});
const handleClick = () => {
  console.log("click");
};

// const tableData = [
//   {
//     name: "Tom",
//     id: "California",
//     identity: "Los Angeles",
//     address: "No. 189, Grove St, Los Angeles",
//     phone: "CA 90036",
//   },
//   {
//     name: "Tom",
//     id: "California",
//     identity: "Los Angeles",
//     address: "No. 189, Grove St, Los Angeles",
//     phone: "CA 90036",
//   },
//   {
//     name: "Tom",
//     id: "California",
//     identity: "Los Angeles",
//     address: "No. 189, Grove St, Los Angeles",
//     phone: "CA 90036",
//   },
//   {
//     name: "Tom",
//     id: "California",
//     identity: "Los Angeles",
//     address: "No. 189, Grove St, Los Angeles",
//     phone: "CA 90036",
//   },
// ];
</script>
