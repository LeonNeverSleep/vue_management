<template>
  <div class="historyData">
    <div class="demo-date-picker">
      <div class="block">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          @change="handleChange"
        />
      </div>
    </div>
    <div v-if="dateChecked" class="showHistory">
      <EchartsLine
        :tempData="tempData"
        :humiData="humiData"
        :timeData="timeData"
      ></EchartsLine>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { formatterDate } from "@/utils/date.js";
import { getHistoryData } from "@/request/relic.js";
import EchartsLine from "@/components/EchartsLine.vue";
import dayjs from "dayjs";
const value1 = ref("");
const value2 = ref("");
const dateChecked = ref(false);
const tempData = ref([]);
const humiData = ref([]);
const timeData = ref([]);
const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
const handleChange = () => {
  console.log("ttt", value2.value);
  let startTime = formatterDate(value2.value[0]);
  let endTime = formatterDate(value2.value[1]);
  console.log("ttt==>", startTime);
  console.log("yyy==>", endTime);
  console.log("2023-02-16 10:00:01" <= "2023-02-16 10:00:02");
  if (startTime === endTime) {
    endTime = endTime.replace("00:00:00", "24:00:00");
  }
  getHistoryData().then((res) => {
    const historyData = res.data.data;
    console.log("原来的数据", res.data.data);
    historyData.forEach((element: any) => {
      element.recordtime = dayjs(element.recordtime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    });
    console.log("kkkkkkkkk", historyData);
    const newArr: any = [];
    const newArr2: any = [];
    historyData.forEach((element: any) => {
      if (startTime <= element.recordtime) {
        newArr.push(element);
      }
    });
    newArr.forEach((element: any) => {
      if (endTime >= element.recordtime) {
        newArr2.push(element);
      }
    });
    newArr2.forEach((e: any) => {
      e.recorddata = JSON.parse(e.recorddata);
      tempData.value.push(e.recorddata.tem);
      humiData.value.push(e.recorddata.hum);
      timeData.value.push(e.recordtime);
    });
    dateChecked.value = true;
  });
};
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  margin-top: -2%;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
