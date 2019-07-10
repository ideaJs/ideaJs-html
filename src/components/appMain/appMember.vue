<!-- Created by macmzon@163.com-->
<template>
  <div class="appMember">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="">
        <div class="p-face" @click="changeFace()">
          <img v-if="data.face" :src="data.face" />
        </div>
        <div class="p-head">
          <div class="p-newDate">
            <span>{{data.newDate}}</span>
            <span>{{data.newWeek}}</span>
          </div>
          <div class="p-user">
            <span v-if="data.userLogin">{{data.user.user}}</span>
            <span @click="userLogin()" v-if="!data.userLogin" class="p-login">登录</span>
          </div>
          <div v-if="data.user" class="p-course">
            <Row>
                <Col span="8">
                  <div @click="goLearning()" class="">
                    <div v-if="data.userLogin" class="">{{data.courseLen}}</div>
                    <div v-if="!data.userLogin" class="">--</div>
                    <div class="">在学课程</div>
                  </div>
                </Col>
                <Col span="8">
                  <div @click="goUnlearn()" class="">
                    <div v-if="data.userLogin" class="">{{data.course.length - data.courseLen}}</div>
                    <div v-if="!data.userLogin" class="">--</div>
                    <div class="">未学课程</div>
                  </div>
                </Col>
                <Col span="8">
                  <div v-if="data.userLogin" class="">{{data.user.jifen}}</div>
                  <div v-if="!data.userLogin" class="">--</div>
                  <div class="">积分</div>
                </Col>
            </Row>
          </div>
        </div>
        <div class="p-main">
          <Row class="p-main-a">
            <Col span="12">
              <div @click="goFriends()" class="p-friend">
                <Icon type="ios-people" />
                <div class="">朋友圈
                </div>
              </div>
            </Col>
            <Col span="12">
              <div @click="goCollectEnWords()" class="p-word">
                <Icon type="md-list-box" />
                <div class="">生词本
                </div>
              </div>
            </Col>
          </Row>
          <Row class="p-main-b">
            <Col span="6">
              <div @click="goMessage()" class="p-message">
                <Icon type="md-chatboxes" />
                <div class="">消息
                </div>
              </div>
            </Col>
            <Col span="6">
              <div @click="goVideo()" class="p-video">
                <Icon type="md-videocam" />
                <div class="">视频
                </div>
              </div>
            </Col>
            <Col span="6">
              <div @click="goProve()" class="p-prove">
                <Icon type="ios-contact" />
                <div class="">认证
                </div>
              </div>
            </Col>
            <Col span="6">
              <div @click="goCoupon()" class="p-order">
                <Icon type="md-cart" />
                <div class="">订单
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div class="p-main-c">
          <CellGroup>
            <Cell class="p-money" title="钱包" :extra="data.money" to="/appMoney?type=3">
              <Icon type="logo-usd" slot="icon" />
            </Cell>
            <Cell v-if="false" class="p-date" title="日历" :extra="data.date" to="/appDate?type=3">
              <Icon type="ios-calendar" slot="icon" />
            </Cell>
            <Cell v-if="false" class="p-texts" title="记事本" :extra="data.texts" to="/appTexts?type=3">
              <Icon type="md-bookmarks" slot="icon" />
            </Cell>
            <Cell v-if="false" class="p-wxcode" title="公众号" :extra="data.wxcode" to="/appWxcode?type=3">
              <Icon type="md-aperture" slot="icon" />
            </Cell>
            <Cell class="p-address" title="收货地址" :extra="data.address" to="/appAddress?type=3">
              <Icon type="md-globe" slot="icon" />
            </Cell>
            <Cell class="p-service" title="在线客服" :extra="data.service" to="/appService?type=3">
              <Icon type="ios-ionitron" slot="icon" />
            </Cell>
            <Cell class="p-pass" title="密码重置" :extra="data.pass" to="/appResetPass?type=3">
              <Icon type="ios-lock" slot="icon" />
            </Cell>
            <Cell class="p-about" title="关于我们" :extra="data.about" to="/appAbout?type=3">
              <Icon type="ios-contacts" slot="icon" />
            </Cell>
          </CellGroup>
        </div>
        <div @click="quit()" class="p-quit">退出登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let Base64 = require('js-base64').Base64
  import { Button, Row, Col, Modal, Icon, CellGroup, Cell } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
export default {
  name: 'appMember',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: '',                  // 客户登录状态
        headerInfo: this.$route.meta,
        course: [],
        unlearn: [],
        learn: [],
        face: '',
        money: '￥0.00',
        newDate: '-年-月-日',
        newWeek: '周-',
        courseLen: 0
      }
    }
  },
  mounted () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.face = this.data.user.face           // 头像
      this.getCourse()                              // 获取课程信息
    }
    this.getNewDate()
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getSet             // header右侧菜单按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appIndex',
        query: {
          menuName: 'course'
        }
      })
    },
    getCourse () {
      let data = require('../json/english/course.json')
      this.data.course = data.course
      this.data.courseLen = Object.keys(this.data.user.course).length
      this.data.user.jifen = this.data.courseLen * 10
      localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
    },
    getNewDate () {
      let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let week = date.getDay()
      this.data.newDate = year + '年' + month + '月' + day + '日'
      this.data.newWeek = weeks[week]
    },
    goLearning () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appIndex',
        query: {
          menuName: 'learn'
        }
      })
    },
    goUnlearn () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appIndex',
        query: {
          menuName: 'course'
        }
      })
    },
    goCollectEnWords () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appEnword',
        query: {
          type: 'collectEnWords'
        }
      })
    },
    goMessage () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appMessage',
        query: {
          type: '3'
        }
      })
    },
    goProve () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appProve',
        query: {
          type: '3'
        }
      })
    },
    goVideo () {
      Modal.warning({
        title: '信息提示',
        content: '暂未开启视频课程，敬请期待！',
        okText: '确定',
        onOk: () => {
        }
      })
      // this.$route.meta.isBack = false
      // this.$push({
      //   path: '/appVideo',
      //   query: {
      //     type: '3'
      //   }
      // })
    },
    changeFace () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appFace',
        query: {
          type: '3'
        }
      })
    },
    userLogin () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appLogin',
        query: {
          type: '3'
        }
      })
    },
    getSet () {
      if (this.data.userLogin) {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appSet',
          query: {
            type: '3'
          }
        })
      } else {
        this.userLogin()
      }
    },
    goCoupon () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appCoupon',
        query: {
          type: '3'
        }
      })
    },
    quit () {
      if (this.data.userLogin) {
        this.data.userLogin = ''
        localStorage.setItem('userLogin', '')
        Modal.warning({
          title: '信息提示',
          content: '成功退出登录！',
          okText: '确定',
          onOk: () => {
            this.$router.go(0)
          }
        })
      } else {
        Modal.warning({
          title: '信息提示',
          content: '已经退出登录！',
          okText: '确定',
          onOk: () => {
          }
        })
      }
    }
  },
  components: {
    Button, Popup, appHeader, Row, Col, Modal, Icon, CellGroup, Cell
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appMember.styl"
</style>