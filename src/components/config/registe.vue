<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="registe">
    registe
  </div>
</template>

<script>
export default {
  name: 'registe',
  data () {
    return {
      msg: 'registe'
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
  .registe
    background: #fff
</style>
