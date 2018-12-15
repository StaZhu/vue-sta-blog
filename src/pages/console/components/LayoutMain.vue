<template>
  <el-main>
    <transition name="main">
      <router-view/>
    </transition>
  </el-main>
</template>

<script>
export default {
  name: 'LayoutMain',
  mounted () {
    document.title = 'Sta | ' + this.$route.name
  },
  updated () {
    document.title = 'Sta | ' + this.$route.name
  }
}
</script>

<style type="scss" scoped>
.el-main {
  font-size: 16px;
}
.main-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.main-enter {
  opacity: 0;
  transform: translateY(-20px);
  position: absolute;
}

.main-leave-active {
  transition: all .2s;
  position: absolute;
}

.main-enter-active {
  transition: all .9s;
}
</style>
