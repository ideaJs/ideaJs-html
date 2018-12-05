<!-- Created by macmzon on 2018/11/29-->
<template>
    <div class="appIndex">
      <Headers :headerData="headerData"></Headers>
      <el-button type="success" round @click.active="back()">上一页</el-button>
      <el-button type="success" round @click.active="start()">下一页</el-button>
    </div>
</template>
<script>
  import Headers from'@/components/config/headers.vue'

  export default {
    name: 'appIndex',
    data () {
      return {
        headerData: 'appIndex'
      }
    },
    mounted () {
    },
    methods: {
      start () {
        this.$push({
          path: '/',
          query: {
            type: '3'
          }
        })
      },
      back () {
        this.$push({
          path: '/login',
          query: {
            type: '3'
          }
        })
      }
    },
    components: {
      Headers
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appIndex.styl"
</style>
