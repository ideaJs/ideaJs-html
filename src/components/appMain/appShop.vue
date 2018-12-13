<!-- Created by macmzon on 2018/11/29-->
<template>
  <div class="appShop">
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="">
      <button type="success" round @click.active="back()">上一页</button>
      <button type="success" round @click.active="start()">下一页</button>
    </div>
  </div>
</template>

<script>
  import appHeader from'@/components/appConfig/appHeader.vue'
export default {
  name: 'appShop',
  data () {
    return {
      data: {
        headerInfo: this.$route.meta
      }
    }
  },
  mounted () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getMenu             // header右侧菜单按钮事件
    this.$route.meta.touch.leftFuc = this.start                 // 页面向左滑动事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    start () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appIndex',
        query: {
          type: '3'
        }
      })
    },
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appStart',
        query: {
          type: '3'
        }
      })
    },
    getMenu () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appMenu',
        query: {
          type: '3'
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
