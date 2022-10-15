<template>
  <div class="login_box">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog_footer">
      <el-button @click="registerFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleRegister">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginBox',
  data() {
    return {
      form: {
        name: '',
        nickname: '',
        sex: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '70px'
    }
  },
  methods: {
    // 注册
    handleRegister() {
      console.log('handleRegister')
    }
  }
}
</script>

<style lang="scss" scoped>
.login_box {
  .dialog_footer {
    text-align: right;
  }
}
</style>
