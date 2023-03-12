<template>
  <div class="newRelic" @click="handleNewRelic">
    文物入库
    <el-icon class="newIcon">
      <CirclePlusFilled />
    </el-icon>
  </div>
  <el-table max-height="400" :data="relicData" style="width: 100%">
    <el-table-column prop="relicId" label="文物标签" width="200" />
    <el-table-column prop="relicName" label="文物名称" width="200" />
    <el-table-column prop="relicType" label="文物类型" width="300" />
    <el-table-column prop="relicAuthority" label="所属管理员" width="200" />
    <el-table-column fixed="right" label="管理" width="200">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button @click="handleDelete(scope.row)" link type="primary" size="small">删除</el-button>
        <el-button @click="handleIntroduction(scope.row)" link type="primary" size="small">简介</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="编辑文物信息" width="30%" :before-close="handleClose">
    <span>文物名称</span>
    <el-input v-model="editData.relicName"></el-input>
    <span>文物类型</span>
    <el-input v-model="editData.relicType"></el-input>
    <span>文物简介</span>
    <el-input v-model="editData.relicIntro"></el-input>
    <span>文物图片地址</span>
    <el-input v-model="editData.relicImg"></el-input>
    <span>所属管理员</span>
    <el-input :disabled="store.state.adminLevel === '1'" v-model="editData.relicAuthority"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="newRelicTable" title="新增入库文物" width="30%" @close="cancelNewRelic" :before-close="handleClose">
    <span>文物名称</span>
    <el-input v-model="newRelicData.relicName"></el-input>
    <span>文物类型</span>
    <el-input v-model="newRelicData.relicType"></el-input>
    <span>文物简介</span>
    <el-input v-model="newRelicData.relicIntro"></el-input>
    <span>文物图片链接</span>
    <el-input v-model="newRelicData.relicImg"></el-input>
    <span>所属管理员</span>
    <el-input :disabled="store.state.adminLevel === '1'" v-model="newRelicData.relicAuthority"></el-input>
    <span>文物ID</span>
    <el-input disabled v-model="newRelicData.relicId"></el-input>
    <img class="RFIDImg" v-if="isScanned" src="@/assets/RFIDSuccess.png" alt="" />
    <img class="RFIDImg" v-else src="@/assets/RFID.png" alt="" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelNewRelic">取消</el-button>
        <el-button type="primary" @click="confirmNew">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="introVisible" title="文物简介" width="30%">
    <p>{{ relicIntro }}</p>
    <h3>文物图片</h3>
    <img class="introImg" :src="relicImg" alt="" />
  </el-dialog>
</template>

