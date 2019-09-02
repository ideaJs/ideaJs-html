<!-- Created by macmzon@163.com-->
<template>
  <div class="appFriends">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="p-active" @click="seeFriends(-1)">
        <div class="p-headImg">
          <img :src="data.user.userInfo.headImg || data.headImg" />
        </div>
        <Row>
          <Col span="15" style="text-align:right;">
            <div class="active-user">
              <Icon v-if="data.user.userInfo.sex[0] === '男'" type="ios-man" />
              <Icon v-if="data.user.userInfo.sex[0] === '女'" type="ios-woman" />
              <span >{{data.user.userInfo.user}}</span>
            </div>
          </Col>
          <Col span="9" style="text-align:right;">
            <div class="active-phone">
              <Icon type="ios-call" />
              {{data.user.userInfo.phone}}
            </div>
          </Col>
        </Row>
        <div class="active-friends">
          <Icon v-if="data.user.userInfo.address" type="ios-pin" />
          {{data.user.userInfo.address}}
        </div>
      </div>
      <div class="tabBtns">
        <Tabs @on-click="tabToggle">
          <TabPane v-for="(dat, ind) in data.typeName" :key="dat" :label="dat" :icon="data.typeImg[ind]">
            <div class="friends">
              <div v-if="item.type[0] === dat" @click="seeFriends(idex)" class="p-list" v-for="(item, idex) in data.friends" :key="idex">

                <Row type="flex" align="middle">
                  <Col class="p-head" span="4">
                    <div>
                      <img :src="item.headImg || data.headImg" />
                    </div>
                  </Col>
                  <Col span="20">
                    <Row>
                      <Col span="22">
                        <div class="p-user">
                          <Icon v-if="data.user.userInfo.sex[0] === '男'" type="ios-man" />
                          <Icon v-if="data.user.userInfo.sex[0] === '女'" type="ios-woman" />
                          {{item.user}}
                        </div>
                      </Col>
                      <Col span="2" style="text-align:right;">
                        <div class="p-more">
                          <Icon type="ios-arrow-forward" />
                        </div>
                      </Col>
                    </Row>
                    <div class="p-friends">
                      <Icon type="ios-pin" />
                      {{item.address}}
                    </div>
                    <div class="p-manage">
                      <Col span="16">
                        <div @click="(e) => {e.stopPropagation()}">
                          <Icon class="p-phone" type="ios-call" />
                          <a :href="'tel:' + item.phone"><span>{{item.phone}}</span></a>
                        </div>
                      </Col>
                      <Col span="8" style="text-align: right;">
                        <Button class="p-delete" type="warning" shape="circle" @click="delFriends(item, idex)">
                          <Icon type="ios-trash" />
                        </Button>
                      </Col>
                    </div>
                  </Col>
                </Row>
              </div>
              <div v-if="!data.hasFriends" class="x-unData">
                <Icon type="md-walk" />
                <div>暂无数据</div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div class="p-addFriends">
        <Button class="x-button" type="error" size="large" @click="addFriends()">添加好友</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Row, Col, Button, Tabs, TabPane, Icon, Modal, Input, Form, FormItem } from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
import loopImg01 from '@/common/images/banner/study01.png'
import loopImg03 from '@/common/images/banner/english01.png'
import headImg from './images/headImg.png'
export default {
  name: 'appFriends',
  data () {
    return {
      showBack: false,
      data: {
        showModel: false,
        user: {},
        userLogin: '',
        error: '',
        headImg: headImg,
        headerInfo: this.$route.meta,
        hasFriends: false,
        typeName: [
          '家人', '朋友', '同事', '客户', '同乡', '校友', '其他'
        ],
        typeImg: [
          'ios-home', 'ios-contacts', 'ios-football', 'ios-cafe', 'md-aperture', 'ios-school', 'ios-paw'
        ],
        friends: []
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.friends = Object.assign(this.data.friends, this.data.user.friends)       // 获取客户信息
    }
    this.tabToggle(0)
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appMember',
        query: {
          type: '3'
        }
      })
    },
    delFriends (data, idex) {
      event.stopPropagation()
      Modal.confirm({
        title: '信息提示',
        content: '确定要删除此联系人吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.data.friends.splice(idex, 1)
          this.data.user.friends = this.data.friends
          localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
        },
        onCancel: () => {
        }
      })
    },
    seeFriends (idex) {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appSeeInfo',
        query: {
          url: '/appFriends?type=3',
          idex: idex
        }
      })
    },
    addFriends () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appEditInfo',
        query: {
          type: 'add',
          url: '/appFriends?type=3',
          idex: this.data.friends.length
        }
      })
    },
    tabToggle (type) {
      let len = 0
      for (var i in this.data.friends) {
        if (this.data.typeName[type] === this.data.friends[i].type[0]) {
          len++
        }
      }
      this.data.hasFriends = len > 0
    }
  },
  filters: {
  },
  components: {
    appHeader, Row, Col, Button, Popup, Tabs, TabPane, Icon, Modal, Input, Form, FormItem
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appFriends.styl"
</style>
