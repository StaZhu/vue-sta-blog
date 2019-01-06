<template>
    <div class="article-comment-reply">
      <svg-icon symbolId="#svg-anonymous"></svg-icon>
      <div class="block">
        <div class="meta">
          <span class="username">{{ user.name }}</span>
          <span class="address">来自{{ user.location }}的网友</span>
        </div>
        <div class="date">
          <span class="datetime">{{ user.date }}</span>
          <span class="reply">回复</span>
        </div>
        <p class="content">{{ user.content }}</p>
        <div class="quote" v-if="hasReplyUser">
          <ArticleCommentReply  v-for="(replyUser, index) in replyUsers" :key="index" :user="replyUser"/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ArticleCommentReply',
  props: {
    user: Object
  },
  computed: {
    hasReplyUser () {
      if (this.user.reply && this.user.reply.length > 0) {
        return true
      } else {
        return false
      }
    },
    replyUsers () {
      return this.user.reply
    }
  },
  methods: {
    createComment () {

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

.article-comment-reply {
  position: relative;
  max-width: 850px;
  left: 50%;
  transform: translateX(-50%);
  padding: $comment-padding;
  background-color: white;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));

  .svg-icon {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    vertical-align: top;
    margin-right: 5px;
  }

  .block {
    width: calc(100% - 30px);
    display: inline-block;
    .meta {
      line-height: 22px;
      .username {
        color: green;
        font-size: 12px;
        margin-right: 8px;
      }
      .address {
        color: $font-grey;
        padding: 5px;
        height: 25px;
        background-color: $background-color;
        font-size: 12px;
        margin-right: 8px;
      }
    }
    .date {
      display: flex;
      justify-content: space-between;
      line-height: 22px;
      .datetime {
        font-size: 12px;
        color: $font-grey;
      }
      .reply {
        color: red;
        font-size: 12px;
      }
    }

    .content {
      font-size: 16px;
      font-weight: bold;
    }

    .quote {
      margin-top: 16px;
      padding-left: 16px;
    }
  }
}
</style>
