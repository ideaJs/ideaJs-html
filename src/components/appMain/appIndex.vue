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
          <div v-for="dat in data.tabList">
            <div v-for="item in dat.list" class="tabList" @click="tabGo(item)">{{item.title}}
            </div>
          </div>
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
        <Tabs v-model="data.tabName">
          <TabPane name="commend" label="推荐课程" icon="ios-book">
            <div class="commend">
              <div v-for="item in data.unlearn" :key="item.id" class="commend-list">
                <Row>
                  <Col span="6">
                    <div class="newMsg-flag unlearn">未学
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
                  <Col span="6" style="text-align:right;">
                    <div class="newMsg-money">{{item.money}}
                    </div>
                    <div @click="tabGo(item)" class="newMsg-button unlearn">报名课程
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </TabPane>
          <TabPane name="learn" label="在学课程" icon="logo-octocat">
            <div class="learn">
              <div v-for="item in data.learn" :key="item.id" class="commend-list learn-list">
                <Row>
                  <Col span="6">
                    <div class="newMsg-flag learning">在学
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
                  <Col span="6" style="text-align:right;">
                    <div class="newMsg-money">{{item.money}}
                    </div>
                    <div @click="tabGo(item)" class="newMsg-button learning">学习课程
                    </div>
                  </Col>
                </Row>
              </div>
              <div class="uncourse" v-if="data.learn.length === 0">
                <Icon type="md-walk" />
                <div>暂无在学课程！</div>
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
  let Base64 = require('js-base64').Base64
  import { Row, Col, Button, Drawer, Carousel, CarouselItem, Tabs, TabPane, Icon } from 'iview'
  import { Popup } from 'vux'
  import { getMenu } from '../../common/js/getMenu.js'
  import { getCommend } from '../../common/js/getCommend.js'
  import appHeader from '@/components/appConfig/appHeader.vue'
	import loopImg01 from '../../common/images/banner/study01.png'
	import loopImg03 from '../../common/images/banner/english01.png'
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
          userLogin: '',
          loopHeight: '20vh',
          loopImg: [
            {
              img: loopImg01,
              link: '1'
            },
            {
              img: loopImg03,
              link: '3'
            }
          ],
          tabName: 'commend',
          tabList: [],
          commend: [],
          unlearn: [],
          learn: []
        }
      }
    },
    created () {
      this.data.tabName = this.$route.query.tabName || 'commend'
      this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
      if (this.data.userLogin) {
        this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      }
      this.data.tabList = getMenu() 
      this.data.commend = getCommend()
      this.data.commend.forEach((val, idex) => {
        if (this.getCommendFlag(val.id) === 'learning') {
          this.data.learn.push(val)
        } else {
          this.data.unlearn.push(val)
        }
      })
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
        this.$route.meta.isBack = false
        if (this.getCommendFlag(data.id) === 'learning') {
          // 学习课程
          this.$push({
            path: '/appDetail',
            query: {
              title: data.title,
              id: data.id
            }
          })
        } else {
          // 报名课程
          this.$push({
            path: '/appSign',
            query: {
              id: data.id,
              money: data.money
            }
          })
        }
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
        flag = Base64.encode(flag)
        return !this.data.user.course[flag] ? 'unlearn' : 'learning'
      }
    },
    filters: {
    },
    components: {
      appHeader, Row, Col, Button, Popup, Drawer, Carousel, CarouselItem, Tabs, TabPane, Icon
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appIndex.styl"
</style>
