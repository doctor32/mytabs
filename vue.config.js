const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          prependData: ' @import "@/assets/scss/styles.scss"; '
        }
      }
    }
  }
}

