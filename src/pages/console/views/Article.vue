<template>
  <form
    class="article"
    action="/api/console/article"
    method="post"
    enctype="application/x-www-form-urlencoded"
    id="article"
    name="article"
  >
    <section class="article-area">
      <textarea
        :value="text"
        @input="text = $event.target.value"
        class="text"
        placeholder="请输入Markdown文本"
        form="article"
        autofocus
      ></textarea>
      <div
        v-html="markdownText"
        class="preview markdown-body"
      ></div>
    </section>
    <section class="article-submit">
      <div>
        <input type="file" id="article-file" accept="text/x-markdown" @change="readFile($event)">
      </div>
      <button type="submit" form="article">提交</button>
    </section>
  </form>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Article',
  data () {
    return {
      text: ''
    }
  },
  computed: {
    markdownText () {
      return marked(this.text)
    }
  },
  methods: {
    readFile (event) {
      let reader = new FileReader()
      reader.onload = () => {
        // this.text = window.atob(reader.result.replace(/data:.+\/.+;base64,/, ''))
        this.text = reader.result
      }
      reader.readAsText(event.target.files[0])
    }
  }
}
</script>

<style lang="scss">
$blue: #3f9dfa;

.article {
  position: absolute;
  width: calc(100% - 40px);
  .article-area {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .text {
      width: calc(50% - 10px);
      height: 80vh;
      padding: 20px;
      border: 1px solid #eee;
      outline: none;
      resize: none;
      font-size: 16px;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      &:focus {
        box-shadow: 0 0 5px 0 $blue;
      }
    }

    .preview {
      float: right;
      width: calc(50% - 10px);
      height: 80vh;
      padding: 20px;
      background-color: white;
      border: 1px solid #eee;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }

  .article-submit {
    display: flex;
    justify-content: space-between;
    button {
      height: 40px;
      background-color: $blue;
      border-radius: 20px;
      padding: 0 20px;
      border: 0;
      color: white;
      font-size: 16px;
      line-height: 40px;
    }
  }
}
</style>
