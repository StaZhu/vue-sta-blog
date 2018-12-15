<template >
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="route in routes" :key="route.name" :to="{ name: route.name }">{{ route.name }}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'LayoutHeaderBreadcrumb',
  computed: {
    routes () {
      return this.$route.matched.filter(item => { return !!item.name })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  display: inline-block;
  padding: 18px 7px;
}

.breadcrumb-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.breadcrumb-enter {
  opacity: 0;
  transform: translateY(-20px);
  position: absolute;
}

.breadcrumb-leave-active {
  transition: all .2s;
  position: absolute;
}

.breadcrumb-enter-active {
  transition: all .9s;
}
</style>
