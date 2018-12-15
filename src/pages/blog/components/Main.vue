<template>
  <transition name="main">
    <router-view/>
  </transition>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style lang="scss">
.main {
  position: relative;
  width: 100%;
  max-width: 1920px;
  left: 0;
  margin: 0 auto;
  overflow-x: hidden;
}

.main-enter {
  opacity: 0;
  transform: translateY(0px);
}

.main-enter-active {
  transition: all 0.2s;
}

.main-leave-active {
  transition: all 0.2s;
}

.main-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
