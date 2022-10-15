<template>
  <el-popover
    placement="bottom"
    width="200"
    trigger="manual"
    content="默认内容"
    v-model="userInfoVisible"
  >
    <div class="user_info_box">
      <el-avatar class="avatar" :size="80" :src="userInfo && userInfo.avatar">
        <i class="el-icon-user-solid"></i>
      </el-avatar>
      <div class="name">{{ (userInfo && userInfo.name) || '未登陆' }}</div>
      <div class="command_btns" v-if="!userInfo">
        <el-button @click="registerFormVisible = true">注册</el-button>
        <el-button @click="loginFormVisible = true">登录</el-button>
      </div>
      <div class="command_btns" v-else>
        <el-button @click="logout">退出登录</el-button>
      </div>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="isShowDialog"
      :append-to-body="true"
    >
      <RegisterBox
        v-if="registerFormVisible"
        :is-show.sync="registerFormVisible"
      />
      <LoginBox v-if="loginFormVisible" :is-show.sync="loginFormVisible" />
    </el-dialog>

    <div slot="reference" class="avatar_area" @click="toggleUserInfoVisible">
      <el-avatar :src="(userInfo && userInfo.avatar) || null"
        ><i class="el-icon-user-solid"></i
      ></el-avatar>
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
    },
    dialogTitle() {
      if (this.registerFormVisible) {
        return '注册'
      } else {
        return '登录'
      }
    }
  },
  methods: {
    toggleUserInfoVisible() {
      this.userInfoVisible = !this.userInfoVisible
    },
    logout() {
      this.$store.commit('SET_USER_INFO', null)
      localStorage.removeItem('token')
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar_area {
  cursor: pointer;
}
.el-avatar {
  background-color: $color-side-title;
}
:deep(.el-dialog) {
  width: 340px;
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
