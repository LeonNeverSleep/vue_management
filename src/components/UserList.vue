<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" width="200" />
    <el-table-column prop="identity" label="管理员级别" width="200" />
    <el-table-column prop="address" label="地址" width="300" />
    <el-table-column prop="phone" label="电话号码" width="200" />
    <el-table-column v-if="adminLevel" fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleEdit(scope.row)"
          >edit</el-button
        >
        <el-button
          @click="handleDelete(scope.row)"
          link
          type="primary"
          size="small"
          >delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogVisible"
    title="编辑用户信息"
    width="30%"
    :before-close="handleClose"
  >
    <span>姓名</span>
    <el-input v-model="editUser.name"></el-input>
    <span>地址</span>
    <el-input v-model="editUser.address"></el-input>
    <span>电话号码</span>
    <el-input v-model="editUser.phone"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { getUsers, deleteUser, edit } from "@/request/user.js";
import { onMounted, reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "vuex";
const store = useStore();
const dialogVisible = ref(false);
const adminLevel = ref(false);
let tableData = ref(null);
let editUser = ref(null);
onMounted(() => {
  if (store.state.adminLevel == 2) {
    adminLevel.value = true;
  } else {
    adminLevel.value = false;
  }
});
getUsers().then((res) => {
  console.log("res=====>", res.data.data);
  console.log("adminLevel=====>", store.state.adminLevel);
  tableData.value = res.data.data;
});

const handleClick = (row: any) => {
  console.log("click", row);
};
const handleEdit = (row: any) => {
  console.log("edit", row);
  dialogVisible.value = true;
  editUser.value = row;
};
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("是否取消编辑？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const handleDelete = (row: any) => {
  console.log("delete row===>", row);
  ElMessageBox.confirm("确定要删除此用户吗？").then(() => {
    deleteUser({ id: row.id }).then((res) => {
      console.log("del res===>", res);
      getUsers().then((res) => {
        console.log("res=====>", res.data.data);
        tableData.value = res.data.data;
      });
    });
  });
};
const confirmEdit = () => {
  dialogVisible.value = false;
  console.log("newww==>", editUser.value);
  edit(editUser.value).then((res) => {
    console.log("edit res===>", res);
    getUsers().then((res) => {
      console.log("res=====>", res.data.data);
      tableData.value = res.data.data;
    });
  });
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>