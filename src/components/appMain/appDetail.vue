<!-- Created by macmzon@163.com-->
<template>
  <div class="appDetail">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="tabMain">
        <Drawer title="菜单" placement="left" :closable="false" v-model="showMenu">
          <div v-for="dat in data.tabList">
            <div v-for="item in dat.list" class="tabList" @click="tabGo(item)">{{item.title}}</div>
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
        <Tabs>
          <TabPane label="课程列表" icon="ios-book">
            <div class="course">
              <div v-if="item.id === data.id" v-for="item in data.course" :key="item.id">
                <div class="" v-for="idex in item.size" :key="idex" class="course-list">
                  <Row>
                    <Col span="6">
                      <div :class="'newMsg-flag ' + (data.user.learn[item.id + '_' + idex] ? 'learning' : 'unlearn')">{{data.user.learn[item.id + '_' + idex] ? '在学' : '未学'}}
                      </div>
                      <div class="newMsg-img">
                        <img :src="item.img" />
                      </div>
                    </Col>
                    <Col span="12">
                      <div class="newMsg-title">{{'第' + idex + '课'}}
                      </div>
                      <div class="newMsg-intruction">{{item.introduction}}
                      </div>
                    </Col>
                    <Col span="6" style="text-align:right;">
                      <div class="newMsg-money">
                      </div>
                      <div @click="tabGo(item, idex)" :class="'newMsg-button ' + (data.user.learn[item.id + '_' + idex] ? 'learning' : 'unlearn')">{{data.user.learn[item.id + '_' + idex] ? '复习课程' : '开启课程'}}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import { Row, Col, Button, Drawer, Carousel, CarouselItem, Tabs, TabPane } from 'iview'
  import { Popup } from 'vux'
  import { getMenu } from '../../common/js/getMenu.js'
  import { getCourse } from '../../common/js/getCourse.js'
  import appHeader from '@/components/appConfig/appHeader.vue'
	import loopImg01 from '../../common/images/banner/study01.png'
	import loopImg03 from '../../common/images/banner/english01.png'
  export default {
    name: 'appDetail',
    data () {
      return {
        showBack: false,
        showMenu: false,
        data: {
          user: {},
          userLogin: '',
          headerInfo: this.$route.meta,
          loopVal: 0,
          course: [],
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
          tabList: [],
          commend: []
        }
      }
    },
    created () {
      this.$route.meta.title = this.$route.query.title
      this.data.id = this.$route.query.id
      this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.tabList = getMenu() 
      this.data.course = getCourse()
    },
    mounted () {
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
      getMenu () {
        this.$route.meta.isBack = false
        this.showMenu = true
      },
      tabGo (data, idex) {
        this.data.user.learn[this.data.id + '_' + idex] = true
        localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
        this.$route.meta.isBack = false
        this.$push({
          path: '/app' + data.page,
          query: {
            title: this.$route.query.title,
            id: this.$route.query.id,
            title2: data.title + '-课' + idex,
            id2: data.id + '_' + idex
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
  @import "stylus/appDetail.styl"
</style>
