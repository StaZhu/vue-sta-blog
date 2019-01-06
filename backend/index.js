const http = require('http')
const url = require('url')
const path = require('path')
const querystring = require('querystring')

// 初始化微信Token获取服务
const wxToken = require('./src/wxToken')
const appID = 'wx5ee1858d40d335c0'
const appSecret = '762e2c4a6cc1f21be4bc877b68871953'
wxToken.init(appID, appSecret)

// 初始化文章列表服务
const articleList = require('./src/articleList')
const pathArticleDir = path.resolve(__dirname, '../dist/docs')
articleList.init(pathArticleDir)

// 初始化图片列表服务
const photoList = require('./src/photoList')
const pathPhotoDir = path.resolve(__dirname, '../dist/img/photo')
photoList.init(pathPhotoDir)

// 初始化评论数据库服务
const commentList = require('./src/commentList')

// 创建web服务器
http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': 'http://localhost' })

  const query = url.parse(request.url, true).query
  const method = request.method
  const cookie = request.headers.cookie

  if (url.parse(request.url).pathname === '/api/weixin/authorizations') {
    if (method === 'GET') {
      const result = wxToken.getResult(query.url)
      response.end(JSON.stringify(result, null, 2))
    } else {
      response.end(JSON.stringify({ errmsg: '请求方法错误' }))
    }
  }

  if (url.parse(request.url).pathname === '/api/article/lists') {
    if (method === 'GET') {
      const result = articleList.getResult()
      response.end(JSON.stringify(result, null, 2))
    } else {
      response.end(JSON.stringify({ errmsg: '请求方法错误' }))
    }
  }

  if (url.parse(request.url).pathname === '/api/photo/lists') {
    if (method === 'GET') {
      const result = photoList.getResult()
      response.end(JSON.stringify(result, null, 2))
    } else {
      response.end(JSON.stringify({ errmsg: '请求方法错误' }))
    }
  }

  if (url.parse(request.url).pathname === '/api/article/comment/lists') {
    if (method === 'POST') {
      let body = ''
      request.on('data', (chunk) => {
        body += chunk
      })
      request.on('end', function () {
        body = querystring.parse(body)
        const newBody = {
          comment_ID: body.id,
          comment_post_ID: body.postID,
          comment_author: body.author,
          comment_author_email: body.email,
          comment_author_IP: request.headers.host,
          comment_date_timezone: body.timezone,
          comment_content: body.comment,
          comment_agent: request.headers['user-agent'],
          comment_parent: body.parent
        }
        const result = commentList.set(newBody)
        response.end(JSON.stringify(result, null, 2))
      })
    } else if (method === 'GET') {
      const result = commentList.get(query.ID)
      response.end(JSON.stringify(result, null, 2))
    } else {
      response.end(JSON.stringify({ errmsg: '请求方法错误' }))
    }
  }

  if (url.parse(request.url).pathname === '/api/article/uploads') {
    if (method === 'POST') {
      if (cookie.includes('ACCESS_TOKEN') && cookie.match(/ACCESS_TOKEN=(\d*);/)[1] === '1539609627264') {
        // const result = articleUpload.set(request.body)
        // response.end(JSON.stringify(result, null, 2))
      } else {
        response.end(JSON.stringify({ errmsg: '权限错误' }))
      }
    } else {
      response.end(JSON.stringify({ errmsg: '请求方法错误' }))
    }
  }

  response.end(JSON.stringify({ errmsg: 'URL请求无效' }))
}).listen(9703)

console.log('服务器正在 \'localhost:9703\' 运行')
