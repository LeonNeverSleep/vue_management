<template>
  <div v-if="adminLevel" class="newAdmin" @click="handleNewAdmin">
    新增管理
    <el-icon class="newIcon"><CirclePlusFilled /></el-icon>
  </div>
  <el-table max-height="400" :data="tableData" style="width: 100%">
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
          >编辑</el-button
        >
        <el-button
          @click="handleDelete(scope.row)"
          link
          type="primary"
          size="small"
          >删除</el-button
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
  <el-dialog
    v-model="newAdminVisible"
    title="新增管理员信息"
    width="30%"
    :before-close="handleClose"
  >
    <span>姓名</span>
    <el-input v-model="newUser.name"></el-input><br /><br />
    <span>密码</span>
    <el-input v-model="newUser.password"></el-input><br /><br />
    <span>管理员级别</span><br />
    <el-radio-group v-model="newUser.authority" class="ml-4">
      <el-radio label="1" size="large">1</el-radio>
      <el-radio label="2" size="large">2</el-radio> </el-radio-group
    ><br />
    <span>地址</span>
    <el-input v-model="newUser.address"></el-input>
    <span>电话号码</span>
    <el-input v-model="newUser.phone"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="newAdminVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmNew">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { getUsers, deleteUser, edit, reg } from "@/request/user.js";
import { onMounted, reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useStore } from "vuex";
const store = useStore();
const dialogVisible = ref(false);
const newAdminVisible = ref(false);
const adminLevel = ref(false);
let tableData = ref([]);
let editUser = ref(null);
let newUser = ref({
  name: "",
  authority: "",
  password: "",
  phone: "",
  address: "",
});
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
const handleNewAdmin = () => {
  console.log("新增管理员");
  newUser.value = {
    name: "",
    password: "",
    authority: "",
    address: "",
    phone: "",
  };
  newAdminVisible.value = true;
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
const confirmNew = () => {
  const nameRule = checkUser();
  const phoneRule = checkPhone();
  const adminExist = tableData.value.some((item: any) => {
    if (item.name == newUser.value.name) {
      return true;
    }
  });
  if (newUser.value.name.trim() === "") {
    ElMessage({
      offset: 200,
      message: "用户名不能为空",
      center: true,
    });
  } else if (newUser.value.password.trim() === "") {
    ElMessage({
      offset: 200,
      message: "密码不能为空",
      center: true,
    });
  } else if (newUser.value.authority == "") {
    ElMessage({
      offset: 200,
      message: "请选择管理员级别",
      center: true,
    });
  } else if (newUser.value.address.trim() === "") {
    ElMessage({
      offset: 200,
      message: "地址不能为空",
      center: true,
    });
  } else if (newUser.value.phone.trim() === "") {
    ElMessage({
      offset: 200,
      message: "电话不能为空",
      center: true,
    });
  } else if (!nameRule) {
    ElMessage({
      offset: 200,
      message: "用户名应为4-12个字符",
      center: true,
    });
  } else if (adminExist) {
    ElMessage({
      offset: 200,
      message: "用户名已存在",
      center: true,
    });
  } else if (!phoneRule) {
    ElMessage({
      offset: 200,
      message: "请输入正确的手机号",
      center: true,
    });
  } else {
    console.log("这里可以进行新增操作了");
    reg({ ...newUser.value }).then((res) => {
      console.log("新增管理员成功", res.data);
      getUsers().then((res) => {
        console.log("res=====>", res.data.data);
        console.log("adminLevel=====>", store.state.adminLevel);
        tableData.value = res.data.data;
      });
    });
    newAdminVisible.value = false;
  }
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
const checkUser = () => {
  const reg = /^\w{4,12}$/;
  if (!reg.test(newUser.value.name)) {
    return false;
  } else {
    return true;
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
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.newAdmin {
  position: absolute;
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  top: 3%;
  left: 87%;
  background-color: #409eff;
  font-size: 16px;
  z-index: 200;
  border-radius: 24px;
  box-shadow: 0 0 3rem rgb(169, 168, 168);
  cursor: pointer;
}
</style>