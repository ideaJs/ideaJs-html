<!--启动页 Created by macmzon on 2018/11/2-->
<template>
  <div class="startPage">
    <el-button type="success" round @click.active="start()">登录</el-button>
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
  },
  methods: {
    start () {
//      this.$post('welcome', {name: 'welcome'}, (res) => {
//        console.log(res)
//      })
      this.$push({
        path: '/login',
        query: {
          type: '3'
        }
      })
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
