<template>
  <div id="app">
    <h3 style="text-align: left; margin-left: 30px">支持的打印方式:</h3>
    <el-divider><i class="el-icon-printer"></i></el-divider>
    <el-button type="primary" icon="el-icon-printer" @click="handlePrint">
      打印
    </el-button>
    <el-divider><i class="el-icon-printer"></i></el-divider>
    <div id="PrintContent">
      <QrcodeDemo></QrcodeDemo>
      <ElFormDemo></ElFormDemo>
      <ImageComponent class="print-page-break"></ImageComponent>
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
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      printLoading: false,
      times: 0,
      printObj: {
        id: "printMe",
        popTitle: "good print",
        extraCss:
          "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
        beforeOpenCallback: this.beforeOpenCallback,
        openCallback: this.openCallback,
        closeCallback: this.closeCallback,
        clickMounted: this.clickMounted
      }
    }
  },
  methods: {
    handlePrint() {
      this.$nextTick(() => {
        new Print({
          // 支持传入文件id 或者直接传HtmlElement document.body
          element: "PrintContent",
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
