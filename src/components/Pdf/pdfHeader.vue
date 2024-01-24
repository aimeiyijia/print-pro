<template>
  <header class="pdf__header">
    <div class="info">
      <slot>
        <span>通达海</span>
      </slot>
    </div>
    <div class="line line_b"></div>
    <div class="line"></div>
  </header>
</template>

<script>
export default {
  name: "PdfFooter",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.pdf__header {
  color: red;
  height: 3.8cm;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 2.6cm;
  padding-bottom: 10px;

  .line {
    height: 3px;
    margin-top: 5px;
    background: red;
  }
  .line_b {
    height: 7px;
  }

  .info {
    display: flex;
    justify-content: center;
    font-size: 55px;
    font-family: "宋体";
    letter-spacing: 24px;
    font-weight: 600;
    margin-bottom: 5px;
  }
}
</style>
