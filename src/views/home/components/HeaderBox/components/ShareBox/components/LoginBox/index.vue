<template>
  <div class="login_box">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input
          ref="refName"
          v-model="form.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog_footer">
      <el-button @click="hideBox">取 消</el-button>
      <el-button type="primary" @click="handleLogin">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { serverUserLogin } from '@/api/user'
import { getHomeData } from '@/util'
export default {
  name: 'LoginBox',
  data() {
    return {
      form: {
        name: '',
        password: ''
      },
      formLabelWidth: '70px'
    }
  },
  methods: {
    // 注册
    handleLogin() {
      const loading = this.$loading({
        lock: true,
        text: '正在登录...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverUserLogin({ data: this.form }).then(async (res) => {
        const { code, data } = res
        loading.close()
        if (code === 0) {
          localStorage.setItem('token', data?.token)
          this.$store.commit('SET_USER_INFO', data.userInfo)
          await getHomeData.call(this)
          this.hideBox()
        } else {
          this.$message({
            message: data?.msg,
            type: 'error'
          })
        }
      })
    },
    // 关闭面板
    hideBox() {
      this.$emit('update:is-show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.login_box {
  .el-form {
    .el-form-item {
      :deep(.el-form-item__content) {
        width: 200px;
      }
    }
  }
  .dialog_footer {
    text-align: right;
  }
}
</style>
