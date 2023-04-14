<template>
  <div class="footer_box">
    <div class="left">当前版本为bata版</div>
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
  padding: 0px 10px;

  color: $color-side-title;
  background-color: $color-side-bg;
  .right {
    display: flex;
    .contact {
      display: flex;
      .email {
        color: $color-side-title;
        margin-left: 3px;
      }
    }
  }
}
</style>
