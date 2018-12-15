<template>
  <div class="home-block-wrapper">
    <div class="home-block" :class="{ 'home-xingping-in-vr': isActive }" @click="open('https://720yun.com/t/a4dje5savu2?scene_id=15957343')"></div>
  </div>
</template>

<script>
export default {
  name: 'HomeXingPingInVr',
  data () {
    return {
      isActive: false
    }
  },
  watch: {
    '$store.getters.loadingNumber' (val) {
      if (val === 2) {
        const img = new Image()
        if (window.outerWidth > 819 && window.devicePixelRatio > 1.5) {
          img.src = '/img/xingping_in_vr@2x.jpg'
        } else {
          img.src = '/img/xingping_in_vr.jpg'
        }
        img.onload = () => {
          this.isActive = true
          this.$store.dispatch('clearNumber')
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
.home-block.home-xingping-in-vr {
  @keyframes opacity {
    from { opacity: 0}
    to { opacity: 1}
  }
  animation: opacity 1s;
  background-image: url("../assets/images/xingping_in_vr.jpg");
  &:hover {
    cursor: pointer;
  }
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 1.5dppx), only screen and (min-resolution: 144dpi) {
  .home-block.home-xingping-in-vr {
    background-image: url("../assets/images/xingping_in_vr@2x.jpg");
  }
}

@media only screen and (max-width: 819px) {
  .home-block.home-xingping-in-vr {
    background-image: url("../assets/images/xingping_in_vr.jpg");
  }
}
</style>
