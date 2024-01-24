<template>
  <footer class="pdf__footer">
    <div class="line"></div>
    <div class="line line_b"></div>
    <div class="info">
      <slot>
        <span>通达海</span>
        <span>行政部</span>
      </slot>
    </div>
  </footer>
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
.pdf__footer {
  color: red;
  padding: 0 2.6cm;
  height: 3.5cm;
  padding-top: 10px;

  .line {
    height: 3px;
    margin-bottom: 5px;
    background: red;
  }
  .line_b {
    height: 7px;
  }

  .info {
    display: flex;
    justify-content: space-between;
    font-size: 21px;
    font-family: "宋体";
    font-weight: 600;
  }
}
</style>
