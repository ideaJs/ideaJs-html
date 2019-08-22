<!-- Created by macmzon@163.com-->
<template>
  <div class="appEnRead">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div v-if="data.ReadsArr.length > 0" class="">
        <div @click="goPage(0)" class="p-title col-list">
          总计 <span class="p-num">{{data.ReadsArr.length}}</span>
          <span class="rightBtn">看卡片<Icon type="ios-arrow-forward" /></span>
        </div>
        <div class="">
          <div @click="goPage(data.ReadsArr.indexOf(idex))" class="col-list" v-for="(item, idex) in data.Reads">
            <div class="">
              <span class="p-name">{{item.name}}</span>
              <span class="p-phonetic">{{item.phonetic}}</span>
              <span @click="playAudio(item.name)" class="p-audio"><Icon type="md-volume-up" /></span>
              <div v-if="data.user" @click="setCollect(item)" class="p-collect">
                <span v-if="data.user.collectEnReads[item.name]"><Icon type="md-star" /></span>
                <span v-if="!data.user.collectEnReads[item.name]"><Icon type="md-star-outline" /></span>
              </div>
            </div>
            <div class="p-meaning">
              <div class="">
                <span class="" v-for="dat in item.meaning">{{dat}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="x-unData" v-if="data.ReadsArr.length === 0">
        <Icon type="md-walk" />
        <div>暂无数据</div>
      </div>
      <audio style="display:none" id="appAudio" src=""></audio>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Modal } from 'iview'
import { Popup } from 'vux'
import { _getReads } from '@/common/js/appEnglish/function'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appEnRead',
  data () {
    return {
      showBack: false,
      data: {
        userLogin: '',
        user: {},
        title2: '课程-词汇',
        id2: '',
        headerInfo: this.$route.meta,
        ReadsArr: [],
        Reads: {}
      }
    }
  },
  created () {
    this.$route.meta.title = this.$route.query.title2
    this.data.type = this.$route.query.type
    this.data.page = this.$route.query.page
    this.data.id2 = this.$route.query.id2
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))    // 获取客户信息
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    if (this.data.type === 'collectEnReads') {
      this.$route.meta.title = '生词本'
      this.$route.meta.header.right = 'ios-trash'                    // header右侧按钮
      this.$route.meta.header.rightFuc = this.clearReads                    // header右侧按钮事件
      this.collectEnReads()
    } else {
      this.getReads()
    }
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      if (this.data.type === 'collectEnReads') {
        this.$back({
          path: '/appMember',
          query: {
            type: 3
          }
        })
      } else {
        this.$back({
          path: '/appEnDetail',
          query: {
            title: this.$route.query.title,
            page: this.$route.query.page,
            type: this.$route.query.type
          }
        })
      }
    },
    getReads () {
      let param = {
        type: this.data.type,
        page: this.data.page,
        id2: this.data.id2
      }
      _getReads(param, (res) => {
        try {
          this.data.Reads = res
          this.data.ReadsArr = Object.keys(res)
        } catch (err) {
          this.data.Reads = {}
          this.data.ReadsArr = []
        }
      })
    },
    collectEnReads () {
      try {
        this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))    // 获取客户信息
        this.data.Reads = this.data.user.collectEnReads
        this.data.ReadsArr = Object.keys(this.data.Reads)
      } catch (err) {
        this.data.Reads = {}
        this.data.ReadsArr = []
      }
    },
    setCollect (item) {
      event.stopPropagation()
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))    // 获取客户信息
      if (this.data.user.collectEnReads[item.name]) {
        delete this.data.user.collectEnReads[item.name]
        localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
        if (this.data.type === 'collectEnReads') {
          this.collectEnReads()
        }
      } else {
        if (Object.keys(this.data.user.collectEnReads).length === 100) {
          Modal.warning({
            title: '信息提示',
            content: '生词收藏不可超过100个，请删除部分内容后，再进行收藏！',
            okText: '确定',
            onOk: () => {
            }
          })
          return
        }
        item.sort = new Date().getTime()
        this.data.user.collectEnReads[item.name] = item
        localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
      }
    },
    clearReads () {
      Modal.confirm({
        title: '信息提示',
        content: '确定要清空生词本吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.data.user.collectEnReads = {}
          localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
          this.collectEnReads()
        },
        onCancel: () => {
        }
      })
    },
    playAudio (name) {
      if (name) {
        event.stopPropagation()
        let audio = document.getElementById('appAudio')
        audio.src = 'http://dict.youdao.com/speech?audio=' + name
        audio.play()
      }
    },
    goPage (idex) {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appEnReadDetail',
        query: {
          title: this.$route.query.title,
          type: this.$route.query.type,
          page: this.$route.query.page,
          title2: this.$route.query.title2,
          id2: this.$route.query.id2,
          idex: idex,
          total: this.data.ReadsArr.length
        }
      })
    }
  },
  components: {
    Button, Popup, appHeader, Icon, Modal
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appEnRead.styl"
</style>
