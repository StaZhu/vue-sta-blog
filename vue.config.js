module.exports = {
  outputDir: 'dist',
  filenameHashing: false,
  pages: {
    console: {
      entry: 'src/pages/console/main.js',
      template: 'public/console.html',
      filename: 'console.html',
      title: 'Sta | Console',
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    blog: {
      entry: 'src/pages/blog/main.js',
      template: 'public/blog.html',
      filename: 'blog.html',
      title: 'Sta | Blog',
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
    extract: true,
    sourceMap: false
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
  },
  pwa: {
    name: 'Sta | Blog',
    themeColor: '#fff',
    msTileColor: '#fff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      swDest: 'service-worker.js',
      importWorkboxFrom: 'local',
      importsDirectory: 'js/wb-assets',
      include: [/\.html$/, /\.js$/,  /\.css$/],
      precacheManifestFilename: 'prefetch-manifest.[manifestHash].js',
      offlineGoogleAnalytics: false
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-180x180.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
}
