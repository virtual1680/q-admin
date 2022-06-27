<template>
  <basic-container>
    <h3>{{index?index:'参数'}}</h3>
    <el-button type="primary"
               @click="handleGo(1)">参数1页面</el-button>
    <el-button type="primary"
               @click="handleGo(2)">参数2页面</el-button>
  </basic-container>
</template>

<script>
export default {
  data () {
    return {
      index: ''
    }
  },
  watch: {
    $route () {
      this.handleInit()
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      this.index = this.$route.params.params;
    },
    handleGo (index) {
      this.$router.push({ path: '/query/' + index, query: { name: "参数" + index } })
    }
  }
}
</script>

<style>
</style>