<template>
  <div id="main"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
let option;
const echartsData = defineProps({
  tempData: Array,
  humiData: Array,
  timeData: Array,
});

option = {
  title: {
    text: "Rainfall and Flow Relationship",
    left: "center",
  },
  grid: {
    bottom: 80,
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
      saveAsImage: {},
    },
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
    data: ["温度", "湿度"],
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
    {
      name: "湿度(%)",
      nameLocation: "start",
      alignTicks: true,
      type: "value",
      inverse: true,
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
    {
      name: "湿度",
      type: "line",
      yAxisIndex: 1,
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
              xAxis: "2009/9/10\n7:00",
            },
            {
              xAxis: "2009/9/20\n7:00",
            },
          ],
        ],
      },
      // prettier-ignore
      data: echartsData.humiData,
    },
  ],
};
onMounted(() => {
  let chartDom = document.getElementById("main");
  let myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
});
</script>

<style>
#main {
  width: 1000px;
  height: 300px;
}
</style>