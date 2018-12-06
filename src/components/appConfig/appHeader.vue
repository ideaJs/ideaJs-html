<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="appHeader">
    <div>
      <!--header左侧按钮left-->
      <div><i :class="'el-icon-' + headerInfo.header.left" @click="headerInfo.header.leftFuc()"></i></div>
      <!--header标题title-->
      <div><span>{{headerInfo.title}}</span></div>
      <!--header右侧按钮right-->
      <div><i :class="'el-icon-' + headerInfo.header.right" @click="headerInfo.header.rightFuc()"></i></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'appHeader',
    props: {
      headerInfo: {}
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      start () {
        console.log('start')
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appHeader.styl"
</style>
