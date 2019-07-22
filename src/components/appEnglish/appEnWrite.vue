<!-- Created by macmzon@163.com-->
<template>
  <div class="appEnWrite">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div v-if="data.writeArr.length > 0" class="">
        <div @click="goPage(0)" class="p-title col-list">
          词汇 <span class="p-num">{{data.writeArr.length}}</span> 个
          <span class="rightBtn">看卡片<Icon type="ios-arrow-forward" /></span>
        </div>
        <div class="">
          <div @click="goPage(data.writeArr.indexOf(idex))" class="col-list" v-for="(item, idex) in data.write">
            <div class="">
              <span class="p-name">{{item.name}}</span>
              <span class="p-phonetic">{{item.phonetic}}</span>
              <span class="rightBtn"><Icon type="ios-arrow-forward" /></span>
            </div>
            <div class="p-meaning">
              <span class="" v-for="dat in item.meaning">{{dat}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="x-unData" v-if="data.writeArr.length === 0">
        <Icon type="md-walk" />
        <div>暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
export default {
  name: 'appEnWrite',
  data () {
    return {
      showBack: false,
      data: {
        title2: '课程-写作',
        id2: '',
        headerInfo: this.$route.meta,
        writeArr: [],
        write: {}
      }
    }
  },
  created () {
    this.$route.meta.title = this.$route.query.title2
    this.data.type = this.$route.query.type
    this.data.page = this.$route.query.page
    this.data.id2 = this.$route.query.id2
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    this.getWrite()
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appEnDetail',
        query: {
          title: this.$route.query.title,
          page: this.$route.query.page,
          type: this.$route.query.type
        }
      })
    },
    getWrite () {
      try {
        this.data.write = require('../json/english/' + this.data.type + '/' + this.data.page + '/' + this.data.id2 + '.json')
        this.data.writeArr = Object.keys(this.data.write)
      } catch (err) {
        this.data.write = {}
        this.data.writeArr = []
      }
    },
    goPage (idex) {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appEnWordDetail',
        query: {
          title: this.$route.query.title,
          page: this.$route.query.page,
          type: this.$route.query.type,
          title2: this.$route.query.title2,
          id2: this.$route.query.id2,
          idex: idex,
          total: this.data.writeArr.length
        }
      })
    }
  },
  components: {
    Button, Popup, appHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appEnWrite.styl"
</style>
