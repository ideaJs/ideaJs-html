<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="appSet">
    <appHeader :headerInfo="headerInfo"></appHeader>
    <div class="">
      <el-button type="success" round @click.active="back()">上一页</el-button>
    </div>
  </div>
</template>

<script>
  import appHeader from'@/components/appConfig/appHeader.vue'
  export default {
    name: 'appSet',
    data () {
      return {
        headerInfo: this.$route.meta
      }
    },
    mounted () {
      this.$route.meta.header.leftFuc = this.back
    },
    methods: {
      back () {
        this.$route.meta.isBack = true
        this.$back({
          path: '/appIndex',
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
</style>
