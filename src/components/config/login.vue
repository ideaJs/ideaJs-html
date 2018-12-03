<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="login">
    login
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'login'
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      console.log(this.msg)
    }
  },
  components: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    background: #fff
</style>
