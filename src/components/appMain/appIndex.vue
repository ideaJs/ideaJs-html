<!-- Created by macmzon@163.com-->
<template>
  <div class="appIndex">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="menuMain">
        <Drawer title="菜单" placement="left" :closable="false" v-model="showMenu">
          <div v-for="item in data.menuList" class="tabList" @click="menuGo(item)">{{item.title}}
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
      <div class="menuBtns">
        <Tabs v-model="data.menuName">
          <TabPane name="course" label="推荐课程" icon="ios-book">
            <div class="course">
              <div v-for="item in data.unlearn" :key="item.id" class="course-list">
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
                    <div class="newMsg-brief">{{item.brief}}
                    </div>
                  </Col>
                  <Col span="6" style="text-align:right;">
                    <div class="newMsg-money">{{item.money}}
                    </div>
                    <div @click="menuGo(item)" class="newMsg-button unlearn">报名课程
                    </div>
                  </Col>
                </Row>
              </div>
              <div class="x-unData" v-if="data.unlearn.length === 0">
                <Icon type="md-walk" />
                <div>暂无数据</div>
              </div>
            </div>
          </TabPane>
          <TabPane name="learn" label="在学课程" icon="ios-bookmarks">
            <div class="learn">
              <div v-for="item in data.learn" :key="item.id" class="course-list learn-list">
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
                    <div class="newMsg-brief">{{item.brief}}
                    </div>
                  </Col>
                  <Col span="6" style="text-align:right;">
                    <div class="newMsg-money">{{item.money}}
                    </div>
                    <div @click="menuGo(item)" class="newMsg-button learning">学习课程
                    </div>
                  </Col>
                </Row>
              </div>
              <div class="x-unData" v-if="data.learn.length === 0">
                <Icon type="md-walk" />
                <div>暂无数据</div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
  let Base64 = require('js-base64').Base64
  import { Row, Col, Button, Drawer, Carousel, CarouselItem, Tabs, TabPane, Icon } from 'iview'
  import { Popup } from 'vux'
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
          menuName: 'course',
          menuList: [],
          course: [],
          unlearn: [],
          learn: []
        }
      }
    },
    created () {
      this.data.menuName = this.$route.query.menuName || 'course'
      this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
      if (this.data.userLogin) {
        this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      } else {
        this.data.user.course = {}
      }
      // this.$post('url', {}, res => { console.log(res) }, err => { console.log(err) })
      this.getCourse()
      /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
      this.$route.meta.header.leftFuc = this.getMenu                 // header左侧返回按钮事件
      this.$route.meta.header.rightFuc = this.getMember             // header右侧菜单按钮事件
    },
    methods: {
      getMenu () {
        this.$route.meta.isBack = false
        let data = require('../json/english/course.json')
        this.data.menuList = data.course
        this.showMenu = true
      },
      getCourse () {
        let data = require('../json/english/course.json')
        this.data.course = data.course
        this.data.course.forEach((val, idex) => {
          if (this.getCourseFlag(val.id) === 'learning') {
            this.data.learn.push(val)
          } else {
            this.data.unlearn.push(val)
          }
        })
      },
      menuGo (data) {
        this.$route.meta.isBack = false
        if (this.getCourseFlag(data.id) === 'learning') {
          // 学习课程
          this.$push({
            path: '/appEnDetail',
            query: {
              title: data.title,
              type: data.type,
              page: data.page
            }
          })
        } else {
          if (!this.data.userLogin) {
            this.userLogin('/appSign?id=' + data.id + '&money=' + data.money)
            return
          }
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
      userLogin (url) {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appLogin',
          query: {
            fromUrl: '/appIndex',
            toUrl: url
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
      getCourseFlag (flag) {
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
