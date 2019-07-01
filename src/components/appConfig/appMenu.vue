<!-- Created by macmzon@163.com-->
<template>
  <div class="appMenu">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="tabMain container">
      <div v-for="dat in data.tabList">
        <div v-for="item in dat.list" class="tabList" @click="tabGo(item)">{{item.title}}</div>
      </div>
    </div>
    <div class="">
      <!-- <Button type="primary" round @click.active="back()">上一页</Button>
      <Button type="success" round @click.active="start()">下一页</Button> -->
    </div>
  </div>
</template>

<script>
  import { Button } from 'iview'
  import { Popup } from 'vux'
  import { getUsers } from '../../common/user/getUsers.js'
  import { getMenu } from '../../common/js/getMenu.js'
  import appHeader from'@/components/appConfig/appHeader.vue'
  export default {
    name: 'appMenu',
    data () {
      return {
        showBack: false,
        data: {
          headerInfo: this.$route.meta,
          tabShow: false,
          curTab: {
            title: '英语',
            list: []
          },
          tabList: []
        }
      }
    },
    mounted () {
      let phone = localStorage.getItem('userPhone')               // 获取客户手机号
      this.data.user = getUsers(phone)                            // 获取客户信息
      this.data.tabList = getMenu() 
      /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
      this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
      // this.$route.meta.header.rightFuc = this.getMember             // header右侧菜单按钮事件
      this.$route.meta.touch.leftFuc = this.start                 // 页面向左滑动事件
      this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    },
    methods: {
      start () {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appSet',
          query: {
            type: '3'
          }
        })
      },
      back () {
        this.$route.meta.isBack = true
        this.$back({
          path: '/appIndex',
          query: {
            type: '3'
          }
        })
      },
      tabGo (data) {
        console.log(data)
        this.$route.meta.isBack = false
        this.$push({
          path: '/appTab',
          query: {
            title: data.title,
            tabId: data.id
          }
        })
      },
      getMember () {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appMember',
          query: {
            type: '3'
          }
        })
      }
    },
    components: {
      appHeader, Button, Popup
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "stylus/appMenu.styl"
</style>
