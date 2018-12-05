<!-- Created by macmzon on 2018/11/29-->
<template>
    <div class="name">

    </div>
</template>
<script>
  export default {
    name: 'name',
    data () {
      return {
        msg: 'msg'
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
    .name
        background: #fff
</style>
