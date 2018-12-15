const http = require('http')
const url = require('url')
const path = require('path')

// 初始化微信Token获取服务
const wxToken = require('./wxToken')
const appID = 'wx5ee1858d40d335c0'
const appSecret = '762e2c4a6cc1f21be4bc877b68871953'
wxToken.init(appID, appSecret)

// 初始化文章列表服务
const articleList = require('./articleList')
const pathArticleDir = path.resolve(__dirname, '../dist/docs')
articleList.init(pathArticleDir)

// 初始化图片列表服务
const photoList = require('./photoList')
const pathPhotoDir = path.resolve(__dirname, '../dist/img/photo')
photoList.init(pathPhotoDir)

// 创建web服务器
const server = http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' })
  const query = url.parse(request.url, true).query
  if (url.parse(request.url).pathname === '/api/weixin/authorizations') {
    const result = wxToken.getResult(query.url)
    response.end(JSON.stringify(result, null, 2))
  } else if (url.parse(request.url).pathname === '/api/article/lists') {
    const result = articleList.getResult()
    response.end(JSON.stringify(result, null, 2))
  } else if (url.parse(request.url).pathname === '/api/photo/lists') {
    const result = photoList.getResult()
    response.end(JSON.stringify(result, null, 2))
  } else {
    response.end(JSON.stringify({ errmsg: 'URL请求无效' }))
  }
}).listen(9703)

console.log('服务器正在 \'localhost:9703\' 运行')
