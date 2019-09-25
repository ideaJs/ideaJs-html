<!-- Created by macmzon@163.com-->
<template>
  <div class="appMember">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="">
        <div class="p-head">
          <div class="p-headImg" @click="seeMyInfo()">
            <img v-if="data.userLogin" :src="data.user.userInfo.headImg || data.headImg" />
          </div>
          <div class="p-newDate">
            <span>{{data.newDate}}</span>
            <span>{{data.newWeek}}</span>
          </div>
          <div class="p-user">
            <span v-if="data.userLogin">{{data.user.userInfo.user}}</span>
            <Button class="p-login" v-if="!data.userLogin" type="error" @click="userLogin()">
              登录
            </Button>
          </div>
          <div v-if="data.user" class="p-course">
            <Row>
                <Col span="8">
                  <div @click="goLearning()" class="">
                    <div class="">{{data.userLogin ? data.courseLen : '--'}}</div>
                    <div class="">在学课程</div>
                  </div>
                </Col>
                <Col span="8">
                  <div @click="goUnlearn()" class="">
                    <div class="">{{data.userLogin ? data.course.length - data.courseLen : '--'}}</div>
                    <div class="">未学课程</div>
                  </div>
                </Col>
                <Col span="8">
                  <div @click="goMoney()" class="">
                    <div class="">{{data.userLogin ? data.user.jifen : '0'}}</div>
                    <div class="">积分</div>
                  </div>
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
              <div @click="goNews()" class="p-news">
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
              <div @click="goOrder()" class="p-order">
                <Icon type="md-cart" />
                <div class="">订单
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div class="p-main-c">
          <CellGroup>
            <Cell @click.native="goMoney()" class="p-money" title="钱包" :extra="'￥' + (data.userLogin ? data.user.money.balance : '0.00')">
              <Icon type="logo-usd" slot="icon" />
              <Icon type="ios-arrow-forward" slot="icon" />
            </Cell>
            <Cell @click.native="goDate()" class="p-date" title="日历" :extra="data.date">
              <Icon type="ios-calendar" slot="icon" />
              <Icon type="ios-arrow-forward" slot="icon" />
            </Cell>
            <Cell @click.native="goTexts()" v-if="false" class="p-texts" title="记事本" :extra="data.texts">
              <Icon type="md-bookmarks" slot="icon" />
              <Icon type="ios-arrow-forward" slot="icon" />
            </Cell>
            <!-- <Cell @click.native="goWxcode()" class="p-wxcode" title="公众号" :extra="data.wxcode">
              <Icon type="md-aperture" slot="icon" />
              <Icon type="ios-arrow-forward" slot="icon" />
            </Cell>
            <Cell @click.native="goService()" class="p-service" title="在线客服" :extra="data.service">
              <Icon type="ios-ionitron" slot="icon" />
              <Icon type="ios-arrow-forward" slot="icon" />
            </Cell> -->
            <Cell @click.native="goAbout()" class="p-about" title="关于我们" :extra="data.about">
              <Icon type="ios-contacts" slot="icon" />
              <Icon type="ios-arrow-forward" slot="icon" />
            </Cell>
          </CellGroup>
        </div>
        <div class="p-quit">
          <Button class="x-button" type="error" size="large" @click="quit()">退出登录</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let Base64 = require('js-base64').Base64
