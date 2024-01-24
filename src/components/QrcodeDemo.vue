<template>
  <div ref="qrcode"></div>
</template>

<script>
import QRCode from "qrcodejs2"
export default {
  mounted() {
    this.$nextTick(() => {
      new QRCode(this.$refs.qrcode, {
        width: 100,
        height: 100,
        text: "https://www.baidu.com/"
      })
    })
  }
}
</script>

<style lang="scss" scoped></style>
