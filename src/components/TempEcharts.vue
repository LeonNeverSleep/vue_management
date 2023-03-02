<template>
  <div id="left"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
let option;
const echartsData = defineProps({
  tempData: Array,
  timeData: Array,
});

option = {
  title: {
    text: "历史温度图",
    left: "center",
  },
  grid: {
    bottom: 80,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
    right: 40,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      animation: false,
      label: {
        backgroundColor: "#505765",
      },
    },
  },
  legend: {
    data: ["温度"],
    left: 10,
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 65,
      end: 85,
    },
    {
      type: "inside",
      realtime: true,
      start: 65,
      end: 85,
    },
  ],
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      axisLine: { onZero: false },
      // prettier-ignore
      data: echartsData.timeData.map(function (str) {
                return str.replace(' ', '\n');
            }),
    },
  ],
  yAxis: [
    {
      name: "温度(℃)",
      type: "value",
    },
  ],
  series: [
    {
      name: "温度",
      type: "line",
      areaStyle: {},
      lineStyle: {
        width: 1,
      },
      emphasis: {
        focus: "series",
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3,
        },
        data: [
          [
            {
              xAxis: "2009/9/12\n7:00",
            },
            {
              xAxis: "2009/9/22\n7:00",
            },
          ],
        ],
      },
      // prettier-ignore
      data: echartsData.tempData,
    },
  ],
};
onMounted(() => {
  let chartDom = document.getElementById("left");
  let myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
});
</script>

<style>
#left {
  width: 300px;
  height: 250px;
  margin-right: 20px;
}
</style>