<template>
  <el-menu :default-active="$route.name" :collapse="isCollapsed" mode="vertical" text-color="#bfcbd9" active-text-color="#409EFF" router>
    <LayoutAsideRecursion v-for="route in showingRoutes" :key="route.name" :child="route"/>
  </el-menu>
</template>

<script>
import LayoutAsideRecursion from './LayoutAsideRecursion.vue'

export default {
  name: 'LayoutAside',
  data () {
    return {
      routes: this.$router.options.routes[0].children
    }
  },
  computed: {
    isCollapsed () {
      return this.$store.state.isCollapsed
    },
    showingRoutes () {
      return this.routes.filter(child => this.isShowing(child))
    }
  },
  methods: {
    isShowing (item) {
      if (!item.meta) {
        return true
      } else if (!item.meta.hidden) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    LayoutAsideRecursion
  }
}
</script>

<style lang="scss">
$menuHover: #001528;
$menuBg: black;

.el-menu {
  background: $menuBg;
  border-right: 0;
  width: 200px;

  .el-menu-item, .el-submenu>.el-submenu__title {
    &:hover, &:focus {
      background: $menuHover;
    }
  }

  &.el-menu--collapse {
    width: 40px;
    min-width: 40px;

    .el-submenu>.el-submenu__title {
      padding-left: 8px !important;
    }
    .el-menu-item>.el-tooltip {
      padding-left: 9px !important;
    }
  }

  .sidebar {
    margin-right: 5px;
    width: 24px;
    vertical-align: middle;
  }
}
</style>
<style lang="scss" scoped>
.el-menu {
  overflow-y: scroll;
}
</style>
