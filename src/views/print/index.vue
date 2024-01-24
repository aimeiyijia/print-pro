<template>
  <div id="app">
    <div id="loading"></div>

    <h3 style="text-align: left; margin-left: 30px">支持的打印方式:</h3>
    <el-divider><i class="el-icon-printer"></i></el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-printer" v-print
          >全局打印</el-button
        >
        <el-card class="box-card"> 对当前页面全部进行打印 </el-card>
      </el-col>
    </el-row>
    <el-divider><i class="el-icon-printer"></i></el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-button
          type="primary"
          icon="el-icon-magic-stick"
          v-print="'#tableList'"
          >局部打印(快速)</el-button
        >
        <el-card class="box-card">
          可以打印页面某部分内容，直接传入对应的唯一标识ID
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-umbrella" v-print="printObj"
          >局部打印(对象配置)</el-button
        >
        <el-card class="box-card">
          也许你会需要一些配置，可接收一个对象，根据文档API进行设置
        </el-card>
      </el-col>
    </el-row>
    <el-divider><i class="el-icon-printer"></i></el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-bank-card" v-print="printUrl"
          >预览网址</el-button
        >
        <el-card class="box-card">
          我需要打印指定的网址(要符合同源策略)
          需要传入一个对象，详细看文档API进行设置
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-wallet" v-print="printAsyncUrl"
          >预览网址(异步)</el-button
        >
        <el-card class="box-card">
          你打印的网址(URL)也是可以通过异步得到的
        </el-card>
        异步获取URL:<el-progress
          :text-inside="true"
          :stroke-width="20"
          :percentage="times"
        ></el-progress>
      </el-col>
    </el-row>
    <el-table id="tableList" :data="tableData" style="width: 100%">
      <el-table-column prop="date" fixed label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input
            type="textarea"
            maxlength="600"
            show-word-limit
            v-model="form.desc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-divider><i class="el-icon-printer"></i></el-divider>
      <div class="asyncTips"></div>
      <div class="box" v-show="printLoading">
        <div class="loader-04"></div>
        正在处理...请稍等
      </div>
      <h3 style="text-align: left; margin-left: 30px">下面是被打印的例子:</h3>

      <div id="printMe" style="background: #dac9c9">
        <div ref="qrcode"></div>
        <div
          ref="echartMain"
          :style="{ width: '300px', height: '300px' }"
        ></div>
        <input type="number" />
        <input type="time" />
        <input type="checkbox" />
        <input type="radio" />
        <select>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>

        <select>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <p>葫芦娃，葫芦娃</p>
        <p style="background: yellow">一根藤上七朵花</p>
        <p>小小树藤是我家 啦啦啦啦</p>
        <p>叮当当咚咚当当 浇不大</p>
        <p>叮当当咚咚当当 是我家</p>
        <p>啦啦啦啦</p>
        <p>...</p>
      </div>
      <p>叮当当咚咚当当 浇不大</p>
    </div>
  </div>
</template>
<style type="text/css">
p {
  color: blue;
}
</style>
<script>
import QRCode from "qrcodejs2"
import * as echarts from "echarts"
export default {
  name: "app",
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
      printAsyncUrl: {
        preview: true,
        previewTitle: "Test Title",
        previewPrintBtnLabel: "Print",
        asyncUrl(reslove, vue) {
          const _set = setInterval(() => {
            vue.times += 20
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
        previewBeforeOpenCallback: this.previewBeforeOpenCallback,
        previewOpenCallback: this.previewOpenCallback,
        beforeOpenCallback: this.beforeOpenCallback,
        openCallback: this.openCallback,
        closeCallback: this.closeCallback,
        clickMounted: this.clickMounted
      },
      printUrl: {
        url:
          process.env.NODE_ENV === "production"
            ? "https://power-kxlee.github.io/"
            : "http://localhost:8082/",
        preview: true,
        previewTitle: "Test Title",
        previewPrintBtnLabel: "Print",
        previewBeforeOpenCallback: this.previewBeforeOpenCallback,
        previewOpenCallback: this.previewOpenCallback,
        beforeOpenCallback: this.beforeOpenCallback,
        openCallback: this.openCallback,
        closeCallback: this.closeCallback,
        clickMounted: this.clickMounted
      },
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
  mounted() {
    this.$nextTick(() => {
      this.echart()
      new QRCode(this.$refs.qrcode, {
        width: 100,
        height: 100,
        text: "https://www.baidu.com/"
      })
    })
  },
  methods: {
    clickMounted(vue) {
      vue.$notify({
        title: "消息",
        message: "点击按钮的回调事件"
      })
    },
    previewBeforeOpenCallback(vue) {
      vue.$notify({
        title: "消息",
        message: "正在加载预览窗口"
      })
    },
    previewOpenCallback(vue) {
      vue.times = 0
      vue.$notify({
        title: "消息",
        message: "已经加载完预览窗口",
        type: "success"
      })
    },
    beforeOpenCallback(vue) {
      vue.printLoading = true
      vue.$notify({
        title: "消息",
        message: "正在准备打印控件"
      })
    },
    openCallback(vue) {
      vue.printLoading = false
      vue.$notify({
        title: "消息",
        message: "已经打开了 打印控件"
      })
    },
    closeCallback(vue) {
      vue.$notify({
        title: "消息",
        message: "关闭了打印工具"
      })
    },
    beforeOpen() {
      this.printLoading = true
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
@media print {
  @page {
    size: auto;
  }
  *,
  *::before,
  *::after {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    print-color-adjust: exact;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
  body::-webkit-scrollbar {
    display: none;
  }
  body {
    -ms-overflow-style: none;
  }
  html {
    overflow: -moz-hidden-unscrollable; /*注意！若只打 hidden，chrome 的其它 hidden 会出问题*/
    height: 100%;
  }
}
#app::v-deep {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 800px;
  margin: 0 auto;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .box-card {
      margin-top: 10px;
    }
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
