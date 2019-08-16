<!-- Created by macmzon@163.com-->
<template>
  <div class="appStart">
    <div class="container">
      <div class="appName">英语日记</div>
      <img class="startPage" :src='data.startPage001' />
      <div class="appTips">
        朝着你心中的方向，
        把握每一分每一秒，<br>
        生活便不会辜负你
      </div>
      <div class="datetime">
        <div>
          <div class="dateweek">
            {{data.date.week}}
          </div>
          <div class="dateyear">
            <div>
              {{data.date.year}}
            </div>
            <div>
              {{data.date.date}} / {{data.date.month}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="false" class="qrcode">
        <img :src="data.qrcode" />
        关注公众号
      </div>
      <Button type="primary" shape="circle" :loading="data.loading" @click="start">
        <span v-if="!data.loading">开始</span>
      </Button>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { Button } from 'iview'
import startPage001 from '@/common/images/startPage/startPage001.png'
import qrcode from '@/common/images/small-icon/qrcode.jpg'
export default {
  name: 'appStart',
  data () {
    return {
      show: false,
      data: {
        loading: false,
        date: {
          year: '',
          month: '',
          date: '',
          week: ''
        },
        startPage001: startPage001,
        qrcode: qrcode
      }
    }
  },
  created () {
    this.getDate()
    // this.$route.meta.touch.leftFuc = this.start // 页面向左滑动事件
    // this.$route.meta.touch.rightFuc = this.back // 页面向右滑动事件
  },
  methods: {
    start () {
      // this.$post('welcome', {name: 'welcome'}, (res) => {
      //   console.log(res)
      // })
      this.data.loading = true
      this.$route.meta.isBack = false
      this.$push({
        path: '/appIndex',
        query: {
          type: '3'
        }
      })
    },
    getDate () {
      let week = ['日', '一', '二', '三', '四', '五', '六']
      this.data.date.year = new Date().getFullYear()
      this.data.date.month = new Date().getMonth() + 1
      this.data.date.date = new Date().getDate()
      this.data.date.week = '星期' + week[new Date().getDay()]
    }
  },
  components: {
    Group, Cell, Button
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.appStart
  padding: 0 0!important
  >div
    padding: 0 0 0
    text-align: center
    .startPage
      width: 100%
      height: 40vh
  .appName
    position: absolute
    top: 0px
    left: 0
    width: 100%
    background: linear-gradient(rgba(160,13,5,0.9), rgba(211,139,44,0.8))
    font-size: 1.6rem
    color: #f3f3f3
    text-align: center
    height: 5.5vh
    line-height: 5.5vh
  .appTips
    margin-top: 1.6rem
    font-size: 1.4rem
    color: #9B7D58
  .datetime
    color: #9B7D58
    font-size: 1.4rem
    padding: 3px
    border: 1px solid #9B7D58
    width: 83%
    margin: 3vh auto 1.5vh
    >div
      border: 1px dotted #9B7D58
      >div
        display: inline-block
        width: 49%
        padding: 1.2rem
        height: 6rem
        vertical-align: middle
    .dateweek
      font-size: 3.1rem
      line-height: 4rem
    .dateyear
      >div
        font-size: 1.5rem
      >div:nth-child(1)
        font-size: 1.9rem
  .qrcode
    width: 6rem
    font-size: 1.2rem
    text-align: center
    color: #9B7D58
    position: fixed
    right: 1.5rem
    bottom: 1vh
    img
     width: 6rem
     height: 6rem
  .ivu-btn-primary
    width: 6rem
    height: 6rem
    padding: 0
    display: inline-block
    position: absolute
    left: calc(50% - 3.5rem)
    top: 88vh
    span
      font-size: 1.6rem
</style>
