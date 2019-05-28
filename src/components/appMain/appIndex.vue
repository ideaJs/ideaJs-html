<!-- Created by macmzon@163.com-->
<template>
  <div class="appIndex">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="tabMain">
        <Drawer title="菜单" placement="left" :closable="false" v-model="showMenu">
          <div v-for="item in data.tabList" class="tabList" @click="tabGo(item)">{{item.title}}</div>
        </Drawer>
      </div>
      <div class="loopImg">
        <Carousel :autoplay-speed="4000" autoplay v-model="data.loopVal" loop>
          <CarouselItem v-for="item in data.loopImg" :key="item.link" >
            <img class="carousel" @click="goImgLink(item)" :src="item.img" />
          </CarouselItem>
        </Carousel>
      </div>
      <div class="tabBtns">
        <Tabs>
          <TabPane label="推荐课程" icon="ios-book">
            <div class="commend">
              <div v-for="item in data.commend" :key="item.id" class="commend-list">
                <Row>
                  <Col span="6">
                    <div :class="'newMsg-flag ' + getCommendFlag(item.id)">{{getCommendFlag(item.id) === 'learning' ? '在学' : '未学'}}
                    </div>
                    <div class="newMsg-img">
                      <img :src="item.img" />
                    </div>
                  </Col>
                  <Col span="12">
                    <div class="newMsg-title">{{item.title}}
                    </div>
                    <div class="newMsg-intruction">{{item.introduction}}
                    </div>
                  </Col>
                  <Col span="6">
                    <div class="newMsg-money">{{item.money}}
                    </div>
                    <div :class="'newMsg-button ' + getCommendFlag(item.id)">{{getCommendFlag(item.id) === 'learning' ? '进入课程' : '报名课程'}}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </TabPane>
          <TabPane label="最新消息" icon="md-chatboxes">
            <div class="newMsg">
              <div class="newMsg-list">
              </div>
            </div>
          </TabPane>
          <TabPane label="在学课程" icon="logo-octocat">
            <div class="learning">
              <div class="learning-list">
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <div class="">
      <!-- <Button type="primary" round @click.active="back()">上一页</Button>
      <Button type="success" round @click.active="start()">下一页</Button> -->
    </div>
  </div>
</template>
<script>
  import { Row, Col, Button, Drawer, Carousel, CarouselItem, Tabs, TabPane } from 'iview'
  import { Popup } from 'vux'
  import { getUsers } from '../../common/user/getUsers.js'
  import { getMenu } from './js/getMenu.js'
  import { getCommend } from './js/getCommend.js'
  import appHeader from'@/components/appConfig/appHeader.vue'
	import loopImg01 from '../../common/images/banner/study01.png'
	import loopImg02 from '../../common/images/banner/swer1.png'
	import loopImg03 from '../../common/images/banner/english01.png'
	import loopImg04 from '../../common/images/banner/d0dac.png'
  export default {
    name: 'appIndex',
    data () {
      return {
        showBack: false,
        showMenu: false,
        data: {
          user: {},
          headerInfo: this.$route.meta,
          loopVal: 0,
          loopHeight: '20vh',
          loopImg: [
            {
              img: loopImg01,
              link: '1'
            },
            {
              img: loopImg02,
              link: '2'
            },
            {
              img: loopImg03,
              link: '3'
            },
            {
              img: loopImg04,
              link: '4'
            }
          ],
          tabList: [],
          commend: []
        }
      }
    },
    created () {
      let phone = localStorage.getItem('userPhone')               // 获取客户手机号
      this.data.user = getUsers(phone)                            // 获取客户信息
      console.log(this.data.user)
      this.data.tabList = getMenu() 
      this.data.commend = getCommend() 
    },
    mounted () {
      /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
      this.$route.meta.header.leftFuc = this.getMenu                 // header左侧返回按钮事件
      this.$route.meta.header.rightFuc = this.getMember             // header右侧菜单按钮事件
      this.$route.meta.touch.leftFuc = this.start                 // 页面向左滑动事件
      this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    },
    methods: {
      start () {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appMenu',
          query: {
            type: '3'
          }
        })
      },
      back () {
        this.$route.meta.isBack = true
        this.$back({
          path: '/appLogin',
          query: {
            type: '3'
          }
        })
      },
      getMenu () {
        this.$route.meta.isBack = false
        this.showMenu = true
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
      goImgLink (data) {
        console.log(data)
      },
      getMember () {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appMember',
          query: {
            type: '3'
          }
        })
      },
      getCommendFlag (flag) {
        let course = this.data.user.course
        if (course && course.length > 0) {
          course = course.join('|')
          return flag.indexOf(course) === -1 ? 'unlearn' : 'learning'
        }
      }
    },
    filters: {
    },
    components: {
      appHeader, Row, Col, Button, Popup, Drawer, Carousel, CarouselItem, Tabs, TabPane
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appIndex.styl"
</style>
