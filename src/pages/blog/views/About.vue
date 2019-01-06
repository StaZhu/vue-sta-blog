<template>
  <main class="about-main main">
    <div class="about-main-wrapper" :class="{ expanded: isExpanded }">
      <div id="about-me">
        <div id="about-sta-first-impression">
          <img src="../assets/images/Sta.jpg" srcset="../assets/images/Sta@2x.jpg 1024w"  alt="Sta Zhu" id="about-sta-photo">
          <div id="about-sta-introduction">
            <h1>
              朱思达
            </h1>
            <p>
              出生于 1995 年，家乡来自辽宁沈阳，热爱摄影，追求完美，极简主义，喜欢挑战。
            </p>
          </div>
        </div>
        <div id="about-sta-projects" class="about-block">
          <h1>项目</h1>
          <h5>stazhu.com - 基于Vue的响应式多页静态个人网站</h5>
          <p>
            GitHub：<a href="https://github.com/StaZhu/vue-sta-blog" target="_blank" rel="noreferrer noopener">https://github.com/StaZhu/vue-sta-blog</a>
          </p>
          <p>
            网站分为前台页面和后台管理页面。
          </p>
          <p>
            前台页面UI为纯CSS实现，并Vue-Router实现懒加载，同时开启History模式，完成五个页面
            <a href="/" target="_blank" rel="noreferrer noopener">Home</a>,
            <a href="/article/formatting-context-and-block-formatting-context" target="_blank" rel="noreferrer noopener">Article</a>,
            <a href="/photo" target="_blank" rel="noreferrer noopener">Photo</a>,
            <a href="/about" target="_blank" rel="noreferrer noopener">About</a>,
            <a href="/contact" target="_blank" rel="noreferrer noopener">Contact</a>
            的路由。Article页面目前已经实现的功能有列表与文章获取，未来计划使用数据库实现评论功能。Photo目前实现了响应式图片以及懒加载，未来计划有完善的图片预览。
          </p>
          <p>
            前端部分，主要设计思路是利用媒体查询等CSS3新特性和Vue的数据绑定与Vue单文件组件，实现页面模块化，响应式移动端适配设计设计。
            插件部分，使用NProgress完成进度条的绘制，Marked完成Markdown文件解析，Hightlight.js完成代码高亮，Js-Weixin完成前台微信接口调用，Axios进行XHR完成异步数据获取与元数据获取。
            图片和个人Logo使用Photoshop和Illustrator完成位图和SVG的绘制（Contact应用程序Logo来自网络）。
          <p>
            后端部分，无数据库，直接使用NodeJS按照Restful API形式完成了三个接口的编写。
            分别为Article提供文章列表获取，为Photo提供图片获取，为微信API的使用提供JsApiTicket缓存。
            自动监控服务器磁盘变更，日常使用只需上传jpg或者md文件即可自动更新。
          </p>
          <p>
            后台页面UI使用Element-UI实现，基于<a href="https://github.com/PanJiaChen/vue-admin-template" target="_blank" rel="noreferrer noopener">vue-template-admin</a>
            重写。登录部分编写easy-mock，以模拟Restful API进行密码验证，Token生成，和用户信息获取，VueX完成状态记录,
            Cookie完成侧栏状态，Token记录，侧栏和BreadCrumb使用Vue-Router遍历路由自动生成，具体功能等正在搭建中...
          </p>
          <h5>ddns-aliyun - 基于PHP，阿里云API的动态域名服务程序</h5>
          <p>项目地址：<a href="https://github.com/StaZhu/ddns-aliyun" target="_blank" rel="noreferrer noopener">https://github.com/StaZhu/ddns-aliyun</a></p>
          <p>
            适用于macOS,OpenWrt下，PPPoE拨号获取到的局域网ip自动映射到域名。
          </p>
          <h5>porsta - 基于PHP的端口扫描器</h5>
          <p>项目地址：<a href="https://github.com/StaZhu/porsta" target="_blank" rel="noreferrer noopener">https://github.com/StaZhu/porsta</a>
          <p>
            用于扫描某IP或某IP段下各端口的开启情况。<br>
          </p>
        </div>
         <div id="about-sta-experiences" class="about-block">
          <h1>经历</h1>
          <h5>
            2013-2017 西安电子科技大学
          </h5>
          <p>
            大学四年，主修微电子科学与工程专业。修读了C语言，电路原理，数字电路，数字集成电路设计，模拟集成电路设计等电子类专业课。考取了四六级证书和计算机二级证书。
          </p>
          <p>
            大学前三年，担任<a href="http://image.xidian.edu.cn/index/xsjzt.htm" target="_blank" rel="noreferrer noopener">714影像工作室</a>技术负责人，
            作为摄影师，和团队一起拍摄了毕业季<a href="https://v.qq.com/x/page/g0306mdfo1h.html" target="_blank" rel="noreferrer noopener">微电影《时间之间》</a>，搭建工作室影棚，黑苹果系统等。
            自学Photoshop并参加了全国计算机设计大赛，投稿作品《手心的向往》获得金奖。
            参加创青春创新创业大赛<a href="https://www.yeeloc.com/U.html" target="_blank" rel="noreferrer noopener">"易锁宝U型锁”项目</a>获得金奖，完成了人生首部<a href="https://v.qq.com/x/page/n0332zzpgy4.html" target="_blank" rel="noreferrer noopener">商业广告</a>拍摄。
            参加校内星火杯电子设计比赛作品《红外导航车》获得银奖，数学建模比赛获得银奖等。
          </p>
          <p>
            大四保研，参与毕业季<a href="https://v.qq.com/x/page/k0510cs4zwy.html" target="_blank" rel="noreferrer noopener">微电影《致自己》</a>，完成了毕业设计，结束了美满的大学生活。
          </p>
          <h5>
            2017-2020 西安电子科技大学
          </h5>
          <p>
            目前就读研究生二年级，主修电子科学与技术专业。修读了数值分析，工程优化方法，现代机器学习理论，计算机网络，数字图像处理等课程。
          </p>
          <p>
            研究生期间，搭建了个人网站：<a href="https://www.stazhu.com" target="_blank" rel="noreferrer noopener"><em>https://www.stazhu.com</em></a>。
            制作Roboterra少年机器人教学影片，<a href="http://www.mymax.cn/website/index" target="_blank" rel="noreferrer noopener">满满学院App宣传片</a>以及一些<a href="https://720yun.com/t/e4cjt7ykvv5" target="_blank" rel="noreferrer noopener">720VR全景项目</a>等。
          </p>
        </div>
        <div id="about-sta-skills" class="about-block">
          <h1>技能</h1>
          <p>
            掌握基本前端技能HTML,CSS,ES。有后端技能NodeJS和PHP的开发经验。
            熟练掌握Photoshop，Premiere等媒体工具。
          </p>
          <p>
            Vue,VueX,Vue-Router,Vue-CLI,Element-UI,Axios,JS-Cookie,Mock等前端工具的开发经验。
          </p>
          <p>
            SCSS,ESLint,Npm,Git等工具的使用经验，Nginx,PHP,MySQL的服务器配置管理经验。
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  </main>
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
  name: 'About',
  components: {
    Footer
  },
  computed: {
    isExpanded () {
      return this.$store.state.isExpanded
    }
  },
  mounted () {
    document.title = 'Sta | ' + this.$route.name
  }
}
</script>

