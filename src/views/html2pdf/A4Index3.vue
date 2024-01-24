<template>
  <div class="invitationLetter">
    <el-button type="primary" @click="createPdf">导出</el-button>
    <el-button type="primary" @click="getPdf">导出2</el-button>
    <main id="meet-pdf-id" class="main">
      <p>这是一个我自己的一个测试页面，直接忽略就行，只是方便我在不同地方拉代码，后面我会删除！！</p>

      <div class="box pdf-group-item" data-position="box">计算我位置</div>
    </main>

    <img :src="dataUrl" alt="" />
  </div>
</template>

<script>
import { Html2Pdf } from "@modules"
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  name: "invitationLetter",

  data() {
    return {
      // pdf名称
      pdfName: "导出的.pdf",
      isPdf: false, // 是否生成pdf中
      dataUrl: "",
    };
  },

  created() {},

  methods: {
    // 生成pdf文件
    async createPdf() {
      return new Promise(async (resolve, reject) => {
        this.isPdf = true;
        await this.$nextTick();
        setTimeout(() => {
          let pdfDom = document.getElementById("meet-pdf-id");
          let pdfObj = new Html2Pdf(pdfDom, {
            fileName: this.pdfName,
            baseY: 0,
            // outputType: "file",
            contentWidth: 595,
          });
          pdfObj
            .getPdf()
            .then(async (res) => {
              console.log("%c [ res ]-45", "font-size:13px; background:pink; color:#bf2c9f;", res);
              this.isPdf = false;
              resolve(res);
            })
            .catch((error) => {
              this.isPdf = false;
              reject(error);
            });
        });
      }, 500);
    },

    async getPdf() {
      let pdfDom = document.getElementById("meet-pdf-id");

      let canvas = await html2canvas(pdfDom, {
        allowTaint: true, // 允许渲染跨域图片
        scale: 2, // 增加清晰度
        useCORS: true, // 允许跨域
      });
      const canvasWidth = canvas.width;
      // 获取canvas转化后的高度
      const canvasHeight = canvas.height;
      console.log(" canvas.width", canvas.width);
      console.log(" canvas.width", canvas.height);
      const height = (595 / canvasWidth) * canvasHeight;
      console.log(" canvas.width", height);

      this.dataUrl = canvas.toDataURL();
    },
  },
};
</script>

<style lang="scss" scoped>
.invitationLetter {
  padding: 20px;
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0;
  }

  .main {
    border: 2px solid red;
    width: 400px;
    font-size: 20px;
    position: relative;
    height: 600px;

    .box {
      position: absolute;
      left: 200px;
      bottom: 100px;
      background: pink;
      width: 80px;
      height: 80px;
    }
  }
}
</style>
@/core/Html2Pdf@/html2canvas2jspdf