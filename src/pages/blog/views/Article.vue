<template>
  <main class="article-main main">
    <div class="article-page" :class="{ expanded: isExpanded }" @click="closeNavbar()">
      <div class="article-page-content markdown-body" :class="{ active: isArticleLoaded }" v-html="activeContent" v-highlight></div>
      <div class="article-page-content article-page-fake markdown-body" :class="{ active: !isArticleLoaded }">
        <h1></h1>
        <p class="date"></p>
        <p v-for="value in Array.from({ length: 100 }, (value, key) => key)" :key="value"></p>
      </div>
      <Footer/>
    </div>
    <div class="article-nav" :class="{ 'article-nav-toggle': isCollapsed, expanded: isExpanded }" @click="openNavbar()">
      <template v-for="year in years">
        <p :key="'p' + year" class="article-nav-year">{{ year }}</p>
        <ul :key="'ul' + year" class="article-nav-content">
          <li v-for="file in filesByYear(year)" :key="file.index" class="article-nav-item" :class="{ selected: file.name === activeName}" @click.stop="handleRoute(file)">
            {{ file.name }}
          </li>
        </ul>
      </template>
      <template v-for="value in Array.from({ length: 5 }, (value, key) => key)">
        <p :key="'p' + value" class="article-nav-year article-nav-fake" :class="{ active: !isListLoaded }"></p>
        <ul :key="'ul' + value" class="article-nav-content">
          <li v-for="value in Array.from({ length: 10 }, (value, key) => key)" :key="value" class="article-nav-item article-nav-fake" :class="{ active: !isListLoaded }"></li>
        </ul>
      </template>
    </div>
    <div class="article-blank" :class="{ expanded: isExpanded }"></div>
  </main>
</template>

<script>
import Footer from '../components/Footer.vue'
import marked from 'marked'
import axios from 'axios'
import highlight from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import php from 'highlight.js/lib/languages/php'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'
import 'highlight.js/styles/purebasic.css'
highlight.registerLanguage('javascript', javascript)
highlight.registerLanguage('sql', sql)
highlight.registerLanguage('php', php)
highlight.registerLanguage('bash', bash)

