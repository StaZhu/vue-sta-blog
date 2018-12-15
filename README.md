# vue-sta-blog

### 演示地址

https://www.stazhu.com

### 介绍

个人Blog

### 开启后端服务

```bash
cd ./backend
npm install
npm run serve
```

### 开启前端预览

```bash
npm install
npm run serve
```

### 本地部署构建

```bash
npm run build
```

### 本地部署Nginx

```nginx
server {
        listen       80;     
        server_name  localhost;
        root   /Users/sta/Desktop/vue-sta-blog/dist;
        index  blog.html;
     
        location /api/authorizations {
            proxy_pass https://easy-mock.com/mock/5ba636e28c38302a9b1a668b/api/authorizations;
        }
 
        location /api/info {
            proxy_pass https://easy-mock.com/mock/5ba636e28c38302a9b1a668b/api/info;
        }

        location /api {
            proxy_pass http://localhost:9703/api;
        }

        location /console {
            try_files $uri $uri/ /console.html;
        }

        location /login {
            try_files $uri $uri/ /console.html;
        }
    
        location / {
            try_files $uri $uri/ /blog.html;
        }
}
```

### 预览

## *Home*

![Home](https://www.stazhu.com/docs/Vue-Blog/Home.jpg)

![Home-Mobile](https://www.stazhu.com/docs/Vue-Blog/Home-Mobile.jpg)

## *Photo*

![Photo](https://www.stazhu.com/docs/Vue-Blog/Photo.jpg)

![Photo-Mobile](https://www.stazhu.com/docs/Vue-Blog/Photo-Mobile.jpg)

## *Article*

![Article](https://www.stazhu.com/docs/Vue-Blog/Article.jpg)

![Article-Mobile](https://www.stazhu.com/docs/Vue-Blog/Article-Mobile.jpg)

### 许可证

 GPL General Public License 3.0 see <http://www.gnu.org/licenses/gpl-3.0.html>