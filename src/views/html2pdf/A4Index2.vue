<!--
 * @Descripttion: a4页边距和套红头测试
 * @Date: 2023-02-08 15:54:24
 * @LastEditTime: 2023-06-14 16:43:27
-->
<template>
  <div class="invitationLetter">
    <el-button type="primary" @click="createPdf">导出</el-button>
    <main id="meet-pdf-id" :class="{ pdf__output: isPdf }">
      <!-- 页头页眉 -->
      <div id="pdf-header" style="height: 3.8cm" class="pdf-hf"></div>
      <div id="pdf-footer" style="height: 3.5cm" class="pdf-hf"></div>
      <!-- 第一页页头页眉 -->
      <PdfHeader id="pdf-headerFirst" class="pdf-hf"></PdfHeader>
      <PdfFooter id="pdf-footerFirst" class="pdf-hf"></PdfFooter>

      <!-- 导出区域 -->
      <div class="main page page-one">
        <PdfHeader class="mb-20" v-if="!isPdf"></PdfHeader>
        <div class="page-inner">
          <h3 class="main__title">通达海2024年春节放假通知</h3>
          <p class="main__text mt-40">全体同仁:：</p>
          <p class="main__text text__indent pdf-group-item">
            根据《国务院办公厅关于2024年部分节假日安排的通知》，结合公司实际情况，为使全体员工度过一个欢乐、祥和、平安的新春佳节，现将2024年春节放假安拌通知如下。
          </p>
          <p class="main__text text__indent pdf-group-item">
            1、放假日期:2024年2月9日至2月18日放假调休，共10天，2月4日(周日)、2月19日(周一)上班。
          </p>
          <p class="main__text text__indent mt-40 pdf-group-item">
            2、各部门做好节前安全检査工作，对所属办公室、办公区域进行防火、断电等安全检査;关好门窗，确保办公区、办公设备安全。
          </p>
          <p class="main__text text__indent pdf-group-item">
            3、春节假期出行请注意人身、钱物安全。
          </p>
          <p class="main__text text__indent pdf-group-item">
            预祝全体同仁新春愉快、阖家欢乐、万事如意!
          </p>
          <div class="main__footer mt-100 pdf-group-item">
            <div class="flex-column-center">
              <p class="main__text">办公室</p>
              <p class="main__text">2024年1月16日</p>
            </div>
          </div>
        </div>
        <PdfFooter class="mt-20" v-if="!isPdf"></PdfFooter>
      </div>

      <!-- 分页 -->
      <div class="page-split mt-40" v-show="!isPdf"></div>

      <!-- 第二页 pdf-split-page强制分页 -->
      <div class="main page pdf-split-page">
        <h3 class="main__title w-600 pdf-group-item">国务院办公厅关于2024年部分节假日安排的通知</h3>
        <p class="main__text lh-40 pdf-group-item">
          <span class="w-600">时间：</span>
          <span>2024年-1-1至2025年1-1</span>
        </p>

        <div class="main__text lh-40 mt-100">
          <span class="w-600 pdf-group-item">各省、自治区、直辖市人民政府，国务院各部委、各直属机构：</span>
          <p class="main__text text__indent pdf-group-item">
            经国务院批准，现将2024年元旦、春节、清明节、劳动节、端午节、中秋节和国庆节放假调休日期的具体安排通知如下。
          </p>
          <p class="main__text text__indent pdf-group-item">
            一、元旦：1月1日放假，与周末连休。
          </p>
          <p class="main__text text__indent pdf-group-item">
            二、春节：2月10日至17日放假调休，共8天。2月4日（星期日）、2月18日（星期日）上班。鼓励各单位结合带薪年休假等制度落实，安排职工在除夕（2月9日）休息。
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { Html2Pdf } from "@modules"
import PdfHeader from "@/components/Pdf/pdfHeader.vue"
import PdfFooter from "@/components/Pdf/pdfFooter.vue"

export default {
  name: "invitationLetter",
  components: {
    PdfHeader,
    PdfFooter
  },

  data() {
    return {
      // pdf名称
      pdfName: "导出的.pdf",
      isPdf: false // 是否生成pdf中
    }
  },

  created() {},

  methods: {
    // 生成pdf文件
    async createPdf() {
      return new Promise(async (resolve, reject) => {
        this.isPdf = true
        await this.$nextTick()
        const pdfFooter = document.getElementById("pdf-footer")
        const pdfHeader = document.getElementById("pdf-header")
        const pdfFooterFirst = document.getElementById("pdf-footerFirst")
        const pdfHeaderFirst = document.getElementById("pdf-headerFirst")
        setTimeout(() => {
          let pdfDom = document.getElementById("meet-pdf-id")
          let pdfObj = new Html2Pdf(pdfDom, {
            fileName: this.pdfName,
            // outputType: "file",
            footer: pdfFooter,
            header: pdfHeader,
            headerFirst: pdfHeaderFirst,
            footerFirst: pdfFooterFirst,
            baseY: 0,
            contentWidth: 595
          })
          pdfObj
            .getPdf()
            .then(async (res) => {
              this.isPdf = false
              resolve(res)
            })
            .catch((error) => {
              this.isPdf = false
              reject(error)
            })
        })
      }, 500)
    }
  }
}
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
    // width: 297mm;
    width: 210mm;
    margin: 0 auto;
    .main__title {
      color: #000;
      font-size: 29px;
      width: 97%;
      margin: 0 auto;
      font-weight: 500;
      text-align: center;
      line-height: 40px;
      font-family: "Times New Roman", "方正小标宋简体";
    }
    .main__text {
      color: #000;
      font-weight: 500;
      line-height: 34px;
      text-align: left;
      font-size: 21px;
      font-family: "Times New Roman", "仿宋_GB2312";
    }

    .main__footer {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
    }
  }
}

// 公共类，
.flex-start {
  display: flex;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.w-500 {
  font-weight: 500;
}
.w-600 {
  font-weight: 600;
}
.text__indent {
  text-indent: 2em;
}
.mt-40 {
  margin-top: 40px;
}
.mt-80 {
  margin-top: 80px;
}
.mt-30 {
  margin-top: 30px;
}
.mt-20 {
  margin-top: 20px;
}
.mb-40 {
  margin-bottom: 40px;
}
.mb-30 {
  margin-bottom: 30px;
}
.mb-20 {
  margin-bottom: 20px;
}
.mt-100 {
  margin-top: 80px;
}
.lh-40 {
  line-height: 40px !important;
}

// a4大小 竖向
.page {
  min-height: 297mm;
  /* width: 210mm; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 3.8cm 2.6cm 3.5cm; /* 国家标准公文页边距 GB/T 9704-2012 */
  .page-inner {
    min-height: calc(297mm - 73mm);
  }
}

#meet-pdf-id {
  width: 210mm;
  margin: 0 auto;
}

// 第一页
.page-one {
  padding-top: 0;
  padding-bottom: 0;
  .pdf__header,
  .pdf__footer {
    padding: 0;
  }
}
.pdf-hf {
  position: fixed;
  top: -100vh;
  width: 210mm;
}
.pdf__output {
  .page {
    padding: 0 2.6cm;
  }
}
</style>
@/core/Html2Pdf@/html2canvas2jspdf
