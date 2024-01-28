<template>
  <div class="footer_box">
    <div class="left">
      <span title="不然百度谷歌搜索引擎之类的无法使用"
        >需配合浏览器插件使用：</span
      >
      <el-link href="https://hao-api.neoweb.top/download?name=extension"
        >点击下载</el-link
      >
    </div>
    <div class="right">
      <div class="contact">
        <span class="label">联系我:</span>
        <el-link class="email" href="mailto:pzc_neo@foxmail.com"
          >Pzc_Neo@foxmail.com</el-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterBox'
}
</script>

<style lang="scss" scoped>
.footer_box {
  font-size: 15px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  overflow-x: scroll;
  padding: 0px 10px;

  color: $color-side-title;
  background-color: $color-side-bg;
  .el-link {
    color: $color-side-title;
  }
  .left {
    display: flex;
    min-width: 240px;
  }
  .right {
    display: flex;
    min-width: 240px;
    .contact {
      display: flex;
      .email {
        margin-left: 3px;
      }
    }
  }
}
</style>
