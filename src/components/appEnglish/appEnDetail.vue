<!-- Created by macmzon@163.com-->
<template>
  <div class="appEnDetail">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
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
              <div v-for="item in data.course" :key="item.id">
                <div class="" v-for="idex in item.size" :key="idex" class="course-list">
                  <Row>
                    <Col span="6">
                      <div :class="'newMsg-flag ' + (data.user.learn[item.id] ? 'learning' : 'unlearn')">{{data.user.learn[item.id] ? '在学' : '未学'}}
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
                      <div class="newMsg-money">
                      </div>
                      <div @click="tabGo(item, idex)" :class="'newMsg-button ' + (data.user.learn[item.id] ? 'learning' : 'unlearn')">{{data.user.learn[item.id] ? '复习课程' : '开启课程'}}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="x-unData" v-if="data.course.length === 0">
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
import { Row, Col, Button, Drawer, Carousel, CarouselItem, Tabs, TabPane, Icon } from 'iview'
import { Popup } from 'vux'
import { _getCourse } from '@/common/js/appEnglish/function'
import appHeader from '@/components/appConfig/appHeader.vue'
import loopImg01 from '@/common/images/banner/study01.png'
import loopImg03 from '@/common/images/banner/english01.png'
export default {
  name: 'appEnDetail',
  data () {
    return {
      showBack: false,
      showMenu: false,
      data: {
        user: {},
        id: '',
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
        ]
      }
    }
  },
  created () {
    this.$route.meta.title = this.$route.query.title
    this.data.type = this.$route.query.type
    this.data.page = this.$route.query.page
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
    this.getCourse()
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appIndex',
        query: {
          type: '3'
        }
      })
    },
    getCourse () {
      let param = {
        type: this.data.type,
        page: this.data.page
      }
      _getCourse(param, (res) => {
        try {
          this.data.course = res.list
        } catch (err) {
          this.data.course = []
        }
      })
    },
    tabGo (data, idex) {
      this.data.user.learn[data.id] = true
      localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
      this.$route.meta.isBack = false
      this.$push({
        path: '/appEn' + data.page,
        query: {
          title: this.$route.query.title,
          type: this.$route.query.type,
          page: this.$route.query.page,
          title2: data.title,
          id2: data.id
        }
      })
    },
    goImgLink (data) {
      console.log(data)
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
  @import "stylus/appEnDetail.styl"
</style>
