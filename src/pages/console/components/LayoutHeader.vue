<template>
  <el-header height="50px">
    <div class="hamburger-container">
      <svg-icon symbolId="#svg-hamburger" @click.native="toggleSidebar" class="hamburger" :class="{ collapse: isCollapsed }"/>
    </div>
    <LayoutHeaderBreadcrumb/>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <router-link :to="{ name: 'Console' }"><el-dropdown-item >主页</el-dropdown-item></router-link>
        <el-dropdown-item divided @click.native="dialogVisible = true">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="确定退出登录？"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      center
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
  </el-header>
</template>

<script>
import LayoutHeaderBreadcrumb from './LayoutHeaderBreadcrumb.vue'
export default {
  name: 'LayoutHeader',
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {
    isCollapsed () {
      return this.$store.state.isCollapsed
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    toggleSidebar () {
      this.$store.dispatch('toggleSidebar')
    },
    logout () {
      this.dialogVisible = false
      this.$store.dispatch('logout')
      this.$router.push({ name: 'Login' })
    }
  },
  components: {
    LayoutHeaderBreadcrumb
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  position: relative;
  width: 100%;
  font-size: 14px;

  .hamburger-container {
    display: inline-block;
    height: 50px;
    padding: 12px 8px;
    .hamburger {
      width: 26px;
      height: 26px;
      cursor: pointer;
      transition: 0.3s transform ease-out;
      transform: rotate(0deg);
      &.collapse {
        transform: rotate(90deg);
      }
    }
  }

  .el-dropdown {
    position: absolute;
    right: 0px;
    margin: 18px 18px;
    line-height: 1;
    cursor: pointer;
  }
}
</style>
