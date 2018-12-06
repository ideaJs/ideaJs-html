<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="appRegiste">
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
  name: 'appRegiste',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    start () {
    }
  },
  components: {
    appHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
