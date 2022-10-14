<template>
  <div class="home">
    <el-container>
      <SideBox />
      <el-container>
        <el-header><HeaderBox /></el-header>
        <el-main><MainBox /></el-main>
        <el-footer><FooterBox /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SideBox from './components/SideBox'
import HeaderBox from './components/HeaderBox'
import FooterBox from './components/FooterBox'
import MainBox from './components/MainBox'
export default {
  name: 'home',
  components: {
    SideBox,
    HeaderBox,
    FooterBox,
    MainBox
  }
}
</script>

<style lang="scss" scoped>
.home {
  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    height: $height-header !important;
  }
  .el-footer {
    height: $height-footer !important;
  }
  .el-main {
    width: 100%;
    overflow: hidden;
  }
  .el-side,
  .el-header,
  .el-main,
  .el-footer {
    padding: 0;
  }
}
</style>
