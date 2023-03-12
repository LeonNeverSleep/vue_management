<template>
  <div class="pie" ref="percent"></div>
</template>
 
<script>
import { ref, toRefs, reactive, onMounted, watch } from "vue";
import * as echarts from "echarts";
export default {
  props: {
    // 标题文字
    title: {
      type: String,
      default: "",
    },
    // 中间百分比数字文字的颜色
    titlecolor: {
      type: String,
      default: "#79ffff",
    },
    // 值百分之多少
    value: {
      type: Number,
      default: 75,
    },
    typeValue: {
      type: Number,
      default: 1,
    },
    isSmoke: {
      type: Boolean,
      default: false,
    },
    valuesize: {
      type: Number,
      default: 35,
    },

    color: {
      type: Array,
      default: () => {
        // 下标
        // 0 竖线样式圆环颜色
        // 1 圈内的点点的颜色  和 最外圈圆环的颜色
        // 2 最外圈圆环的渐变色
        return ["rgba(0,255,0,0.5)", "#00ff00", "#02aeff"];
      },
    },
  },
  setup(props) {
    let percent = ref("");
    let state = reactive({});
    let methods = {
      markChart() {
        // 初始化
        let Mychart = echarts.init(percent.value);
        // 配置项
        var labelData = [];
        var labelData1 = [];
        for (var i = 0; i < 150; ++i) {
          labelData.push({
            value: 1,
            name: i,
            itemStyle: {
              normal: {
                color: "#696969",
              },
            },
          });
        }
        for (var i = 0; i < labelData.length; ++i) {
          if (labelData[i].name < 50) {
            labelData[i].itemStyle = {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: props.color[0],
                  },
                  {
                    offset: 1,
                    color: props.color[0],
                  },
                ]),
              },
            };
          }
        }
        for (var i = 0; i < 150; ++i) {
          labelData1.push({
            value: 1,
            name: i,
            itemStyle: {
              normal: {
                color: "rgba(0,255,0,1)",
              },
            },
          });
        }
        for (var i = 0; i < labelData1.length; ++i) {
          if (labelData1[i].name < 150) {
            labelData1[i].itemStyle = {
              normal: {
                // color: 'rgba(0,255,0,0.1)'
                color: props.color[0],
              },
            };
          }
        }

        function Pie() {
          let dataArr = [];
          for (var i = 0; i < 100; i++) {
            if (i % 10 === 0) {
              dataArr.push({
                name: (i + 1).toString(),
                value: 40,
                itemStyle: {
                  // 外圈的点点颜色
                  normal: {
                    color: props.color[2],
                    borderWidth: 0,
                    // borderColor: '#00ff00'
                  },
                },
              });
            } else {
              dataArr.push({
                name: (i + 1).toString(),
                value: 100,
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)",
                  },
                },
              });
            }
          }
          return dataArr;
        }

        function Pie1() {
          let dataArr = [];
          for (var i = 0; i < 100; i++) {
            if (i % 5 === 0) {
              dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                  normal: {
                    color: props.color[1],
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)",
                  },
                },
              });
            } else {
              dataArr.push({
                name: (i + 1).toString(),
                value: 100,
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)",
                  },
                },
              });
            }
          }
          return dataArr;
        }

        function Pie2() {
          let dataArr = [];
          for (var i = 0; i < 100; i++) {
            if (i % 5 === 0) {
              dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                  normal: {
                    color: props.color[1],
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)",
                  },
                },
              });
            } else {
              dataArr.push({
                name: (i + 1).toString(),
                value: 100,
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)",
                  },
                },
              });
            }
          }
          return dataArr;
        }

        function Pie3() {
          let dataArr = [];
          for (var i = 0; i < 100; i++) {
            if (i % 10 === 0) {
              dataArr.push({
                name: (i + 1).toString(),
                value: 30,
                itemStyle: {
                  normal: {
                    color: props.color[1],
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)",
                  },
                },
              });
            } else {
              dataArr.push({
                name: (i + 1).toString(),
                value: 100,
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)",
                  },
                },
              });
            }
          }
          return dataArr;
        }

        let option = {
          title: [
            {
              text:
                props.value + (props.isSmoke
                  ? "mg/m³"
                  : props.typeValue === 1
                    ? "℃"
                    : "%"), //动态传递
              x: "50%",
              y: "45%",
              textAlign: "center",
              textStyle: {
                fontSize: props.valuesize,
                fontWeight: "700",
                color: props.titlecolor,
                textAlign: "center",
              },
            },
            {
              text: props.title, //动态传递
              x: "10%",
              y: "45%",
              textAlign: "center",
              textStyle: {
                fontSize: "70",
                fontWeight: "100",
                color: props.titlecolor,
                textAlign: "center",
              },
            },
          ],
          polar: {
            radius: ["75%", "85%"],
            center: ["50%", "50%"],
          },
          angleAxis: {
            max: 100,
            show: false,
            startAngle: 0,
          },
          radiusAxis: {
            type: "category",
            show: true,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          series: [
            {
              name: "",
              type: "bar",
              roundCap: true,
              barWidth: 50, //最外圈圆环宽度
              showBackground: true,
              backgroundStyle: {
                color: "#464451",
              },
              data: [props.value],
              coordinateSystem: "polar",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      offset: 0.6,
                      color: props.color[1],
                    },
                    {
                      offset: 1,
                      color: props.color[2],
                    },
                  ]),
                },
              },
            },
            {
              hoverAnimation: false,
              type: "pie",
              z: 2,
              data: labelData,
              radius: ["52%", "59%"],
              zlevel: -2,
              itemStyle: {
                normal: {
                  borderColor: "#1f1e26",
                  borderWidth: 4,
                },
              },
              label: {
                normal: {
                  position: "inside",
                  show: false,
                },
              },
            },
            {
              hoverAnimation: false,
              type: "pie",
              z: 1,
              data: labelData1,
              radius: ["52%", "59%"],
              zlevel: -2,
              itemStyle: {
                normal: {
                  borderColor: "#1f1e26",
                  borderWidth: 4,
                },
              },
              label: {
                normal: {
                  position: "inside",
                  show: false,
                },
              },
            },
            {
              type: "pie",
              radius: ["42%", "45%"],
              center: ["50%", "50%"],
              data: [
                {
                  hoverOffset: 1,
                  value: props.value, //最内圈圆环
                  name: "",
                  itemStyle: {
                    color: props.color[1],
                  },
                  label: {
                    show: false,
                  },
                  labelLine: {
                    normal: {
                      smooth: true,
                      lineStyle: {
                        width: 10,
                      },
                    },
                  },
                  hoverAnimation: false,
                },
                {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    normal: {
                      smooth: true,
                      lineStyle: {
                        width: 0,
                      },
                    },
                  },
                  value: 100 - props.value, //动态传递
                  hoverAnimation: false,
                  itemStyle: {
                    color: "#3c3a48",
                  },
                },
              ],
            },
            {
              type: "pie",
              zlevel: 0,
              silent: true,
              radius: ["67%", "65.5%"],
              z: 1,
              label: {
                normal: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: Pie(),
            },
            {
              type: "pie",
              zlevel: 0,
              silent: true,
              startAngle: -150,
              radius: ["65%", "63.5%"],
              z: 1,
              label: {
                normal: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: Pie3(),
            },
            {
              type: "pie",
              zlevel: 0,
              silent: true,
              startAngle: -140,
              radius: ["68%", "66.5%"],
              z: 1,
              label: {
                normal: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: Pie(),
            },
            {
              type: "pie",
              zlevel: 0,
              silent: true,
              radius: ["61%", "60%"],
              z: 1,
              label: {
                normal: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: Pie1(),
            },
            {
              type: "pie",
              zlevel: 0,
              silent: true,
              startAngle: -140,
              radius: ["61%", "60%"],
              z: 1,
              label: {
                normal: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: Pie2(),
            },
            {
              type: "pie",
              zlevel: 0,
              silent: true,
              startAngle: -147.5,
              radius: ["61%", "60%"],
              z: 1,
              label: {
                normal: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: Pie2(),
            },
          ],
        };

        // 生成图表
        // Mychart.clear() 新数据进来先清空原数据在加载新数据开关选项
        // 使用刚指定的配置项和数据显示图表。
        Mychart.setOption(option);
        window.onresize = function () {
          Mychart.resize();
        };
      },
    };
    onMounted(() => {
      methods.markChart();
    });

    watch(
      props,
      (newVal) => {
        if (newVal) {
          methods.markChart(); //调用ECharts的方法重新绘制
        }
      },
      {
        // 被侦听的内容需要是函数的写法 () => stuInfo.friend
        deep: true,
      }
    );
    return { ...toRefs(state), ...methods, percent };
  },
};
</script>
 
<style scoped>
.pie {
  width: 100%;
  height: 100%;
}
</style>