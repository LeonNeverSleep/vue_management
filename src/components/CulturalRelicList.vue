<template>
  <el-table max-height="400" :data="relicData" style="width: 100%">
    <el-table-column prop="relicId" label="编号" width="200" />
    <el-table-column prop="relicName" label="文物名称" width="200" />
    <el-table-column prop="relicType" label="文物类型" width="300" />
    <el-table-column prop="relicAuthority" label="所属管理员" width="200" />
    <el-table-column fixed="right" label="管理" width="200">
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
    title="编辑文物信息"
    width="30%"
    :before-close="handleClose"
  >
    <span>文物名称</span>
    <el-input v-model="editData.relicName"></el-input>
    <span>文物类型</span>
    <el-input v-model="editData.relicType"></el-input>
    <span>所属管理员</span>
    <el-input v-model="editData.relicAuthority"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  getRelics,
  deleteRelic,
  editRelic,
  getAllRelics,
} from "@/request/relic.js";
import { onMounted, reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "vuex";
const store = useStore();
let relicData = ref(null);
let editData = ref(null);
const dialogVisible = ref(false);

const handleClick = (row) => {
  console.log("click", row);
};
const handleEdit = (row) => {
  console.log("edit", row);
  dialogVisible.value = true;
  editData.value = row;
  store.commit("changeRelicList", editData.value);
};
const handleClose = (done) => {
  ElMessageBox.confirm("是否取消编辑？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const handleDelete = (row) => {
  console.log("delete row===>", row);
  ElMessageBox.confirm("确定要删除此文物吗？").then(() => {
    deleteRelic({ id: row.id }).then((res) => {
      console.log("del res===>", res);
      getRelics(store.state.username).then((res) => {
        console.log("res=====>", res.data.data);
        relicData.value = res.data.data;
      });
    });
  });
};
const confirmEdit = () => {
  dialogVisible.value = false;
  editRelic(editData.value).then((res) => {
    console.log("edit res===>", res);
    getRelics(store.state.username).then((res) => {
      console.log("res=====>", res.data.data);
      relicData.value = res.data.data;
      store.commit("changeRelicList", editData.value);
    });
  });
};
onMounted(() => {
  if (store.state.adminLevel === "1") {
    getRelics(store.state.username).then((res) => {
      relicData.value = res.data.data;
    });
  } else {
    getAllRelics().then((res) => {
      relicData.value = res.data.data;
    });
  }
});
</script>

<style>
</style>