<template>
  <div class="ctn">
    <el-button
      style="top: 10px; left: 240px; position: fixed; z-index: 999"
      @click="handleExport"
      size="mini"
      type="primary"
    >
      测试导出2
    </el-button>
    <div class="pdf-ctn" id="pdf-ctn">
      <!-- 要导出的部分 -->
      <div class="pdf-panel">
        <div class="pdf-inside-panel">
          <!-- 加上 class="pdf-group"代表该组件所有内容在一起 强制与其他组件分页 -->
          <ElFormDemo class="pdf-group"></ElFormDemo>
          <!-- <EleTable class="pdf-group"></EleTable> -->
          <!-- <ImageComponent class="pdf-group"></ImageComponent> -->
          <!-- <ChartComponent></ChartComponent> -->
          <!-- <RichText v-for="(item, index) in 2" :key="index + 20"></RichText> -->
          <!-- <RichText></RichText> -->
          <!-- <pdfWord></pdfWord> -->
        </div>
      </div>

      <!-- 页头页尾 -->
      <div
        class="pdf-header"
        style="
          font-weight: bold;
          padding: 30px 8px;
          width: 1200px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.85);
          color: rgba(0, 0, 0, 0.85);
          position: fixed;
          top: -100vh;
        "
      >
        页头
      </div>
      <div
        class="pdf-footer"
        style="
          font-weight: bold;
          padding: 30px 8px;
          width: 100%;
          border-top: 1px solid rgba(0, 0, 0, 0.85);
          position: fixed;
          top: -100vh;
        "
      >
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 5px;
          "
        >
          我是页尾
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
          "
        >
          第
          <div class="pdf-footer-page"></div>
          页 / 共
          <div class="pdf-footer-page-count"></div>
          页
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui"
import ElFormDemo from "@/components/ElFormDemo.vue"
import ImageComponent from "@/components/ImageComponent.vue"
import RichText from "@/components/richText.vue"
import EleTable from "@/components/EleTable.vue"
import ChartComponent from "@/components/echartComponent.vue"
import pdfWord from "@/components/pdfWord.vue"

import { Html2Pdf, printJS } from "@modules"
export default {
  name: "HelloWorld",
  components: {
    ElFormDemo,
    ImageComponent,
    RichText,
    pdfWord,
    EleTable,
    ChartComponent
  },
  props: {
    msg: String
  },
  methods: {
    handleExport() {
      // printJS({
      //   printable: "pdf-ctn",
      //   type: "html",
      //   // 继承原来的所有样式
      //   style:
      //     "@page {size: auto; margin: 0mm; -webkit-print-color-adjust: exact; -moz-print-color-adjust: exact; color-adjust: exact};",
      //   scanStyles: true,
      //   css: ["https://unpkg.com/element-ui/lib/theme-chalk/index.css"],
      //   targetStyles: ["*"],
      //   header: "PrintJS - Form Element Selection"
      // })
      const loading = this.$loading({
        lock: true,
        text: "导出中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      })

      const element = document.querySelector(".pdf-panel")
      const header = document.querySelector(".pdf-header")
      const footer = document.querySelector(".pdf-footer")

      const html2Pdf = new Html2Pdf(element, {
        footer: footer,
        header: header,
        outputType: "print",
        fileName: "自定义名字",
        direction: "v",
        message: true
      })
      console.log(html2Pdf, "html2Pdf----")
      html2Pdf.on("exporting", (e) => {
        const { pages, currentPage } = e.data
        Message.success(`共${pages.length}页， 生成第${currentPage}页`)
      })
      html2Pdf.getPdf().then((res) => {
        console.log("[ 导出成功] >", res)
        loading.close()
        this.$message.success("导出成功")
      })
    }
  }
}
</script>

<style scoped lang="scss">
.ctn {
  padding: 10px;
  .pdf-ctn {
    margin: 0 auto;
    .pdf-panel {
      position: relative;
    }
  }
}
</style>
