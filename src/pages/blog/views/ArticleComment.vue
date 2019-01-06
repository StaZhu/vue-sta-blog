<template>
  <section class="article-comment">
    <form id="form" class="article-comment-area" @submit="submit($event)">
      <textarea id="comment" placeholder="输入你的评论" name="comment" v-model="comment" maxlength="2000" required></textarea>
      <div class="info">
        <input id="email" type="email" placeholder="邮箱" name="email" v-model="email" pattern="^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$" required>
        <input id="username" type="text" placeholder="昵称" name="author" v-model="author" pattern="^[a-z0-9_-]{1,16}$" required>
        <button id="submit" type="submit" >发表评论</button>
      </div>
    </form>
    <div class="article-comment-number">{{ amount }}<span>评论</span></div>
    <ArticleCommentReply v-for="(user, index) in users" :key="index" :user="user" />
  </section>
</template>

<script>
import ArticleCommentReply from './ArticleCommentReply.vue'
import users from './user.json'

export default {
  name: 'ArticleComment',
  props: {
    id: Number
  },
  components: {
    ArticleCommentReply
  },
  data () {
    return {
      amount: users.amount,
      users: users.users,
      email: '',
      author: '',
      comment: ''
    }
  },
  watch: {
    id () {
      // console.log(this.id)
    }
  },
  methods: {
    getNumber () {
      fetch('/api/article/comment/lists', {
        method: 'GET',
        credentials: 'same-origin'
      })
    },
    validateInfo () {
      if (this.email) {
        if (!this.email.match(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/)) {
          alert('邮箱不合法')
          return false
        }
      } else {
        alert('请输入邮箱')
        return false
      }
      if (this.author) {
        if (!this.author.match(/^[a-z0-9_-]{1,16}$/) || this.author.indexOf('<script>') !== -1) {
          alert('昵称不合法')
          return false
        }
      } else {
        alert('请输入昵称')
        return false
      }
      if (this.comment) {
        if (!this.comment.match(/.{1,2000}/)) {
          alert('输入长度不正确')
          return false
        }
        if (this.comment.indexOf('<script>') !== -1) {
          alert('评论包含敏感关键词')
          return false
        }
      } else {
        alert('请输入评论')
        return false
      }
      return true
    },
    submit (event) {
      let form = event.target
      form.action = '/api/article/comment/lists'
      form.method = 'POST'
      form.enctype = 'application/x-www-form-urlencoded'
      let infos = {
        id: this.id,
        parent: 0,
        timezone: new Date().getTimezoneOffset() / 60
      }
      let temp = document.createDocumentFragment()
      for (let info of Object.entries(infos)) {
        let node = document.createElement('input')
        node.type = 'hidden'
        node.name = info[0]
        node.value = info[1]
        temp.appendChild(node)
      }
      form.appendChild(temp)
      console.log(form.elements)
      event.preventDefault()
      /*
      if (this.validateInfo()) {
        fetch('/api/article/comment/lists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8'}
          body: JSON.stringify({
            id: this.id
            postID: 'asas'
            author: 'dsds'
            email: 'ddddd'
            comment: 'dd'
            timezone: new Date().getTimezoneOffset() / 60,
            parent: 0
          }),
          // credentials: 'same-origin',
        })
        .then(res => res.json())
        .then(value => {
          console.log(value)
        })
      }
      */
    }
  }
}
</script>

<style lang="scss">
$nav-width: 3rem;
$background-color: #f2f2f2;
$nav-color: white;
$comment-padding: 15px;
$font-grey: #b3b1b1;

.article-comment {
  position: relative;
  margin: 4vw;
  .article-comment-area {
    position: relative;
    max-width: 850px;
    left: 50%;
    transform: translateX(-50%);
    border-top: 5px solid green;
    padding: $comment-padding;
    background-color: white;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));

    .info {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    textarea {
      margin: 0 auto;
      width: 100%;
      height: 150px;
      border: 0;
      font-size: 16px;
      background-color: transparent;
      resize: none;
      outline: 0;
      cursor: pointer;
    }

    input {
      outline: 0;
      border-radius: 5px;
      border: 1px solid $background-color;
      padding-left: 10px;
      max-width: 200px;
      min-width: 80px;
      flex: 0 1 auto;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset;
      }
      &:focus:invalid {
        border: 1px solid red;
      }
    }

    button {
      cursor: pointer;
      padding: 10px;
      border-radius: 5px;
      border: 1px;
      background-color: $background-color;
      flex: none;
    }
  }

  .article-comment-number {
    position: relative;
    max-width: 850px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
    padding: 25px;
    span {
      font-size: 12px;
      vertical-align: middle;
    }
  }
}

@media only screen and (max-width: 819px) {
  .article-comment {
    margin: 4vw 4vw 4vw calc(4vw + 0.2rem);
  }
}
</style>
