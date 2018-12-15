<template>
<div class="login-container">
  <el-form :model="user" :rules="rules">
    <h3 class="title">控制台</h3>
    <el-form-item prop="username">
      <el-input v-model.trim="user.username" placeholder="输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input :type="pwdType" v-model="user.password" @keyup.enter.native="submit" placeholder="输入密码"></el-input>
      <span class="show-pwd">
        <i class="el-icon-view" @click="showPWD"></i>
      </span>
    </el-form-item>
    <el-form-item>
      <el-button type="info" :loading="loading" @click="submit">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    let validateUser = (rule, value, callback) => {
      if (value.length < 5) {
        if (value === '') {
          return callback()
        } else {
          return callback(new Error('用户名至少为5位'))
        }
      } else {
        return callback()
      }
    }
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUser
          }
        ],
        password: [
          {
            required: true,
            trigger: 'change',
            message: '请输入密码'
          },
          {
            min: 6,
            message: '不能小于6位'
          },
          {
            max: 20,
            message: '不能大于20位'
          }
        ]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted () {
    document.title = 'Sta | ' + this.$route.name
  },
  methods: {
    submit () {
      this.loading = true
      this.$store.dispatch('login', this.user).then(() => {
        this.loading = false
        this.$router.push({ path: this.redirect || '/console' })
      }).catch(() => {
        this.loading = false
      })
    },
    showPWD () {
      this.pwdType = this.pwdType === 'password' ? '' : 'password'
    }
  }
}
</script>

<style lang="scss">
$light_gray: #eee;

.login-container {
  .el-input {
    width: 90%;
    height: 55px;
    input {
      background: transparent;
      color: $light_gray;
      border: 0px;
      padding: 0 30px;
      height: 55px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #1f1f1f;
$light_gray: #eee;
$dark_gray: #454545;

.login-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $bg;

  .title {
    color: $light_gray;
    font-size: 26px;
    text-align: center;
  }

  .el-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 120px auto;
    padding: 35px;
  }
  .el-form-item {
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  .el-button {
    width: 100%;
  }

  .show-pwd {
    color: $light_gray;
    cursor: pointer;
  }
}
</style>
