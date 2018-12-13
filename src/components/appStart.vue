<!--启动页 Created by macmzon on 2018/11/2-->
<template>
  <div class="appStart">
    <Button type="primary" :loading="data.loading" @click="start">
      <span v-if="!data.loading">开始</span>
      <!--<span v-else>Loading...</span>-->
    </Button>
    <!--<button type="success" round @click.active="start()">开始</button>-->
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'
export default {
  name: 'appStart',
  data () {
    return {
      data: {
        loading: false
      }
    }
  },
  mounted () {
    this.$route.meta.touch.leftFuc = this.start // 页面向左滑动事件
//    this.$route.meta.touch.rightFuc = this.back // 页面向右滑动事件
  },
  methods: {
    start () {
//      this.$post('welcome', {name: 'welcome'}, (res) => {
//        console.log(res)
//      })
      this.data.loading = true
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
    Group,
    Cell
  }
}
</script>
<style lang="stylus">
  @import "appStylus/appStart.styl"
</style>
