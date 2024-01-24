<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activeMenuIndex" @select="handleMenuSelect">
          <el-submenu index="11">
            <template slot="title">
              <span>Html2Pdf</span>
            </template>
            <el-menu-item index="1">
              <span slot="title">常规导出</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">A4标准页边距</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">A4标准页边距和套红头</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="22">
            <template slot="title">
              <span>Print</span>
            </template>
            <el-menu-item index="5">
              <span slot="title">全局/局部打印</span>
            </el-menu-item>
            <el-menu-item index="6">
              <span slot="title">预览 导出</span>
            </el-menu-item>
            <el-menu-item index="7">
              <span slot="title">url/异步url导出</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <OutPdf v-if="activeMenuIndex === '1'"></OutPdf>
        <A4Index v-if="activeMenuIndex === '2'"></A4Index>
        <A4Index2 v-if="activeMenuIndex === '3'"></A4Index2>
        <A4Index3 v-if="activeMenuIndex === '4'"></A4Index3>
        <BodyPrint v-if="activeMenuIndex === '5'"></BodyPrint>
        <PreviewPrint v-if="activeMenuIndex === '6'"></PreviewPrint>
        <AsyncPrint v-if="activeMenuIndex === '7'"></AsyncPrint>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import OutPdf from "./views/html2pdf/index.vue"
import A4Index from "./views/html2pdf/A4Index.vue"
import A4Index2 from "./views/html2pdf/A4Index2.vue"
import A4Index3 from "./views/html2pdf/A4Index3.vue"
import BodyPrint from "./views/print/BodyPrint.vue"
import PreviewPrint from "./views/print/PreviewPrint.vue"
import AsyncPrint from "./views/print/AsyncPrint.vue"
export default {
  name: "App",
  components: {
    OutPdf,
    A4Index,
    A4Index2,
    A4Index3,
    BodyPrint,
    PreviewPrint,
    AsyncPrint
  },
  data() {
    return {
      dialogVisible: true,
      activeMenuIndex: "5"
    }
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenuIndex = index
    }
  }
}
</script>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
}
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // margin-top: 60px;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}

.el-container {
  height: 100%;
  .el-aside {
    background-color: #f2f6fc;
  }
  .el-main {
    overflow: auto;
    height: 100%;
  }
}

.btn-group {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 3000;
}
</style>
