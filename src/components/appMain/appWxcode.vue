<!-- Created by macmzon@163.com-->
<template>
  <div class="appWxcode">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="p-main">
        <div class="p-service">
          <div class="qrcode">
            “英语日记”公众号：快来扫码关注我们吧！
          </div>
          <div class="qrImg">
            <img :src='data.qrcode' />
          </div>
          <div class="activeCode">
            关注“英语日记”公众号，发送“激活码”三个字，领取<br>
            免费课程
          </div>
          <div class="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Icon } from 'iview'
import { Popup } from 'vux'
import appHeader from'@/components/appConfig/appHeader.vue'
import qrcode from '@/common/images/small-icon/qrcode.jpg'
export default {
  name: 'appWxcode',
  data () {
    return {
      showBack: false,
      data: {
        headerInfo: this.$route.meta,
        fromUrl: this.$route.query.fromUrl || '/appMember',
        qrcode: qrcode
      }
    }
  },
  created () {
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$back({
        path: this.data.fromUrl,
        query: {
          type: '3'
        }
      }, this)
    }
  },
  components: {
    Button, Icon, Popup, appHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appWxcode.styl"
</style>
