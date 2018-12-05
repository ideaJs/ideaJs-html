<!-- Created by macmzon on 2018/11/29-->
<template>
  <div v-if="$route.meta.header !== 'StartPage'" class="headers">
    <div>
      <div v-if="$route.meta.header === 'AppIndex'"><i class="el-icon-menu" @click=""></i></div>
      <div v-if="$route.meta.header !== 'AppIndex'"><i class="el-icon-arrow-left" @click=""></i></div>
      <div><span>{{$route.meta.title}}</span></div>
      <div v-if="$route.meta.header === 'AppIndex'"><i class="el-icon-setting" @click=""></i></div>
      <div v-if="$route.meta.header !== 'AppIndex'"><i class="el-icon-menu" @click=""></i></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'headers',
    data () {
      return {
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
  @import "stylus/headers.styl"
</style>
