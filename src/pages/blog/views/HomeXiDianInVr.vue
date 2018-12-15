<template>
  <div class="home-block-wrapper">
    <div class="home-block" :class="{ 'home-xd-in-vr': isActive }" @click="open('https://720yun.com/t/e4cjt7ykvv5')"></div>
  </div>
</template>

<script>
export default {
  name: 'HomeXiDianInVr',
  data () {
    return {
      isActive: false
    }
  },
  watch: {
    '$store.getters.loadingNumber' (val) {
      if (val === 1) {
        const img = new Image()
        if (window.outerWidth > 819 && window.devicePixelRatio > 1.5) {
          img.src = '/img/xidian_in_vr@2x.jpg'
        } else {
          img.src = '/img/xidian_in_vr.jpg'
        }
        img.onload = () => {
          this.isActive = true
          this.$store.dispatch('increaseNumber')
        }
      }
    }
  },
  methods: {
    open (url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss">
.home-block.home-xd-in-vr {
  @keyframes opacity {
    from { filter: opacity(100%);}
    to { filter: opacity(100%)}
  }
  animation: opacity 1s;
  background-image: url("../assets/images/xidian_in_vr.jpg");
  &:hover {
    cursor: pointer;
  }
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 1.5dppx), only screen and (min-resolution: 144dpi) {
  .home-block.home-xd-in-vr {
    background-image: url("../assets/images/xidian_in_vr@2x.jpg");
  }
}

@media only screen and (max-width: 819px) {
  .home-block.home-xd-in-vr {
    background-image: url("../assets/images/xidian_in_vr.jpg");
  }
}
</style>
