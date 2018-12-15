module.exports = {
  filenameHashing: false,
  pages: {
    console: {
      entry: 'src/pages/console/main.js',
      template: 'public/console.html',
      filename: 'console.html',
      title: 'Sta\'s Console',
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    blog: {
      entry: 'src/pages/blog/main.js',
      template: 'public/blog.html',
      filename: 'blog.html',
      title: 'Sta\'s Blog',
      // chunks: ['chunk-venders', 'chunk-common', 'index']
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'svg-[name]' })
  },
  css: {
    // extract: false
    // sourceMap: true
  },
  devServer: {
    open: true,
    proxy: {
      // 后台登录授权使用Mock
      '/api/authorizations': {
        target: 'https://easy-mock.com/mock/5ba636e28c38302a9b1a668b/api/authorizations',
        changeOrigin: true,
        pathRewrite: {
          '^/api/authorizations': '/'
        }
      },
      // 后台获取信息使用Mock
      '/api/info': {
        target: 'https://easy-mock.com/mock/5ba636e28c38302a9b1a668b/api/info',
        changeOrigin: true,
        pathRewrite: {
          '^/api/info': '/'
        }
      },
      // 前台信息获取使用nodejs编写的api
      '/api/*': {
        target: 'http://localhost:9703/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    historyApiFallback: {
      rewrites: [
        { from: /\/login/, to: '/console.html' },
        { from: /\/console\/*/, to: '/console.html' },
        { from: /\//, to: '/blog.html' }
      ]
    }
  }
}
