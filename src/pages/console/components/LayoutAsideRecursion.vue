<template>
  <el-menu-item v-if="isTheOnly()" :route="{ name: item.name }" :index="item.name" >
    <svg-icon v-if="hasIcon()" :symbolId="calculatedId" class="sidebar"/>
    <span slot="title">{{ item.name }}</span>
  </el-menu-item>
  <el-submenu v-else :index="item.name">
    <template slot="title">
      <svg-icon v-if="hasIcon()" :symbolId="calculatedId" class="sidebar"/>
      <span slot="title">{{ item.name }}</span>
    </template>
    <LayoutAsideRecursion v-for="route in showingRoutes" :key="route.name" :child="route"/>
  </el-submenu>
</template>

<script>
export default {
  name: 'LayoutAsideRecursion',
  props: {
    child: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      item: this.child
    }
  },
  computed: {
    calculatedId () {
      return '#svg-' + this.item.meta.icon
    },
    showingRoutes () {
      return this.item.children.filter(child => this.isShowing(child))
    }
  },
  methods: {
    isTheOnly () {
      if (!this.item.children) {
        return true
      } else if (this.showingRoutes.length < 2) {
        this.item = this.showingRoutes.length === 2 ? this.showingRoutes[0] : this.item
        return true
      } else {
        return false
      }
    },
    isShowing (item) {
      if (!item.meta) {
        return true
      } else if (!item.meta.hidden) {
        return true
      } else {
        return false
      }
    },
    hasIcon () {
      if (!this.item.meta) {
        return false
      } else if (!this.item.meta.icon) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style type="scss" scoped>
  .sidebar {
    margin-right: 5px;
    width: 24px;
    vertical-align: middle;
  }
</style>
