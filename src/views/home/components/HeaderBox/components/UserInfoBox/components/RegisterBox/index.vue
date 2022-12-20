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
      <el-form-item
        label="验证码"
        :label-width="formLabelWidth"
        class="verify_code"
      >
        <el-input v-model="form.verifyCode" autocomplete="off"></el-input>
        <el-button v-if="timeVerifyCode <= 0" @click="sendVerifyCode"
          >发送验证码</el-button
        >
        <el-button disabled v-else>剩余时间({{ timeVerifyCode }})</el-button>
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
import { serverPublicSendVerifyCode } from '@/api/public'

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
        email: '',
        verifyCode: ''
      },
      formLabelWidth: '70px',
      timeVerifyCode: 0 // 可再次发送验证码的剩余时间(单位：秒)
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    showLogin: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    /**
     * 发送验证码
     */
    sendVerifyCode() {
      serverPublicSendVerifyCode(this.form.email).then((res) => {
        const { code, data } = res
        if (code === 0) {
          console.log(data)
        } else {
          this.$message({
            message: data?.msg,
            type: 'error'
          })
        }
      })
      this.timeVerifyCode = 30
      const intervalTemp = setInterval(() => {
        this.timeVerifyCode -= 1
        if (this.timeVerifyCode <= 0) {
          clearInterval(intervalTemp)
        }
      }, 1000)
    },
    // 注册
    handleRegister() {
      serverUserRegister({ data: this.form }).then((res) => {
        const { code, data } = res
        if (code === 0) {
          this.$message({
            message: data?.msg,
            type: 'success'
          })
          this.$emit('update:is-show', false)
          this.showLogin()
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
    .el-form-item.verify_code {
      :deep(.el-form-item__content) {
        display: flex;
      }
    }
  }
  .dialog_footer {
    text-align: right;
  }
}
</style>
