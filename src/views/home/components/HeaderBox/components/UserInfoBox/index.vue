<template>
  <el-popover
    placement="bottom"
    width="200"
    trigger="manual"
    content="默认内容"
    v-model="_isShowUserInfoBox"
  >
    <div class="user_info_box">
      <el-avatar class="avatar" :size="50" :src="userInfo && userInfo.avatar">
        <i class="el-icon-user-solid"></i>
      </el-avatar>
      <div class="name">
        {{ (userInfo && `${userInfo.name} (ID: ${userInfo.id})`) || '未登陆' }}
      </div>
      <div class="command_btns" v-if="!userInfo">
        <el-button @click="showRegisterBox">注册</el-button>
        <el-button @click="showLoginBox">登录</el-button>
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
        ref="registerBox"
        v-if="registerFormVisible"
        :is-show.sync="registerFormVisible"
        :show-login="showLoginBox"
      />
      <LoginBox
        ref="loginBox"
        v-if="loginFormVisible"
        :is-show.sync="loginFormVisible"
      />
    </el-dialog>

    <div
      slot="reference"
      class="avatar_area"
      @click.stop="toggleUserInfoVisible"
    >
      <el-avatar :src="(userInfo && userInfo.avatar) || null"
        ><i class="el-icon-user-solid"></i
      ></el-avatar>
      <span class="nickname">
        {{ (userInfo && `${userInfo.nickname}`) || '未登陆' }}
      </span>
    </div>
  </el-popover>
</template>

<script>
import { mapState } from 'vuex'
import RegisterBox from './components/RegisterBox'
import LoginBox from './components/LoginBox'
import { getHomeData } from '@/util'

export default {
  name: 'UserInfoBox',
  components: {
    RegisterBox,
    LoginBox
  },
  data() {
    return {
      registerFormVisible: false,
      loginFormVisible: false
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
      isShowUserInfoBox: (state) => state.isShowUserInfoBox
    }),
    _isShowUserInfoBox: {
      get() {
        return this.isShowUserInfoBox
      },
      set(newValue) {
        this.$store.commit('SET_IS_SHOW_USER_INFO_BOX', newValue)
      }
    },
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
    showRegisterBox() {
      this.registerFormVisible = true
      // 聚焦"用户名"输入框
      this.$nextTick(() => {
        this.$refs.registerBox.$refs.refName.focus()
      })
    },
    showLoginBox() {
      this.loginFormVisible = true
      // 聚焦"用户名"输入框
      this.$nextTick(() => {
        this.$refs.loginBox.$refs.refName.focus()
      })
    },
    toggleUserInfoVisible() {
      this._isShowUserInfoBox = !this._isShowUserInfoBox
    },
    logout() {
      this.$store.commit('SET_USER_INFO', null)
      localStorage.removeItem('token')
      getHomeData.call(this)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar_area {
  display: flex;
  align-items: center;
  cursor: pointer;
  .nickname {
    margin-left: 5px;
    font-size: 14px;
  }
}
.el-avatar {
  width: 30px;
  height: 30px;
  line-height: 30px;
  background-color: $color-side-title;
  flex-shrink: 0;
  flex-grow: 0;
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
