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
          <div class="p-user">
            <span v-if="data.userLogin">{{data.user.user}}</span>
            <span @click="userLogin()" v-if="!data.userLogin" class="p-login">登录</span>
          </div>
          <div v-if="data.user" class="p-course">
            <Row>
                <Col @click.native="goLearning()" span="8">
                  <div v-if="data.userLogin" class="">{{data.courseLen}}</div>
                  <div v-if="!data.userLogin" class="">--</div>
                  <div class="">在学课程</div>
                </Col>
                <Col span="8">
                  <div v-if="data.userLogin" class="">{{data.commend.length - data.courseLen}}</div>
                  <div v-if="!data.userLogin" class="">--</div>
                  <div class="">未学课程</div>
                </Col>
                <Col span="8">
                  <div v-if="data.userLogin" class="">{{data.user.jifen}}</div>
                  <div v-if="!data.userLogin" class="">--</div>
                  <div class="">积分</div>
                </Col>
            </Row>
          </div>
          <div class="">
          </div>
        </div>
        <div @click="quit()" class="p-quit">退出登录
        </div>
        <div class="p-kefu"  @click="kefu()">客服
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button, Row, Col, Modal } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
  import { getCommend } from '../../common/js/getCommend.js'
export default {
  name: 'appMember',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: '',                  // 客户登录状态
        headerInfo: this.$route.meta,
        commend: {},
        courseLen: 0
      }
    }
  },
  mounted () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.commend = getCommend()                             // 获取课程信息
      this.data.courseLen = Object.keys(this.data.user.course).length
      this.data.user.jifen = this.data.courseLen * 10
      localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
    }
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getSet             // header右侧菜单按钮事件
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
    goLearning () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appIndex',
        query: {
          tabName: 'learn'
        }
      })
    },
    kefu () {
      Modal.confirm({
        title: '信息提示',
        content: '请联系QQ客服：1993239039',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
        },
        onCancel: () => {
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
    quit () {
      if (this.data.userLogin) {
        this.data.userLogin = ''
        localStorage.setItem('userLogin', '')
        Modal.success({
          title: '信息提示',
          content: '成功退出登录！',
          okText: '确定',
          onOk: () => {
            this.$router.go(0)
          }
        })
      } else {
        Modal.success({
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
    Button, Popup, appHeader, Row, Col, Modal
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appMember.styl"
</style>