<template>
  <header class="header" :class="{ expanded: isExpanded }">
    <svg-icon class="header-hamburger" symbolId="#svg-hamburger" @click.native="toggleSidebar()"></svg-icon>
    <svg-icon class="header-logo" symbolId="#svg-logo" :style="{ transform: degree }" @click.native="handleRoute('Home')"></svg-icon>
    <ul class="header-nav">
      <li class="header-nav-item" v-for="item in items" :key="item.name" @click="handleRoute(item.name)">{{ toUpperCase(item.name) }}</li>
    </ul>
    <div class="header-blank" @click="toggleSidebar()"></div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      degree: 'rotate(0deg)',
      itemsRaw: this.$router.options.routes
    }
  },
  computed: {
    items () {
      const items = JSON.parse(JSON.stringify(this.itemsRaw))
      items.shift()
      return items
    },
    isExpanded () {
      return this.$store.getters.isExpanded
    }
  },
  mounted () {
    window.addEventListener('scroll', this.rotateLogo)
  },
  methods: {
    toUpperCase (name) {
      return name.toUpperCase()
    },
    toggleSidebar () {
      this.$store.dispatch('toggleSidebar')
    },
    rotateLogo () {
      this.degree = 'rotate(' + 0.75 * window.pageYOffset + 'deg)'
    },
    handleRoute (name) {
      const ua = window.navigator.userAgent.toLowerCase()
      if (ua.includes('micromessenger')) {
        for (let i = 0; i < this.itemsRaw.length; i++) {
          if (name === this.itemsRaw[i].name) {
            const basePath = this.itemsRaw[i].path.replace(/(\/.+)\/:.+/, '$1')
            if (this.itemsRaw[i].meta && this.itemsRaw[i].meta.title) {
              window.open(basePath + '/' + this.itemsRaw[i].meta.title, '_self', false)
            } else {
              window.open(this.itemsRaw[i].path, '_self', false)
            }
          }
        }
      } else {
        for (let i = 0; i < this.itemsRaw.length; i++) {
          if (name === this.itemsRaw[i].name) {
            if (this.itemsRaw[i].meta && this.itemsRaw[i].meta.title) {
              this.$router.push({ name: name, params: { title: this.itemsRaw[i].meta.title } })
            } else {
              this.$router.push({ name: name })
            }
          }
        }
      }
      if (this.isExpanded) {
        this.$store.dispatch('toggleSidebar')
      }
    }
  }
}
</script>

<style lang="scss">
.header {
  position: fixed;
  width: 100%;
  max-width: 19.2rem;
  height: 0.8rem;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  margin: 0;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0.17rem 0.2rem -0.2rem rgba(0, 0, 0, 0.5);
  z-index: 1;
  transition: transform 0.5s;
  .header-hamburger {
    display: none;
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    margin-left: 0.3rem;
    margin-top: 0.15rem;
    transform: rotate(0deg);
    cursor: pointer;
  }
  .header-logo {
    display: block;
    position: absolute;
    width: 0.75rem;
    height: 0.8rem;
    left: 0;
    margin-left: 1rem;
    // filter: drop-shadow(0 0 3px rgba(0,0,0,0.4));
    transition: margin-left 0.5s;
    &:hover {
      cursor: pointer;
    }
  }
  .header-nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    margin: 0 1rem 0 4.3rem;
    list-style-type: none;
    .header-nav-item {
      flex: 0 1 auto;
      width: 1rem;
      text-align: right;
      margin: 0.31rem 0rem 0.31rem 0.62rem;
      font-size: 0.18rem;
      font-family: Roboto;
      line-height: 1;
      color: rgba(16, 16, 16, 1);
      cursor: pointer;
      &:hover, &:focus {
        color: #0056b3;
      }
    }
  }
  .header-blank {
    display: none;
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.5);
  }
}

@media only screen and (max-width: 819px) {
  .header {
    .header-hamburger {
      display: block;
      transition: transform 0.5s;
    }
    .header-logo {
      margin-left: calc(50% - 0.375rem);
    }
    .header-nav {
      display: none;
      position: absolute;
      top: 0;
      left: -70vw;
      height: 100vh;
      width: 70vw;
      flex-flow: column nowrap;
      justify-content: flex-start;
      padding: 0.1rem 0 0 0;
      margin: 0;
      box-shadow: 0 7px 10px rgba(0,0,0,0.3);
      background-color: white;
      .header-nav-item {
        width: 60vw;
        margin: 0.2rem 0rem 0 5vw;
        padding: 0 0 0.1rem 0.3rem;
        border-bottom: 0.01rem solid black;
        text-align: left;
      }
    }
    &.expanded {
      transform: translateX(calc(-50% + 70vw));
      .header-hamburger {
        transform: rotate(90deg);
      }
      .header-nav {
        display: flex;
      }
      .header-blank {
        display: block;
      }
    }
  }
}
</style>
