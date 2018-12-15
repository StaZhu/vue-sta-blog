<template>
  <main class="contact-main main">
    <div class="contact-main-wrapper" :class="{ expanded: isExpanded }">
      <div class="contact-content">
        <svg-icon class="contact-logo contact-icon" symbolId="#svg-logo"></svg-icon>
        <a href="tel:+86 18592016921">
          <svg-icon class="contact-call contact-icon" symbolId="#svg-call"></svg-icon>
        </a>
        <svg-icon class="contact-wechat contact-icon" symbolId="#svg-wechat" @click.native="isActive = true"></svg-icon>
        <a href="https://github.com/StaZhu" target="_blank" rel="noreferer noopener">
          <svg-icon class="contact-github contact-icon" symbolId="#svg-github"></svg-icon>
        </a>
        <a href="https://weibo.com/zhusidayoyo" target="_blank" rel="noreferer noopener">
          <svg-icon class="contact-weibo contact-icon" symbolId="#svg-weibo"></svg-icon>
        </a>
        <a href=mailto:sta@stazhu.com>
          <svg-icon class="contact-mail contact-icon" symbolId="#svg-mail"></svg-icon>
        </a>
      </div>
      <div class="contact-blank" :class="{ active: isActive}" @click="isActive = false"></div>
      <img class="contact-wechat-qrcode" :class="{ active: isActive }" src="../assets/images/qrcode-wechat.jpg" alt="wechat-qrcode">
      <Footer/>
    </div>
  </main>
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
  name: 'Contact',
  data () {
    return {
      isActive: false
    }
  },
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
  },
  methods: {
    isMobile () {
      const ua = navigator.userAgent
      if (ua.includes('android' || ua.inclues('iphone' || ua.inclues('ipad') || ua.inclues('micromessenger')))) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
$background-color: #f2f2f2;

.contact-main {
  height: 100vh;
  font-size: 0.25rem;
  font-family: "STHeiti","SimHei";
}

.contact-main-wrapper {
  padding-top: 0.8rem;
  background-color: $background-color;
  height: 100%;
}

@media only screen and (max-width: 819px) {
  .contact-main-wrapper {
    transition: transform 0.5s;
    &.expanded {
      transform: translateX(70vw);
    }
  }
}

.contact-content {
  position: relative;
  width: 100%;
  height: calc(100% - 0.8rem);
  min-height: 2.5rem;
  min-width: 2.5rem;
  margin: 0 auto;
  transition: transform 0.5s;
}

.contact-icon {
  position: absolute;
  display: block;
  width: 1rem;
  height: 1rem;
}

@keyframes logo-animate {
  0% {
    visibility: visible;
    filter: opacity(100%);
    transform: rotate(0deg);
  }
  100% {
    visibility: hidden;
    filter: opacity(0%);
    transform: rotate(-3600deg);
  }
}

.contact-logo {
  visibility: hidden;
  filter: opacity(0%);
  left: 50%;
  top: 50%;
  width: 1.4rem;
  height: 1.4rem;
  margin: -0.7rem 0 0 -0.7rem;
  animation: logo-animate 2s;
}

@keyframes call-animate {
  from {
    filter: opacity(0%);
    transform: rotate(0deg);
  }
  to {
    filter: opacity(100%);
    transform: rotate(-3600deg);
  }
}

.contact-call {
  left: 50%;
  top: 50%;
  margin: -0.5rem 0 0 -0.5rem;
  animation: call-animate 2s;
}

@keyframes wechat-animate {
  from {
    left: 50%;
    top: 50%;
    filter: opacity(0%);
    transform: rotate(0deg);
  }
  to {
    left: 25%;
    top: 25%;
    filter: opacity(100%);
    transform: rotate(-3600deg);
  }
}

.contact-wechat {
  left: 25%;
  top: 25%;
  margin: -0.5rem 0 0 -0.5rem;
  animation: wechat-animate 2s;
  cursor: pointer;
}

@keyframes github-animate {
  from {
    left: 50%;
    top: 50%;
    filter: opacity(0%);
    transform: rotate(0deg);
  }
  to {
    left: 75%;
    top: 25%;
    filter: opacity(100%);
    transform: rotate(-3600deg);
  }
}

.contact-github {
  left: 75%;
  top: 25%;
  margin: -0.5rem 0 0 -0.5rem;
  animation: github-animate 2s;
}

@keyframes weibo-animate {
  from {
    left: 50%;
    top: 50%;
    filter: opacity(0%);
    transform: rotate(0deg);
  }
  to {
    left: 25%;
    top: 75%;
    filter: opacity(100%);
    transform: rotate(-3600deg);
  }
}

.contact-weibo {
  left: 25%;
  top: 75%;
  margin: -0.5rem 0 0 -0.5rem;
  animation: weibo-animate 2s;
}

@keyframes mail-animate {
  from {
    left: 50%;
    top: 50%;
    filter: opacity(0%);
    transform: rotate(0deg);
  }
  to {
    left: 75%;
    top: 75%;
    filter: opacity(100%);
    transform: rotate(-3600deg);
  }
}

.contact-mail {
  left: 75%;
  top: 75%;
  margin: -0.5rem 0 0 -0.5rem;
  animation: mail-animate 2s;
}

.contact-blank {
  visibility: hidden;
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
  filter: opacity(0%);
  transition: filter 1s, visibility 1s;
  &.active {
    visibility: visible;
    filter: opacity(100%);
  }
}

.contact-wechat-qrcode {
  visibility: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40vmin;
  height: 40vmin;
  min-width: 300px;
  min-height: 300px;
  transform: translate(-50%, -50%);
  z-index: 2;
  filter: opacity(0%);
  transition: all 1s;
  &.active {
    visibility: visible;
    filter: opacity(100%);
  }
}
</style>
