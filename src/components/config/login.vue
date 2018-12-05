<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="login">
    <Headers></Headers>
    <el-button type="success" round @click.active="start()">登录</el-button>
  </div>
</template>
<script>
  import Headers from'@/components/config/headers.vue'

  export default {
  name: 'login',
  data () {
    return {
      msg: 'login'
    }
  },
  mounted () {
  },
  methods: {
    start () {
      this.$push({
        path: '/appIndex',
        query: {
          type: '3'
        }
      })
    },
    back () {
      this.$push({
        path: '/login',
        query: {
          type: '3'
        }
      })
    }
  },
  components: {
    Headers
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/login.styl"
</style>