<style lang="scss">
$background-color: #f2f2f2;

.about-main {
  font-size: 0.25rem;
  font-family: "STHeiti","SimHei";
  a {
    color: #677;
  }
  p {
    opacity: 0.7;
    text-indent: 2em;
    margin: 0;
  }
}

.about-main-wrapper {
  padding-top: 0.8rem;
  background-color: $background-color;
}

.about-block {
  margin: 4vw 4vw;
  flex: 1 1 auto;
  padding: 5vw;
  h1 {
    line-height: 1;
  }
  h5 {
    line-height: 1.5;
  }
  background-color: white;
  border-radius: 0.2rem;
}

#about-me {
  overflow: hidden;
  line-height: 2;
}

#about-sta-first-impression {
  margin: 4vw 4vw;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 1em;
  }
}

#about-sta-photo {
  flex: none;
  max-width: 80vw;
  width: 4.4rem;
  margin: 0rem;
}

#about-sta-introduction {
  width: 3.4rem;
  margin: 0 0.5rem;
  h1 {
    text-align: center;
    line-height: 1;
    margin: 0;
  }
  flex: none auto;
}

@media only screen and (max-width: 819px) {
  .about-main {
    font-size: 0.15rem;
  }
  .about-main-wrapper {
    transition: transform 0.5s;
    &.expanded {
      transform: translateX(70vw);
    }
  }
}
</style>
