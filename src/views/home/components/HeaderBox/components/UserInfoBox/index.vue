<template>
  <el-popover
    placement="bottom"
    width="200"
    trigger="manual"
    content="默认内容"
    v-model="userInfoVisible"
  >
    <div class="user_info_box">
      <el-avatar
        class="avatar"
        :size="80"
        :src="userInfo && userInfo.avatar"
      ></el-avatar>
      <div class="name">{{ (userInfo && userInfo.name) || '未登陆' }}</div>
      <div class="command_btns" v-if="!userInfo">
        <el-button @click="registerFormVisible = true">注册</el-button>
        <el-button @click="loginFormVisible = true">登录</el-button>
      </div>
      <div class="command_btns" v-else>
        <el-button>退出登录</el-button>
      </div>
    </div>

    <el-dialog :visible.sync="isShowDialog" :append-to-body="true">
      <RegisterBox v-if="registerFormVisible" />
      <LoginBox v-if="loginFormVisible" />
    </el-dialog>

    <div slot="reference" class="avatar_area" @click="toggleUserInfoVisible">
      <el-avatar :src="(userInfo && userInfo.avatar) || null"></el-avatar>
    </div>
  </el-popover>
</template>

<script>
import { mapState } from 'vuex'
import RegisterBox from './components/RegisterBox'
import LoginBox from './components/LoginBox'

export default {
  name: 'UserInfoBox',
  components: {
    RegisterBox,
    LoginBox
  },
  data() {
    return {
      userInfoVisible: false,
      registerFormVisible: false,
      loginFormVisible: false
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo
    }),
    isShowDialog: {
      get() {
        return this.registerFormVisible || this.loginFormVisible
      },
      set() {
        this.registerFormVisible = false
        this.loginFormVisible = false
      }
    }
  },
  methods: {
    toggleUserInfoVisible() {
      this.userInfoVisible = !this.userInfoVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar_area {
  cursor: pointer;
}
.user_info_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .name {
    margin-top: 8px;
  }
  .command_btns {
    margin-top: 15px;
  }
}
</style>
