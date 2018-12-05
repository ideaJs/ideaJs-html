<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="member">
    member
  </div>
</template>

<script>
export default {
  name: 'member',
  data () {
    return {
      msg: 'member'
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
  .member
    background: #fff
</style>
