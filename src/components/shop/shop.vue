<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="shop">
    shop
  </div>
</template>

<script>
export default {
  name: 'shop',
  data () {
    return {
      msg: 'shop'
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
  .shop
    background: #fff
</style>