<script setup>
import * as mqtt from "mqtt/dist/mqtt.min.js";
import {
  getRelics,
  deleteRelic,
  editRelic,
  getAllRelics,
  addRelic,
} from "@/request/relic.js";
import { onMounted, reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useStore } from "vuex";
import { getUsers } from "@/request/user.js";
const store = useStore();
let relicData = ref(null);
let editData = ref(null);
const client = ref(null); // mqtt客户端
let newRelicData = ref(null);
let relicIntro = ref("");
let relicImg = ref("");
const dialogVisible = ref(false);
const newRelicTable = ref(false);
const introVisible = ref(false);
const isScanned = ref(false);
const handleClick = (row) => {
  console.log("click", row);
};
/**订阅RFID主题**/
const subRfidTopic = () => {
  const topics1 = ["fjjxu/RFID/1901/13"];
  client.value.subscribe(topics1, { qos: 1 });
  console.log("kkkkk");
};
/**设置mqtt*/
const deviceMqttMsg = () => {
  const options = {};
  client.value = mqtt.connect("ws:broker.emqx.io:8083/mqtt", options);
  client.value.on("connect", (e) => {
    console.log("设备状态连接成功！！！", e, client.value);
    // 这里可以订阅到主题了
    subRfidTopic();
  });
  client.value.on("message", (topic, message) => {
    console.log("主题是", topic);
    console.log("设备状态数据", JSON.stringify(message));
    const data = JSON.parse(message);
    console.log("kkkk", data);
    newRelicData.value.relicId = data.relicId;
    isScanned.value = true;
  });
  // 断开发起重连
  client.value.on("reconnect", (error) => {
    console.log("2222222:", error);
  });
  // 链接异常处理
  client.value.on("error", (error) => {
    console.log("333333:", error);
  });
};
const handleIntroduction = (row) => {
  console.log("intro", row);
  introVisible.value = true;
  relicIntro.value = row.relicIntro;
  relicImg.value = row.relicImg;
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
      newRelicData.value.relicId = "";
      isScanned.value = false;
    })
    .catch(() => {
      // catch error
      newRelicData.value.relicId = "";
      isScanned.value = false;
    });
};
const handleNewRelic = () => {
  deviceMqttMsg();
  console.log("新增文物");
  newRelicData.value = {
    relicId: "",
    relicName: "",
    relicType: "",
    relicIntro: "",
    relicImg: "",
    relicAuthority: store.state.username,
  };
  newRelicTable.value = true;
  ElMessage({
    message: "请将文物标签靠近读卡器",
    center: true,
    offset: 200,
  });
};
const handleDelete = (row) => {
  console.log("delete row===>", row);
  ElMessageBox.confirm("确定要删除此文物吗？").then(() => {
    deleteRelic({ id: row.id }).then((res) => {
      console.log("del res===>", res);
      if (store.state.adminLevel === "1") {
        getRelics(store.state.username).then((res) => {
          console.log("res=====>", res.data.data);
          relicData.value = res.data.data;
          store.commit("changeRelicList", editData.value);
        });
      } else {
        getAllRelics().then((res) => {
          relicData.value = res.data.data;
        });
      }
    });
  });
};
const confirmEdit = () => {
  if (editData.value.relicName.trim() === "") {
    ElMessage({
      message: "请输入文物名称",
      center: true,
      offset: 200,
    });
  } else if (editData.value.relicType.trim() === "") {
    ElMessage({
      message: "请输入文物类型",
      center: true,
      offset: 200,
    });
  } else if (editData.value.relicIntro.trim() === "") {
    ElMessage({
      message: "请输入文物简介",
      center: true,
      offset: 200,
    });
  } else if (editData.value.relicImg.trim() === "") {
    ElMessage({
      message: "请输入文物图片链接",
      center: true,
      offset: 200,
    });
  } else {
    dialogVisible.value = false;
    editRelic(editData.value).then((res) => {
      console.log("edit res===>", res);
      if (store.state.adminLevel === "1") {
        getRelics(store.state.username).then((res) => {
          console.log("res=====>", res.data.data);
          relicData.value = res.data.data;
          store.commit("changeRelicList", editData.value);
        });
      } else {
        getAllRelics().then((res) => {
          relicData.value = res.data.data;
        });
      }
    });
  }
};
const confirmNew = () => {
  const userName = newRelicData.value.relicAuthority;
  const adminExist = store.state.userList.some((item) => {
    if (item.name == userName) {
      return true;
    }
  });
  // console.log("userName有吗", userName);
  // console.log("store.state.userList有吗", store.state.userList);
  // console.log("有吗", adminExist);
  if (newRelicData.value.relicName.trim() === "") {
    ElMessage({
      message: "请输入文物名称",
      center: true,
      offset: 200,
    });
  } else if (newRelicData.value.relicType.trim() === "") {
    ElMessage({
      message: "请输入文物类型",
      center: true,
      offset: 200,
    });
  } else if (newRelicData.value.relicIntro.trim() === "") {
    ElMessage({
      message: "请输入文物简介",
      center: true,
      offset: 200,
    });
  } else if (newRelicData.value.relicImg.trim() === "") {
    ElMessage({
      message: "请输入文物图片链接",
      center: true,
      offset: 200,
    });
  } else if (newRelicData.value.relicAuthority.trim() === "") {
    ElMessage({
      message: "请输入文物所属管理员",
      center: true,
      offset: 200,
    });
  }
  else if (!adminExist) {
    ElMessage({
      message: "管理员不存在",
      center: true,
      offset: 200,
    });
  }
  else if (!isScanned.value) {
    ElMessage({
      message: "请将文物标签靠近读卡器",
      center: true,
      offset: 200,
    });
  } else {
    newRelicTable.value = false;
    addRelic(newRelicData.value).then((res) => {
      console.log("edit res===>", res);
      if (store.state.adminLevel === "1") {
        getRelics(store.state.username).then((res) => {
          console.log("res=====>", res.data.data);
          relicData.value = res.data.data;
          store.commit("changeRelicList", editData.value);
        });
      } else {
        getAllRelics().then((res) => {
          relicData.value = res.data.data;
        });
      }
    });
  }
};
const cancelNewRelic = () => {
  newRelicTable.value = false
  isScanned.value = false;
}
onMounted(() => {
  getUsers().then((res) => {
    console.log("res=====>", res.data.data);
    store.commit("changeUserList", res.data.data);
  });
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
.newRelic {
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

.RFIDImg {
  width: 70px;
  height: 70px;
  margin-left: 150px;
  margin-top: 20px;
}

.introImg {
  width: 100px;
  height: 100px;
  margin-left: 140px;
  margin-top: 20px;
}
</style>