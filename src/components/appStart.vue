<!--启动页 Created by macmzon on 2018/11/2-->
<template>
  <div class="appStart">
    <el-button type="success" round @click.active="start()">开始</el-button>
  </div>
</template>

<script>
import {Loading} from 'element-ui'
export default {
  name: 'appStart',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    start () {
//      this.$post('welcome', {name: 'welcome'}, (res) => {
//        console.log(res)
//      })
      this.$route.meta.isBack = false
      this.$push({
        path: '/appLogin',
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
  @import "appStylus/appStart.styl"
</style>
