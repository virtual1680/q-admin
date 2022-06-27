<template>
  <basic-container class="affix">
    <el-affix target=".affix">
      <el-button type="primary">固定在最顶部</el-button>
    </el-affix>
    <div class="affix-line"></div>
    <el-affix target=".affix"
              :offset="50">
      <el-button type="primary">固定在距离顶部 50px 的位置</el-button>
    </el-affix>
    <div class="affix-line"></div>
    <el-affix target=".affix"
              :offset="100">
      <el-button type="primary">固定在距离顶部 100px 的位置</el-button>
    </el-affix>
    <div class="affix-line"></div>
    <el-affix target=".affix"
              :offset="150">
      <el-button type="primary">固定在距离顶部 150px 的位置</el-button>
    </el-affix>
    <div class="affix-line"></div>
    <div style="height:2000px;">
      <h3>往下拉就会出现图钉</h3>
    </div>
  </basic-container>
</template>

<script>
export default {};
</script>

<style lang="scss">
.affix {
  position: relative;
  &-line {
    height: 100px;
  }
}
</style>
