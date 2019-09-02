<!-- Created by macmzon@163.com-->
<template>
  <div class="appSeeInfo">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="p-active">
        <div class="p-headImg" @click="changeHeadImg()">
          <img :src="data.friends.headImg || data.headImg" />
        </div>
        <div class="active-user">
          <Icon v-if="data.friends.sex[0] === '男'" type="ios-man" />
          <Icon v-if="data.friends.sex[0] === '女'" type="ios-woman" />
          {{data.friends.user}}
          <span v-if="data.friends.label">({{data.friends.label}})</span>
        </div>
        <Row v-if="data.idex !== -1" class="p-list">
          <Col span="6">类型：
          </Col>
          <Col class="p-right" span="18">
            <span>{{data.friends.type[0]}}</span>
          </Col>
        </Row>
        <Row class="p-list">
          <Col span="6">手机号：
          </Col>
          <Col class="p-right" span="18">
            <a :href="'tel:' + data.friends.phone"><span>{{data.friends.phone || '--'}}</span></a>
          </Col>
        </Row>
        <Row class="p-list">
          <Col span="6">微信：
          </Col>
          <Col class="p-right" span="18">
            <span>{{data.friends.weixin || '--'}}</span>
          </Col>
        </Row>
        <Row class="p-list">
          <Col span="6">QQ：
          </Col>
          <Col class="p-right" span="18">
            <span>{{data.friends.qq || '--'}}</span>
          </Col>
        </Row>
        <Row class="p-list">
          <Col span="6">公司：
          </Col>
          <Col class="p-right" span="18">
            <span>{{data.friends.company || '--'}}</span>
          </Col>
        </Row>
        <Row class="p-list">
          <Col span="6">职业：
          </Col>
          <Col class="p-right" span="18">
            <span>{{data.friends.work || '--'}}</span>
          </Col>
        </Row>
        <Row class="p-list">
          <Col span="6">职称：
          </Col>
          <Col class="p-right" span="18">
            <span>{{data.friends.title || '--'}}</span>
          </Col>
        </Row>
        <Row class="p-list">
          <Col span="6">邮箱：
          </Col>
          <Col class="p-right" span="18">
            <span>{{data.friends.email || '--'}}</span>
          </Col>
        </Row>
        <Row class="p-list">
          <Col span="6">地址：
          </Col>
          <Col class="p-right" span="18">
            <span>{{data.friends.address || '--'}}</span>
          </Col>
        </Row>
        <Row class="p-list">
          <Col span="6">签名：
          </Col>
          <Col class="p-right" span="18">
            <span>{{data.friends.sign || '--'}}</span>
          </Col>
        </Row>
      </div>
      <div class="p-addFriends">
        <Button class="x-button" type="error" size="large" @click="editFriends()">编辑</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Row, Col, Button, Icon, Modal } from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
import loopImg01 from '@/common/images/banner/study01.png'
import loopImg03 from '@/common/images/banner/english01.png'
import headImg from './images/headImg.png'
export default {
  name: 'appSeeInfo',
  data () {
    return {
      showBack: false,
      data: {
        showModel: false,
        user: {},
        userLogin: '',
        error: '',
        headerInfo: this.$route.meta,
        headImg: headImg,
        type: 0,
        idex: '',
        typeName: [
          '家人', '朋友', '同事', '客户', '同乡', '校友', '其他'
        ],
        typeImg: [
          'ios-home', 'ios-contacts', 'ios-football', 'ios-cafe', 'md-aperture', 'ios-school', 'ios-paw'
        ],
        friends: {
          type: ['家人'],           // 朋友圈类型
          id: new Date().getTime(), // 学号
          headImg: '',              // 头像
          user: '',                 // 用户名
          sex: ['男'],              // 性别
          birthday: '',             // 生日
          label: '',                // 标签
          phone: '',                // 手机号
          weixin: '',               // 微信
          qq: '',                   // QQ
          pass: '',                 // 通行证
          company: '',              // 公司
          work: '',                 // 职业
          title: '',                // 职称
          email: '',                // 邮箱
          address: '',              // 地址
          sign: ''                  // 签名
        }
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    this.data.url = this.$route.query.url || '/appFriends?type=3'
    this.data.idex = parseInt(this.$route.query.idex)
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      if (this.data.idex === -1) {
        this.data.friends = this.data.user.userInfo
      } else {
        if (this.data.user.friends.length !== 0) {
            this.data.friends = Object.assign(this.data.friends, this.data.user.friends[this.data.idex])       // 获取客户信息
        } else {
          this.back()
        }
      }
    }
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({ path: this.data.url })
    },
    editFriends () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appEditInfo',
        query: {
          type: 'edit',
          url: this.data.url,
          idex: this.data.idex
        }
      })
    },
    changeHeadImg () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appHeadPhoto',
        query: {
          type: 'friends',
          toUrl: this.data.url,
          fromUrl: '/appSeeInfo?idex=' + this.data.idex,
          idex: this.data.idex
        }
      })
    }
  },
  filters: {
  },
  components: {
    appHeader, Row, Col, Button, Popup, Icon, Modal
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appSeeInfo.styl"
</style>
