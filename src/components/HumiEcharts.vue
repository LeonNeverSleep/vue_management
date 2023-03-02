<template>
  <div id="middle"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
let option;
const echartsData = defineProps({
  humiData: Array,
  timeData: Array,
});

option = {
  title: {
    text: "历史湿度图",
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
        backgroundColor: "#6eb573",
      },
    },
  },
  legend: {
    data: ["湿度"],
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
      name: "湿度(%)",
      type: "value",
    },
  ],
  series: [
    {
      name: "湿度",
      type: "line",
      areaStyle: {
        color: "#c9f387",
      },
      lineStyle: {
        color: "#b6dc78",
        width: 1,
      },
      emphasis: {
        focus: "series",
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3,
          normal: {
            color: "#b6dc78",
            lineStyle: {
              color: "#b6dc78",
            },
          },
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
      data: echartsData.humiData,
    },
  ],
};
onMounted(() => {
  let chartDom = document.getElementById("middle");
  let myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
});
</script>

<style>
#middle {
  width: 300px;
  height: 250px;
  margin-right: 20px;
}
</style>