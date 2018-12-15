<template>
  <main class="home-main main">
    <div class="home-main-wrapper" :class="{ expanded: isExpanded }">
      <HomeWelcome/>
      <HomeXiDianInVr/>
      <HomeXingPingInVr/>
      <Footer/>
    </div>
  </main>
</template>

<script>
import HomeWelcome from './HomeWelcome.vue'
import HomeXiDianInVr from './HomeXiDianInVr.vue'
import HomeXingPingInVr from './HomeXingPingInVr.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    HomeWelcome,
    HomeXiDianInVr,
    HomeXingPingInVr,
    Footer
  },
  computed: {
    isExpanded () {
      return this.$store.state.isExpanded
    }
  },
  mounted () {
    document.title = 'Sta | ' + this.$route.name
  }
}
</script>

<style lang="scss">
.home-main {
  top: 0.8rem;
}

.home-block-wrapper {
  background-color: #eee;
  font-size: 100%;
  &:nth-child(2n) {
    background-color: #ddd;
  }
}

.home-block {
  position: relative;
  width: 1920px;
  height: 810px;
  margin-bottom: 0.1em;
  background-size: 1920px 810px;
  background-repeat: no-repeat;
  left: 50%;
  transform: translateX(-50%);
  font-size: 100%;
}

@media only screen and (max-width: 1199px) {
  .home-block-wrapper {
    font-size: 75%;
  }
  .home-block {
    width: 1440px;
    height : 607px;
    background-size: 1440px 607px;
  }
}

@media only screen and (max-width: 819px) {
  .home-main-wrapper {
    overflow-x: hidden;
    transform: translateX(0);
    transition: transform 0.5s;
    &.expanded {
      transform: translateX(70vw);
    }
  }
  .home-block-wrapper {
    font-size: 50%;
  }
  .home-block {
    width: 900px;
    height: 380px;
    background-size: 900px 380px;
  }
}
</style>
