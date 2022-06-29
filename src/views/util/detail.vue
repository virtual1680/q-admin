<template>
  <basic-container>
    <h3 v-if="isEdit">{{$route.query.id?'修改页面':'新增页面'}}</h3>
    <template v-else>
      <h3>详情页</h3>
      <el-button type="primary"
                 @click="handleGo()">新增页面</el-button>
      <el-button type="primary"
                 @click="handleGo(1)">编辑页面</el-button>
    </template>
  </basic-container>
</template>

<script>
export default {
  data () {
    return {
      index: ''
    }
  },
  computed: {
    isEdit () {
      return this.$route.path == '/detail/create'
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      this.index = this.$route.params.params;
    },
    handleGo (id) {
      this.$router.push({ path: '/detail/create', query: { id: id } })
    }
  }
}
</script>

<style>
</style>