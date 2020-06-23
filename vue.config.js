module.exports = {
    devServer: {
        port: 8888,
    },
    lintOnSave: false,
    chainWebpack: config => {
        config.module
          .rule('md')
          .test(/\.md$/)
          .use('markdown-loader')
          .loader('markdown-loader')
          .loader('html-loader')
    }
}
