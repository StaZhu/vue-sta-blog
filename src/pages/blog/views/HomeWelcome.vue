<template>
  <div class="home-block-wrapper">
    <div class="home-block" :class="{ 'home-introduce': isActive }">
      <h3 class="home-welcome home-font">WELCOME TO</h3>
      <h2 class="home-site home-font">STAZHU.COM</h2>
      <h1 class="home-division home-font">|</h1>
      <h3 class="home-enjoy home-font">ENJOY IT</h3>
      <div class="home-start home-font" @click="handleRoute('Article')">
        <span>开启探索之旅</span>
      </div>
      <div class="home-about home-font" @click="handleRoute('About')">
        <span>关于Sta</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeWelcome',
  data () {
    return {
      items: this.$router.options.routes,
      isActive: false
    }
  },
  created () {
    const img = new Image()
    if (window.outerWidth > 819 && window.devicePixelRatio > 1.5) {
      img.src = '/img/introduce@2x.jpg'
    } else {
      img.src = '/img/introduce.jpg'
    }
    img.onload = () => {
      this.isActive = true
      this.$store.dispatch('increaseNumber')
    }
  },
  methods: {
    handleRoute (name, title) {
      const ua = window.navigator.userAgent.toLowerCase()
      if (ua.includes('micromessenger')) {
        for (let i = 0; i < this.items.length; i++) {
          if (name === this.items[i].name) {
            const basePath = this.items[i].path.replace(/(\/.+)\/:.+/, '$1')
            if (title) {
              window.open(basePath + '/' + title, '_self', true)
            } else if (this.items[i].meta && this.items[i].meta.title) {
              window.open(basePath + '/' + this.items[i].meta.title, '_self', false)
            } else {
              window.open(this.items[i].path, '_self', false)
            }
          }
        }
      } else {
        for (let i = 0; i < this.items.length; i++) {
          if (name === this.items[i].name) {
            if (title) {
              this.$router.push({ name: name, params: { title: title } })
            } else if (this.items[i].meta && this.items[i].meta.title) {
              this.$router.push({ name: name, params: { title: this.items[i].meta.title } })
            } else {
              this.$router.push({ name: name })
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.home-block.home-introduce {
  @keyframes opacity {
    from { filter: opacity(100%);}
    to { filter: opacity(100%);}
  }
  animation: opacity 1s;
  background-image: url("../assets/images/introduce.jpg");
  cursor: default;
  user-select: none;
}

.home-font {
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  color: white;
  font-family: Baskerville;
  font-weight: inherit;
  transition: transform 0.5s;
}

.home-welcome {
  transform: translate(8em, 4.67em);
  font-size: 0.6em;
  text-shadow: -0.3em 0.3em 0.15em rgba(0,0,0,0.5);
}

.home-site {
  transform: translate(5.85em, 5.07em);
  font-size: 0.75em;
  text-shadow: -0.3em 0.3em 0.2em rgba(0,0,0,0.5);
}

.home-division {
  transform: translate(4.4em, 1.13em);
  font-size: 2.1em;
}

.home-enjoy {
  transform: translate(18.65em, 4.67em);
  font-size: 0.6em;
  text-shadow: -0.3em 0.3em 0.15em rgba(0,0,0,0.5);
}

.home-start {
  transform: translate(41em, 15.7em);
}

.home-about {
  transform: translate(51.6em, 15.7em);
}

.home-start, .home-about {
  padding: 0.1em 0.2em;
  border: 0.15em solid white;
  border-radius: 0.4em;
  font-size: 0.25em;
  font-family: "STHeiti","SimHei";
  text-align: center;
  color: white;
  background-color: rgba(0,0,0,0.1);
  width: 7.5em;
  transition: transform 0.5s, background-color 0.5s;
}

.home-start:hover,
.home-about:hover,
.home-start:active,
.home-about:active {
  cursor: pointer;
  background-color: rgba(0,0,0,0.4);
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 1.5dppx), only screen and (min-resolution: 144dpi) {
  .home-block.home-introduce {
    background-image: url("../assets/images/introduce@2x.jpg");
  }
}

@media only screen and (max-width: 819px) {
  .home-block.home-introduce {
    background-image: url("../assets/images/introduce.jpg");
  }
  .home-welcome {
    transform: translate(11.7em, 1.6em);
  }
  .home-site {
    transform: translate(8.8em, 3em);
  }
  .home-division {
    transform: translate(4.14em, 1.3em) rotate(90deg);
  }
  .home-enjoy {
    transform: translate(12.85em, 7.9em);
  }
  .home-start {
    transform: translate(27em, 25em);
  }
  .home-about {
    transform: translate(38em, 25em);
  }
}
</style>
