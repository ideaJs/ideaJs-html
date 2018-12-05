<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="news">
    news
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      msg: 'news'
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
  .news
    background: #fff
</style>
