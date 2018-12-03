<!-- Created by macmzon on 2018/11/29-->
<template>
    <div v-if="$route.meta.header !== 'StartPage'" class="headerLine">
      <div v-if="$route.meta.header === 'AppIndex'">
        <div><i class="el-icon-menu" @click=""></i></div>
        <div><span>{{$route.meta.title}}</span></div>
        <div><i class="el-icon-setting" @click=""></i></div>
      </div>
      <div v-if="$route.meta.header !== 'AppIndex'">
        <div><i class="el-icon-arrow-left" @click=""></i></div>
        <div><span>{{$route.meta.title}}</span></div>
        <div><i class="el-icon-menu" @click=""></i></div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'headerLine',
    data () {
      return {
        headerType: 'firstPage' // default默认，firstPage首页，custom自定义
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
  @import "stylus/headerLine.styl"
</style>
