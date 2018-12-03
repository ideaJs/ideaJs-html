<!--启动页 Created by macmzon on 2018/11/2-->
<template>
  <div class="startPage">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import {Loading} from 'element-ui'
export default {
  name: 'startPage',
  data () {
    return {
      msg: 'startPage'
    }
  },
  mounted () {
//    this.start()
  },
  methods: {
    start () {
//      this.$post('welcome', {name: 'welcome'}, (res) => {
//        console.log(res)
//      })
      setTimeout(() => {
        this.$push({
          path: '/login',
          query: {
            type: '3'
          }
        })
      }, 300000)
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="stylus">
  @import "stylus/startPage.styl"
</style>
