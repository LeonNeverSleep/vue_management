<template>
  <div class="EnvironmentMonitoring">
    <div id="device">
      <div class="hardware">
        设备在线状态
        <el-result v-if="deviceState" icon="success"> </el-result>
        <el-result icon="error" v-else></el-result>
      </div>
      <div class="led">
        LED灯开关
        <el-switch
          @change="handleLedChange"
          v-model="ledState"
          active-text="开"
          inactive-text="关"
        /><br />
      </div>
      <div class="buzzer">
        蜂鸣器报警
        <el-switch
          @change="handleBuzChange"
          v-model="buzzerState"
          active-text="开"
          inactive-text="关"
        />
      </div>
      <div class="door">
        安全柜门锁
        <el-switch
          @change="handleLockChange"
          v-model="doorState"
          active-text="开"
          inactive-text="关"
        />
      </div>
    </div>
    <div class="temp">
      这里展示温度
      <Pie
        :typeValue="1"
        :titlecolor="'#8a2be2'"
        :color="['#8a2be2', '#8a2be2', '#02aeff']"
        :value="temp"
        :valuesize="28"
      ></Pie>
    </div>
    <div class="humi">
      这里展示湿度
      <Pie
        :typeValue="2"
        :titlecolor="'#8a2be2'"
        :color="['#8a2be2', '#8a2be2', '#02aeff']"
        :valuesize="28"
        :value="humi"
      ></Pie>
    </div>
    <div class="smoke">
      这里展示烟雾浓度
      <Pie
        :typeValue="3"
        :titlecolor="'#8a2be2'"
        :color="['#8a2be2', '#8a2be2', '#02aeff']"
        :valuesize="28"
        :value="smoke"
      ></Pie>
    </div>
  </div>
</template>

<script setup>
import * as mqtt from "mqtt/dist/mqtt.min.js";
import { formatterDate } from "@/utils/date.js";
import Pie from "@/components/Pie.vue";
import { ref, onBeforeUnmount, nextTick } from "vue";
import { recordEnv } from "@/request/user.js";
const client = ref(null); // mqtt客户端
let humi = ref(0);
let temp = ref(0);
let smoke = ref(0);
let deviceState = ref(false);
let ledState = ref(false);
let buzzerState = ref(false);
let doorState = ref(false);

/**订阅列表**/
const subAlarmTopicType = () => {
  const topics1 = ["fjjxu/pub/1901/13"];
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
    subAlarmTopicType();
  });
  client.value.on("message", (topic, message) => {
    console.log("主题是", topic);
    deviceState.value = true;
    console.log("设备状态数据", message);
    const date = new Date();
    console.log("date是", date);
    const data = JSON.parse(message);
    humi.value = data.hum;
    temp.value = data.tem;
    smoke.value = data.mq;
    ledState.value = data.led === 1 ? true : false;
    buzzerState.value = data.buz === 1 ? true : false;
    // 在这里调接口将采集到的数据发送到后端，后端存入数据库
    const time = formatterDate(new Date());
    Object.assign(data, { time });
    console.log("时间戳", time);
    console.log("kkkk", data);
    recordEnv(data).then((res) => {
      console.log("存数据", res);
    });
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

const handleBuzChange = () => {
  const buzTopic = "fjjxu/sub/1901/13";
  if (buzzerState.value === false) {
    client.value.publish(buzTopic, "unWarning");
  } else {
    client.value.publish(buzTopic, "warning");
  }
};
const handleLedChange = () => {
  const ledTopic = "fjjxu/sub/1901/13";
  if (ledState.value === false) {
    client.value.publish(ledTopic, "close");
  } else {
    client.value.publish(ledTopic, "open");
  }
};
const handleLockChange = () => {
  console.log("handleLockChange");
};
deviceMqttMsg();
onBeforeUnmount(() => {
  // 组件注销前把mqtt关掉。
  client.value.end();
});
</script>

<style>
.EnvironmentMonitoring {
  display: flex;
  margin-top: 3%;
  flex-direction: row;
  justify-content: space-around;
}
.humi {
  width: 190px;
  margin-top: 3%;
  height: 190px;
}
.temp {
  width: 190px;
  margin-top: 3%;
  height: 190px;
}
.smoke {
  width: 190px;
  margin-top: 3%;
  height: 190px;
}
#device {
  width: 100px;
  height: 300px;
}
</style>