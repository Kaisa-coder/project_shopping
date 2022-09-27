const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    // 代理跨域
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  },
  // 打包不生成Map文件
  productionSourceMap: false
})
