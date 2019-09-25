<!-- Created by macmzon@163.com-->
<template>
  <div class="Welcome">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">

    </div>
  </div>
</template>

<script>
import { Group, Cell, Popup } from 'vux'
import { Button } from 'iview'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'Welcome',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: localStorage.getItem('userLogin'),     // 客户登录状态
        headerInfo: this.$route.meta
      }
    }
  },
  created () {
  },
  methods: {
    start () {
      this.$post('welcome', {name: 'welcome'}, {}, (res) => {
        // console.log(res)
      })
      setTimeout(() => {
        this.$push({
          path: '/login',
          query: {
            type: '3'
          }
        }, this)
      }, 3000)
    }
  },
  components: {
    Group, Cell, Button, Popup, appHeader
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .Welcome
    background: #fff
</style>
