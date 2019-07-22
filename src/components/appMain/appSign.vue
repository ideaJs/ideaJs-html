<!-- Created by macmzon@163.com-->
<template>
  <div class="appSign">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="">
        <img width="100%" :src="data.bkImg" />
      </div>
      <div class=""></div>
      <div class="p-bottom">
        <Button type="warning" round @click="buyCourse()">购买课程 <span class="p-money">￥{{data.money}}</span></Button>
        <Button type="warning" round @click="activation()">激活课程</Button>
      </div>
    </div>
  </div>
</template>

<script>
  let Base64 = require('js-base64').Base64
  import { Button, Modal, Icon, Input, Message } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
	import bkImg from './images/bk123_01.png'
export default {
  name: 'appSign',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: '',                  // 客户登录状态
        title: '报名课程',
        id: '',
        money: '',
        bkImg: bkImg,
        showModal: false,
        headerInfo: this.$route.meta,
        activeCode: ''
      }
    }
  },
  created () {
    this.data.id = this.$route.query.id
    this.data.money = this.$route.query.money
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
    }
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      Message.destroy()
      this.$route.meta.isBack = true
      this.$back({
        path: '/appIndex',
        query: {
          menuName: 'learn'
        }
      })
    },
    buyCourse () {
      Message.destroy()
      Modal.warning({
        title: '信息提示',
        content: '尊敬的客户，您好！由于系统问题，暂时无法在线购买课程，请联系在线客服！',
        okText: '确定',
        onOk: () => {
        }
      })
    },
    successActive () {
      Message.info({
        content: '课程激活成功！',
        duration: 6,
        closable: true
      })
    },
    errorActive () {
      Message.info({
        content: '激活码错误，请重新激活！',
        duration: 6,
        closable: true
      })
    },
    activation () {
      Message.destroy()
      Modal.confirm({
        title: '请输入激活码',
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: '请输入激活码'
            },
            on: {
              input: (val) => {
                this.data.activeCode = val['path'][0]['value']
              }
            }
          })
        },
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          if (Base64.encode(this.data.id) === this.data.activeCode.slice(2)) {
            this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
            this.data.user.course[Base64.encode(this.data.id)] = true
            this.data.user.jifen = this.data.user.jifen + parseFloat(this.data.money)
            localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
            setTimeout(() => {
              this.successActive()
            }, 500)
          } else {
            setTimeout(() => {
              this.errorActive()
            }, 500)
          }
        },
        onCancel: () => {
        }
      })
    }
  },
  components: {
    Button, Popup, appHeader, Modal, Icon, Input, Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appSign.styl"
</style>
