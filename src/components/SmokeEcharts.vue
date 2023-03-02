<template>
  <div id="right"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
let option;
const echartsData = defineProps({
  smokeData: Array,
  timeData: Array,
});

option = {
  title: {
    text: "历史烟雾浓度图",
    left: 90,
    textStyle: {
      fontSize: 18,
    },
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
    data: ["烟雾浓度"],
    left: 0,
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
      name: "烟雾浓度(mg/m³)",
      nameTextStyle: {
        fontSize: 12,
        padding: [0, 0, 0, 40],
      },
      type: "value",
      // axisLabel: {
      //   fontSize: 10,
      // },
    },
  ],
  series: [
    {
      name: "烟雾浓度",
      type: "line",
      areaStyle: {
        color: "#535550",
      },
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
      data: echartsData.smokeData,
    },
  ],
};
onMounted(() => {
  let chartDom = document.getElementById("right");
  let myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
});
</script>

<style>
#right {
  width: 300px;
  height: 250px;
  margin-right: 20px;
}
</style>