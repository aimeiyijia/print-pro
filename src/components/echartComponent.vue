<template>
  <div class="charts">
    <h2>echarts图形，加上itemName类名pdf-group-item，里面元素不需要遍历，深度终点</h2>
    <div ref="chart" class="chart-item pdf-group-item"></div>
    <div ref="chart1" class="chart-item chart1 pdf-group-item"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-liquidfill";
export default {
  name: "VuePdf2EchartComponent",

  data() {
    return {
      myChart: null,
      myChart1: null,
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const chart = this.$refs.chart;
      const chart1 = this.$refs.chart1;
      this.myChart = echarts.init(chart);
      this.myChart1 = echarts.init(chart1);
      this.setChart()
      this.setChart1()
    },

    setChart() {
      var option = {
        series: [
          {
            type: "liquidFill",
            data: [0.6, 0.55, 0.4, 0.25],
            radius: "80%",
            outline: {
              show: false,
            },
            backgroundStyle: {
              borderColor: "#156ACF",
              borderWidth: 1,
              shadowColor: "rgba(0, 0, 0, 0.4)",
              shadowBlur: 20,
            },
            shape:
              "path://M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z",
            label: {
              position: ["38%", "40%"],
              formatter: function () {
                return "皮皮糖";
              },
              fontSize: 40,
              color: "#D94854",
            },
            grid: {
              let: 0,
              top: 0,
              // right:0,
              bottom: 0,
            },
          },
        ],
      };
      this.myChart.setOption(option);
    },

    setChart1() {
      let option = {
        series: [
          {
            type: "liquidFill",
            data: [0.5, 0.4, 0.3, 0.2],
            shape: "container",
            outline: {
              show: false,
            },
          },
        ],
      };
      this.myChart1.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.charts {
    padding: 20px 0;
  .chart-item {
    width: 400px;
    height: 400px;
    margin: 0 auto;
  }

  .chart1 {
    width: 100%;
  }
}
</style>