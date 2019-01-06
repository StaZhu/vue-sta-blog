<template>
  <el-container class="main-contaier">
    <LayoutAside/>
    <el-container direction="vertical">
      <LayoutHeader/>
      <LayoutMain/>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from './LayoutAside.vue'
import LayoutHeader from './LayoutHeader.vue'
import LayoutMain from './LayoutMain.vue'

export default {
  name: 'Layout',
  beforeCreate () {
    this.$store.dispatch('initSidebar')
  },
  components: {
    LayoutAside,
    LayoutHeader,
    LayoutMain
  }
}
</script>

<style lang="scss">
.main-contaier {
  height: 100%;
}
</style>

<style lang="scss" scoped>
</style>
