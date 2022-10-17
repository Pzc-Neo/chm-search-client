<template>
  <div class="register_box">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input
          ref="refName"
          v-model="form.name"
          autocomplete="off"
          maxlength="16"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input
          v-model="form.nickname"
          autocomplete="off"
          maxlength="16"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth">
        <el-input
          type="password"
          v-model="form.passwordConfirm"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.sex" placeholder="请选择活动区域">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog_footer">
      <el-button @click="hideBox">取 消</el-button>
      <el-button type="primary" @click="handleRegister">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { serverUserRegister } from '@/api/user'

export default {
  name: 'RegisterBox',
  data() {
    return {
      form: {
        name: '',
        nickname: '',
        password: '',
        passwordConfirm: '', // 密码确认
        sex: 1,
        email: ''
      },
      formLabelWidth: '70px'
    }
  },
  methods: {
    // 注册
    handleRegister() {
      serverUserRegister({ data: this.form }).then((res) => {
        const { code, data } = res
        if (code === 0) {
          this.$message({
            message: data?.msg,
            type: 'success'
          })
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
.register_box {
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
