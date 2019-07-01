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
  import { Button, Modal, Icon, Input } from 'iview'
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
  mounted () {
    this.data.id = this.$route.query.id
    this.data.money = this.$route.query.money
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getMenu             // header右侧菜单按钮事件
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
        path: '/appIndex',
        query: {
          type: '3'
        }
      })
    },
    buyCourse () {
      Modal.confirm({
        title: '信息提示',
        content: '尊敬的客户，您好！由于系统问题，暂时无法在线购买课程，请联系QQ客服：1993239039',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.back()
        },
        onCancel: () => {
        }
      })
    },
    successActive () {
      Modal.warning({
        title: '信息提示',
        content: '课程激活成功！',
        okText: '确定',
        onOk: () => {
          this.back()
        }
      })
    },
    errorActive () {
      Modal.warning({
        title: '信息提示',
        content: '激活码错误，请重新激活！',
        okText: '确定',
        onOk: () => {
        }
      })
    },
    activation () {
      if (!this.data.userLogin) {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appLogin',
          query: {
            url: '/appSign?id=' + this.data.id + '&money=' + this.data.money
          }
        })
        return
      }
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
          if (Base64.encode(this.data.id) === this.data.activeCode) {
            this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
            this.data.user.course[Base64.encode(this.data.id)] = true
            localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
            setTimeout(() => {
              this.successActive()
            }, 1000)
          } else {
            setTimeout(() => {
              this.errorActive()
            }, 1000)
          }
        },
        onCancel: () => {
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
  components: {
    Button, Popup, appHeader, Modal, Icon, Input
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appSign.styl"
</style>