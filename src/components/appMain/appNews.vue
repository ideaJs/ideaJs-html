<!-- Created by macmzon@163.com-->
<template>
  <div class="appNews">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <Button type="success" round @click.active="back()">上一页</Button>
      <Button type="success" round @click.active="start()">下一页</Button>
    </div>
  </div>
</template>

<script>
  import { Button } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
export default {
  name: 'appNews',
  data () {
    return {
      showBack: false,
      data: {
        headerInfo: this.$route.meta
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appStart',
        query: {
          type: '3'
        }
      })
    }
  },
  components: {
    Button, Popup, appHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