import { Button, Row, Col, Modal, Icon, CellGroup, Cell } from 'iview'
import { Popup } from 'vux'
import { _getCourse } from '@/common/js/appMain/function'
import appHeader from '@/components/appConfig/appHeader.vue'
import headImg from './images/headImg.png'
export default {
  name: 'appMember',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: localStorage.getItem('userLogin'),     // 客户登录状态
        headerInfo: this.$route.meta,
        headImg: headImg,
        newDate: '-年-月-日',
        newWeek: '周-',
        money: '0.00',
        course: [],
        unlearn: [],
        learn: [],
        courseLen: 0
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getSet             // header右侧菜单按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.money = this.data.user.money.ballance || this.data.money
      this.getCourse()                              // 获取课程信息
    }
    this.getNewDate()
  },
  methods: {
    back () {
      this.$back({
        path: '/appIndex',
        query: {
          menuName: 'course'
        }
      }, this)
    },
    getCourse () {
      _getCourse((res) => {
        this.data.course = res.course
        this.data.courseLen = Object.keys(this.data.user.course).length
      })
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
      this.$back({
        path: '/appIndex',
        query: {
          menuName: 'learn'
        }
      }, this)
    },
    goUnlearn () {
      this.$back({
        path: '/appIndex',
        query: {
          menuName: 'course'
        }
      }, this)
    },
    goMoney () {
      if (this.data.userLogin) {
        this.$push({
          path: '/appMoney',
          query: {
            type: '3'
          }
        }, this)
      } else {
        this.userLogin('/appMoney?type=3')
      }
    },
    goDate () {
      this.$push({
        path: '/appCalendar',
        query: {
          type: '3'
        }
      }, this)
    },
    goTexts () {
      if (this.data.userLogin) {
        this.$push({
          path: '/appTexts',
          query: {
            type: '3'
          }
        }, this)
      } else {
        this.userLogin('/appTexts?type=3')
      }
    },
    goWxcode () {
      this.$push({
        path: '/appWxcode',
        query: {
          type: '3'
        }
      }, this)
    },
    goService () {
      this.$push({
        path: '/appService',
        query: {
          type: '3'
        }
      }, this)
    },
    goAbout () {
      this.$push({
        path: '/appAbout',
        query: {
          type: '3'
        }
      }, this)
    },
    goFriends () {
      if (this.data.userLogin) {
        this.$push({
          path: '/appFriends',
          query: {
            type: '3'
          }
        }, this)
      } else {
        this.userLogin('/appFriends?type=3')
      }
    },
    goCollectEnWords () {
      if (this.data.userLogin) {
        this.$push({
          path: '/appEnword',
          query: {
            type: 'collectEnWords'
          }
        }, this)
      } else {
        this.userLogin('/appEnword?type=collectEnWords')
      }
    },
    goNews () {
      if (this.data.userLogin) {
        this.$push({
          path: '/appNews',
          query: {
            type: '3'
          }
        }, this)
      } else {
        this.userLogin('/appNews?type=3')
      }
    },
    goProve () {
      if (this.data.userLogin) {
        this.$push({
          path: '/appProveResult',
          query: {
            type: '3'
          }
        }, this)
      } else {
        this.userLogin('/appProve?type=3')
      }
    },
    goVideo () {
      Modal.warning({
        title: '信息提示',
        content: '暂未开启视频课程，敬请期待！',
        okText: '确定',
        onOk: () => {
        }
      })
      // if (this.data.userLogin) {
      //   this.$push({
      //     path: '/appVideo',
      //     query: {
      //       type: '3'
      //     }
      //   }, this)
      // } else {
      //   this.userLogin('/appVideo?type=3')
      // }
    },
    seeMyInfo () {
      if (this.data.userLogin) {
        this.$push({
          path: '/appSeeInfo',
          query: {
            idex: '-1',
            url: '/appMember?type=3'
          }
        }, this)
      } else {
        this.userLogin('/appOrder?idex=-1&url=/appMember?type=3')
      }
    },
    userLogin (url) {
      this.$push({
        path: '/appLogin',
        query: {
          fromUrl: '/appMember',
          toUrl: url
        }
      }, this)
    },
    getSet () {
      this.$push({
        path: '/appSet',
        query: {
          type: '3'
        }
      }, this)
    },
    goOrder () {
      if (this.data.userLogin) {
        this.$push({
          path: '/appOrder',
          query: {
            type: '3'
          }
        }, this)
      } else {
        this.userLogin('/appOrder?type=3')
      }
    },
    quit () {
      if (this.data.userLogin) {
        this.data.userLogin = ''
        localStorage.setItem('userLogin', '')
        this.data.user = {}
        Modal.warning({
          title: '信息提示',
          content: '成功退出登录！',
          okText: '确定',
          onOk: () => {
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
