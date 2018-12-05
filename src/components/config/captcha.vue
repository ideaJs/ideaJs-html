<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="captcha">
    captcha
  </div>
</template>

<script>
export default {
  name: 'captcha',
  data () {
    return {
      msg: 'captcha'
    }
  },
  mounted () {
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
  .captcha
    background: #fff
</style>
