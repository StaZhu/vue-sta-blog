<template>
  <section class="article-content">
    <div class="article-inner-content markdown-body" :class="{ active: isArticleLoaded }" v-html="activeContent" v-highlight></div>
    <div class="article-inner-content fake markdown-body" :class="{ active: !isArticleLoaded }">
      <h1></h1>
      <p class="date"></p>
      <p v-for="value in Array.from({ length: 100 }, (value, key) => key)" :key="value"></p>
    </div>
  </section>
</template>

<script>
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
  name: 'ArticleContent',
  props: {
    isArticleLoaded: Boolean,
    activeContent: String
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
  }
}
</script>

<style lang="scss">
$nav-width: 3rem;
$background-color: #f2f2f2;
$nav-color: white;

.article-content {
  margin: 4vw;
  .article-inner-content {
    position: relative;
    display: none;
    padding: 8vw;
    min-height: calc(100vh - 0.8rem - 8vw);
    max-width: 850px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
    // overflow: hidden;
    &.active {
      display: block;
    }
    &.fake {
      h1, p {
        width: 100%;
        height: 1em;
        background-color: $background-color;
        &.date {
          width: 130px;
        }
      }
    }
  }
}
@media only screen and (max-width: 819px) {
  .article-content {
    margin: 4vw 4vw 4vw calc(4vw + 0.2rem);
  }
}
</style>
