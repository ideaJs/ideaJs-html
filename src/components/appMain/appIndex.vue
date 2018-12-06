<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="appIndex">
    <appHeader :headerInfo="headerInfo"></appHeader>
    <div class="">
      <el-button type="success" round @click.active="back()">上一页</el-button>
      <el-button type="success" round @click.active="start()">下一页</el-button>
    </div>
  </div>
</template>
<script>
  import appHeader from'@/components/appConfig/appHeader.vue'
  export default {
    name: 'appIndex',
    data () {
      return {
        headerInfo: this.$route.meta
      }
    },
    mounted () {
      this.$route.meta.header.leftFuc = this.back
    },
    methods: {
      start () {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appMenu',
          query: {
            type: '3'
          }
        })
      },
      back () {
        this.$route.meta.isBack = true
        this.$back({
          path: '/appLogin',
          query: {
            type: '3'
          }
        })
      }
    },
    components: {
      appHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appIndex.styl"
</style>
