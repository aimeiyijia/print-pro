const path = require("path")
function resolve(dir) {
  return path.join(__dirname, dir)
}
const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@modules": resolve("modules")
      }
    }
  }
})