export default {
  name: 'Article',
  components: {
    Footer
  },
  directives: {
    highlight: {
      update: function (el) {
        let blocks = el.querySelectorAll('pre code')
        for (let i = 0; i < blocks.length; i++) {
          highlight.highlightBlock(blocks[i])
        }
      }
    }
  },
  data () {
    return {
      items: this.$router.options.routes,
      activeContent: ' ',
      activeName: '',
      isCollapsed: false,
      isListLoaded: false,
      isArticleLoaded: false,
      files: [],
      folderName: ''
    }
  },
  computed: {
    isExpanded () {
      return this.$store.state.isExpanded
    },
    years () {
      const years = []
      for (let i = 0; i < this.files.length; i++) {
        if (years.indexOf(this.files[i].year) === -1) {
          years.push(this.files[i].year)
        }
      }
      for (let i = 0; i < years.length - 1; i++) {
        for (let j = 0; j < years.length - 1 - i; j++) {
          if (years[j] < years[j + 1]) {
            let temp = years[j + 1]
            years[j + 1] = years[j]
            years[j] = temp
          }
        }
      }
      return years
    }
  },
  created () {
    document.title = 'Sta | ' + this.$route.name
    this.initialGetContent()
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.title, next)
  },
  methods: {
    openNavbar () {
      if (window.innerWidth < 819) this.isCollapsed = false
    },
    closeNavbar () {
      if (window.innerWidth < 819) this.isCollapsed = true
    },
    handleRoute (file) {
      const ua = window.navigator.userAgent.toLowerCase()
      if (ua.includes('micromessenger')) {
        window.open('/article/' + file.title, '_self', true)
      } else {
        this.$router.replace({ name: 'Article', params: { title: file.title } })
        this.isArticleLoaded = false
      }
      this.closeNavbar()
    },
    filesByYear (year) {
      return this.files.filter(file => {
        if (file.year === year) return true
      })
    },
    initialGetContent () {
      axios({
        method: 'GET',
        url: '/api/article/lists'
      }).then(response => {
        this.files = response.data.files
        this.folderName = this.files[0].url.replace(/(\/\w+)\/.+\.\w+/, '$1')
        this.isListLoaded = true
        this.getContent(this.$route.params.title)
      }).catch(error => {
        console.log(error)
      })
    },
    getContent (title, callback) {
      for (let i = 0; i < this.files.length; i++) {
        if (title === this.files[i].title) {
          this.activeName = this.files[i].name
          axios({
            method: 'GET',
            url: this.files[i].url,
            timeout: 2500
          }).then(response => {
            document.title = 'Sta | ' + this.activeName
            const regURL = /(!\[.+\]\()\.(\/.+\))/g
            const regTitle = /`英文标题.+`/
            const result = response.data.replace(regURL, '$1' + this.folderName + '$2').replace(regTitle, '')
            this.activeContent = marked(result)
            this.isArticleLoaded = true
            if (callback) callback()
          }).catch(error => {
            document.title = 'Sta | ' + this.activeName
            this.activeContent = '数据获取错误'
            if (callback) callback()
            throw error
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
$nav-width: 3rem;
$nav-padding-horizental: 0.2rem;
$nav-item-margin-left: 0.1rem;
$background-color: #f2f2f2;
$nav-color: white;

.article-main {
  font-size: 0.16rem;
  font-family: "STHeiti","SimHei";
}

.article-page {
  display: block;
  position: relative;
  width: 100%;
  padding-top: 0.8rem;
  padding-left: $nav-width;
  background-color: $background-color;

  .article-page-content {
    display: none;
    margin: 4vw;
    padding: 8vw;
    min-height: calc(100vh - 0.8rem - 8vw);
    background-color: white;
    border-radius: 0.2rem;
    overflow: hidden;
    &.active {
      display: block;
    }
  }
}

.article-page-fake {
  h1, p {
    width: 100%;
    height: 1em;
    background-color: $background-color;
    &.date {
      width: 130px;
    }
  }
}

.article-nav {
  position: fixed;
  top: 0.8rem;
  display: block;
  background-color: $nav-color;
  margin: 0;
  padding: 13vh $nav-padding-horizental 13vh;
  text-align: left;
  width: $nav-width;
  height: calc(100vh - 0.8rem);
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  vertical-align: top;
  transition: transform 0.5s, box-shadow 1.5s;

  .article-nav-year {
    font-size: 150%;
    width: 2em;
    margin: 0 0 0.24rem 0;
    text-align: left;
    font-weight: bold;
  }

  .article-nav-content {
    padding-left: 0;
    margin: 0;
    list-style-type: none;
  }

  .article-nav-item {
    font-size: 100%;
    cursor: pointer;
    width: $nav-width - 2 * $nav-padding-horizental - $nav-item-margin-left;
    margin: 0 0 0.24rem $nav-item-margin-left;

    &:hover, &:active {
      color: green;
    }

    &.selected {
      font-size: 120%;
      font-weight: bold;
      color: green;
    }
  }

  .article-nav-fake {
    display: none;
    background-color: $background-color;
    height: 1em;
    &.active {
      display: block;
    }
  }
}

.article-blank {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
}

@media only screen and (max-width: 819px) {
  .article-page {
    padding-left: 0;
    transition: transform 0.5s;
    &.expanded {
      transform: translateX(70vw);
    }
    .article-page-content {
      margin: 4vw 4vw 4vw calc(4vw + 0.2rem);
    }
  }
  .article-nav {
    @keyframes slide-navbar {
      from {transform: translateX(calc(-#{$nav-width} + 0.2rem));}
      to {transform: translateX(0);}
    }
    animation: slide-navbar 1s;
    box-shadow: 0.17rem 0 0.2rem -0.2rem rgba(0, 0, 0, 0.5);
    transform: translateX(0);
    &.article-nav-toggle {
      transform: translateX(calc(-#{$nav-width} + 0.2rem));
    }
    &.expanded {
      transform: translateX(70vw);
    }
    &.article-nav-toggle.expanded {
      transform: translateX(calc(-#{$nav-width} + 0.2rem + 70vw));
    }
  }
  .article-blank {
    display: block;
    transform: translateX(-100vw);
    transition: transform 0.5s;
    &.expanded {
      transform: translateX(-30vw);
    }
  }
}
</style>
