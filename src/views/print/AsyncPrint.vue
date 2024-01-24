<template>
  <div id="app">
    <h3 style="text-align: left; margin-left: 30px">支持的打印方式:</h3>
    <el-divider><i class="el-icon-printer"></i></el-divider>
    <el-button type="primary" icon="el-icon-printer" @click="handlePrint">
      点击打印：将在{{ times }} 秒后打印
    </el-button>
    <el-divider><i class="el-icon-printer"></i></el-divider>
    <div id="PrintContent">
      <ElFormDemo></ElFormDemo>
    </div>
  </div>
</template>
<style type="text/css">
p {
  color: blue;
}
</style>
<script>
import * as echarts from "echarts"
import { Print } from "@modules"
import ElFormDemo from "@/components/ElFormDemo.vue"
import ImageComponent from "@/components/ImageComponent.vue"
import RichText from "@/components/richText.vue"
import EleTable from "@/components/EleTable.vue"
import ChartComponent from "@/components/echartComponent.vue"
import pdfWord from "@/components/pdfWord.vue"
import QrcodeDemo from "@/components/QrcodeDemo.vue"
export default {
  name: "app",
  components: {
    ElFormDemo,
    ImageComponent,
    RichText,
    pdfWord,
    EleTable,
    ChartComponent,
    QrcodeDemo
  },
  data() {
    return {
      times: 5
    }
  },
  methods: {
    handlePrint() {
      this.$nextTick(() => {
        new Print({
          // url:
          //   process.env.NODE_ENV === "production"
          //     ? "https://power-kxlee.github.io/"
          //     : "http://localhost:8082/",
          asyncUrl: (reslove) => {
            const _set = setInterval(() => {
              this.times = this.times - 1
            }, 1000)
            setTimeout(() => {
              reslove(
                process.env.NODE_ENV === "production"
                  ? "https://power-kxlee.github.io/"
                  : "http://localhost:8082/"
              )
              clearInterval(_set)
            }, 5000)
          },
          preview: true,
          previewTitle: "Test Title",
          previewPrintBtnLabel: "Print",
          previewBeforeOpenCallback: this.previewBeforeOpenCallback,
          previewOpenCallback: this.previewOpenCallback,
          beforeOpenCallback: this.beforeOpenCallback,
          openCallback: this.openCallback,
          closeCallback: this.closeCallback,
          clickMounted: this.clickMounted
        })
      })
    },
    clickMounted() {
      console.log("点击按钮的回调事件")
    },
    previewBeforeOpenCallback() {
      console.log("正在加载预览窗口")
    },
    previewOpenCallback() {
      console.log("已经加载完预览窗口")
    },
    beforeOpenCallback() {
      console.log("正在准备打印控件")
    },
    openCallback() {
      console.log("已经打开了 打印控件")
    },
    closeCallback() {
      console.log("关闭了打印工具")
    },
    beforeOpen() {
      console.log("准备打开")
    },
    echart() {
      let myChart = echarts.init(this.$refs.echartMain)
      myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .box-card {
    margin-top: 10px;
  }
}
[class*="loader-"] {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}
.loader-04 {
  border: 1px solid currentcolor;
  border-radius: 50%;
  -webkit-animation: 1s loader-04 linear infinite;
  animation: 1s loader-04 linear infinite;
  position: relative;
}
.loader-04:before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  top: -0.2em;
  left: 50%;
  border: 0.2em solid currentcolor;
  border-radius: 50%;
}
@-webkit-keyframes loader-04 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loader-04 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
