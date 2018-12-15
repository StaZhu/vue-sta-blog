
<template>
  <main class="photo-main main">
    <div class="photo-main-wrapper" :class="{ expanded: isExpanded }">
      <template v-for="bundle in bundles">
        <div :key="bundle.index" class="photo-title" >
          <h1>{{ bundle.title }}</h1>
          <p>{{ bundle.substract }}</p>
        </div>
        <div :key="bundle.title" class="photo-content" :style="{ width: wrapperWidth + 1 + 'px' }">
          <div
            v-for="file in bundle.files"
            class="photo-items"
            :key="file.url"
            :style="{ width: file.outerWidth + 'px', height: file.outerHeight + 'px', 'margin-left': file.marginLeft + 'px', 'margin-top': file.marginTop + 'px'}"
          >
            <a :href="file.url" target="_blank" rel="noorigin ">
              <img
                class="photo-block"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                :data-src="file.surl"
                :style="{ width: file.innerWidth + 'px', height: file.innerHeight + 'px' }"
                :alt="file.name"
              >
            </a>
          </div>
        </div>
      </template>
      <div class="photo-loading" :class="{ active: !isLoaded }">
        <div class="photo-loading-circle"></div>
      </div>
      <Footer/>
    </div>
  </main>
</template>

<script>
import Footer from '../components/Footer.vue'
import axios from 'axios'

export default {
  name: 'Photo',
  components: {
    Footer
  },
  data () {
    return {
      bundles: {},
      imgList: [],
      wrapperWidth: 0,
      isNavAction: false,
      isLoaded: false
    }
  },
  computed: {
    isExpanded () {
      return this.$store.state.isExpanded
    }
  },
  watch: {
    '$store.getters.isExpanded' () {
      this.isNavAction = true
    }
  },
  beforeCreate () {
    document.title = 'Sta | ' + this.$route.name
  },
  created () {
    axios.get('/api/photo/lists').then(response => {
      this.bundles = response.data.bundles
      for (let i = 0; i < this.bundles.length; i++) {
        this.bundles[i].files.forEach(bundle => {
          this.$set(bundle, 'ratio', bundle.width / bundle.height)
        })
      }
      this.adjustSize()
      window.addEventListener('resize', this.adjustSize)
    }).catch(err => {
      console.log(err)
    })
  },
  updated () {
    if (!this.isNavAction) {
      this.imgList = document.querySelectorAll('.photo-items')
      // const loadImgThrottle = this.throttle(this.loadImg.bind(this), 50)
      const loadImgDebounce = this.debounce(this.loadImg.bind(this), 50)
      // loadImgThrottle()
      loadImgDebounce()
      this.isLoaded = true
      // window.addEventListener('scroll', loadImgThrottle)
      window.addEventListener('scroll', loadImgDebounce)
    } else {
      this.isNavAction = false
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.loadImg)
  },
  methods: {
    getWrapperWidth () {
      const border = 5
      const windowWidth = window.innerWidth
      this.wrapperWidth = windowWidth > 1280 ? 1280 - 2 * border : windowWidth - 2 * border
    },
    adjustSize () {
      this.getWrapperWidth()
      const width = this.wrapperWidth
      const height = 330
      const border = 5
      const ratioLimit = width / height
      let ratioSum = 0
      let count = 0
      let reg = 0
      let row = 0
      for (let i = 0; i < this.bundles.length; i++) {
        for (let j = 0; j < this.bundles[i].files.length; j++) {
          ratioSum += this.bundles[i].files[j].ratio
          count++
          if (ratioSum + (count - 1) * border / height >= ratioLimit) {
            row++
            if (ratioSum === this.bundles[i].files[j].ratio ||
              Math.abs(ratioSum + (count - 1) * border / height - ratioLimit) <= Math.abs(ratioSum - this.bundles[i].files[j].ratio + (count - 2) * border / height - ratioLimit)
            ) {
              for (let k = 0; k < count; k++) {
                this.$set(this.bundles[i].files[reg + k], 'innerWidth', this.bundles[i].files[reg + k].ratio * height)
                this.$set(this.bundles[i].files[reg + k], 'innerHeight', height)
                this.$set(this.bundles[i].files[reg + k], 'outerWidth', this.bundles[i].files[reg + k].innerWidth * (ratioLimit - (count - 1) * border / height) / ratioSum)
                this.$set(this.bundles[i].files[reg + k], 'outerHeight', height)
                this.$set(this.bundles[i].files[reg + k], 'marginLeft', k === 0 ? 0 : border)
                this.$set(this.bundles[i].files[reg + k], 'marginTop', row === 1 ? 0 : border)
              }
            } else {
              count--
              for (let k = 0; k < count; k++) {
                this.$set(this.bundles[i].files[reg + k], 'innerWidth', height * this.bundles[i].files[reg + k].ratio * (ratioLimit - (count - 1) * border / height) / (ratioSum - this.bundles[i].files[j].ratio))
                this.$set(this.bundles[i].files[reg + k], 'innerHeight', this.bundles[i].files[reg + k].innerWidth / this.bundles[i].files[reg + k].ratio)
                this.$set(this.bundles[i].files[reg + k], 'outerWidth', this.bundles[i].files[reg + k].innerWidth)
                this.$set(this.bundles[i].files[reg + k], 'outerHeight', height)
                this.$set(this.bundles[i].files[reg + k], 'marginLeft', k === 0 ? 0 : border)
                this.$set(this.bundles[i].files[reg + k], 'marginTop', row === 1 ? 0 : border)
              }
              j--
            }
            ratioSum = 0
            reg += count
            count = 0
          }
        }
        if (count !== 0) {
          row++
          for (let k = 0; k < count; k++) {
            this.$set(this.bundles[i].files[reg + k], 'innerWidth', height * this.bundles[i].files[reg + k].ratio * (ratioLimit - (count - 1) * border / height) / ratioSum)
            this.$set(this.bundles[i].files[reg + k], 'innerHeight', this.bundles[i].files[reg + k].innerWidth / this.bundles[i].files[reg + k].ratio)
            this.$set(this.bundles[i].files[reg + k], 'outerWidth', this.bundles[i].files[reg + k].innerWidth)
            this.$set(this.bundles[i].files[reg + k], 'outerHeight', height)
            this.$set(this.bundles[i].files[reg + k], 'marginLeft', k === 0 ? 0 : border)
            this.$set(this.bundles[i].files[reg + k], 'marginTop', row === 1 ? 0 : border)
          }
        }
        reg = 0
        row = 0
        count = 0
        ratioSum = 0
        if (this.isLoaded) {
          this.loadImg()
        }
      }
    },
    loadImg () {
      for (let i = 0; i < this.imgList.length; i++) {
        const imgWrap = this.imgList[i]
        const img = imgWrap.querySelector('.photo-block')
        const srcData = img.getAttribute('data-src')
        const inView = this.inViewPort(imgWrap)
        if (inView && srcData) {
          img.setAttribute('src', srcData)
          img.removeAttribute('data-src')
          img.onload = function () {
            img.classList.add('active')
          }
        } else if (!inView && !srcData) {
          const src = img.getAttribute('src')
          img.setAttribute('data-src', src)
          img.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')
          img.onload = function () {
            img.classList.remove('active')
          }
        }
      }
    },
    inViewPort (el) {
      // getBoundingClientRect有bug，初次加载获取的高度不正确
      // const rect = el.getBoundingClientRect()
      // return rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0
      const elTop = el.offsetTop
      const elHeight = el.offsetHeight
      const windowTop = window.pageYOffset
      const windowHeight = window.innerHeight
      return elTop < windowTop + windowHeight && elTop + elHeight > windowTop
    },
    debounce (func, wait = 50) {
      let timer = 0
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, wait)
      }
    },
    throttle (func, wait, options) {
      let context, args, result
      let timeout = null
      let previous = 0
      if (!options) options = {}
      let later = function () {
        previous = options.leading === false ? 0 : Date.now()
        timeout = null
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
      return function () {
        const now = Date.now()
        if (!previous && options.leading === false) previous = now
        const remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout)
            timeout = null
          }
          previous = now
          result = func.apply(context, args)
          if (!timeout) context = args = null
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining)
        }
        return result
      }
    }
  }
}
</script>

