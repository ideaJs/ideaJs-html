<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="appLogin">
    <div class="">
      <el-button type="success" round @click.active="back()">上一页</el-button>
      <el-button type="success" round @click.active="start()">下一页</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'appLogin',
  data () {
    return {
    }
  },
  mounted () {
    this.$route.meta.header.leftFuc = this.back
  },
  methods: {
    start () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appIndex',
        query: {
          type: '3'
        }
      })
    },
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appStart',
        query: {
          type: '3'
        }
      })
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appLogin.styl"
</style>
