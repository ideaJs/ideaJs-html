<!-- Created by macmzon on 2018/11/29-->
<template>
    <div class="index">

    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        msg: 'index'
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
  .index
      background: #fff
</style>