<style lang="scss">
.photo-main {
  padding-top: 0.8rem;
  background-color: #f8f8f8;
  font-size: 0.25rem;
  font-family: "STHeiti","SimHei";
}

.photo-main-wrapper {
  margin: 0 auto;
  overflow: hidden;
}

.photo-title {
  margin: 0px auto;
  width: 100%;
  max-width: 1280px;
  padding: 5px;
  text-align: center;
  font-size: 15px;
  line-height: 1;
  color: #555;
  h1 {
    font-size: 2em;
    margin: 0.5em 0;
  }
  p {
    font-size: 1em;
    margin: 1em 0;
  }
}

.photo-content {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  margin: 5px auto;
}

.photo-items {
  position: relative;
  flex: none;
  overflow: hidden;
  background-color: #eee;
}

.photo-block {
  position: absolute;
  visibility: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.active {
    visibility: visible;
    @keyframes opacity {
      from { filter: opacity(0%) }
      to { filter: opacity(100%) }
    }
    animation: opacity 1s;
  }
  &:hover {
    zoom: 1.1;
    transition: all 0.5s;
    cursor: pointer;
  }
}

.photo-loading {
  position: relative;
  display: none;
  width: 100%;
  min-height: calc(100vh - 0.8rem);
  overflow: hidden;
  &.active {
    display: block;
  }
}

.photo-loading-circle {
  position: relative;
  font-size: 12px;
  border-radius: 50%;
  margin: -5em auto;
  top: 50vh;
  width: 1em;
  height: 1em;
  animation: loading 1s infinite ease;
}

@keyframes loading {
  0% {
    box-shadow:
      0em -2.5em 0em 0em rgba(255, 255, 255, 1),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
  }

  14% {
    box-shadow:
      0em -2.5em 0em 0em rgba(255, 255, 255, 0.7),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 1),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.7),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }

  28% {
    box-shadow:
      0em -2.5em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7),
      2.5em 0em 0 0em rgba(255, 255, 255, 1),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }

  42% {
    box-shadow:
      0em -2.5em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.7),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 1),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.7),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }

  56% {
    box-shadow:
      0em -2.5em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7),
      0em 2.5em 0 0em rgba(255, 255, 255, 1),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7),
      -2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }

  70% {
    box-shadow:
      0em -2.5em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.7),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 1),
      -2.5em 0em 0 0em rgba(255, 255, 255, 0.7),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }

  84% {
    box-shadow:
      0em -2.5em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7),
      -2.5em 0em 0 0em rgba(255, 255, 255, 1),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
  }

  100% {
    box-shadow:
      0em -2.5em 0em 0em rgba(255, 255, 255, 0.7),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.5em 0em 0 0em rgba(255, 255, 255, 0.7),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 1);
  }
}

@media only screen and (max-width: 819px) {
  .photo-main-wrapper {
    transform: translateX(0);
    transition: transform 0.5s;
    &.expanded {
      transform: translateX(70vw);
    }
  }
}
</style>
