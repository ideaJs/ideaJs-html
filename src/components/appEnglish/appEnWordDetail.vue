<!-- Created by macmzon@163.com-->
<template>
  <div class="appEnWordDetail">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div v-if="this.data.wordsArr.length > 0" class="p-main">
        <div class="p-header">
          <div class="p-name">{{data.words[data.wordsArr[data.idex]].name}}
          </div>
          <div>
            {{data.words[data.wordsArr[data.idex]].phonetic}}
            <span @click="playAudio(data.words[data.wordsArr[data.idex]].name)" class="p-audio"><Icon type="md-volume-up" /></span>
          </div>
        </div>
        <div class="p-meaning">
          <div class="">释义：</div>
          <div class="" v-for="item in data.words[data.wordsArr[data.idex]].meaning">
            {{item}}
          </div>
        </div>
        <div class="p-example">
          <div class="">例句：</div>
          <div class="" v-for="item in data.words[data.wordsArr[data.idex]].example">
            <div class="">
              {{item[0]}}
            </div>
            <div class="">
              {{item[1]}}
            </div>
          </div>
        </div>
      </div>
      <div class="p-bottom">
        <Button type="info" round @click.active="goUp()">上一个</Button>
        <div v-if="this.data.wordsArr.length > 0" @click="setCollect(data.words[data.wordsArr[data.idex]])" class="p-collect">
          <span v-if="data.user.collectEnWords[data.words[data.wordsArr[data.idex]].name]">
            <Icon type="md-star" />
            <div>收藏</div>
          </span>
          <span v-if="!data.user.collectEnWords[data.words[data.wordsArr[data.idex]].name]">
            <Icon type="md-star-outline" />
            <div>收藏</div>
          </span>
        </div>
        <Button type="error" round @click.active="goNext()">下一个</Button>
      </div>
      <audio style="display:none" id="appAudio" src=""></audio>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Modal } from 'iview'
import { Popup } from 'vux'
import { _getWords } from '@/common/js/appEnglish/function'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appEnWordDetail',
  data () {
    return {
      showBack: false,
      data: {
        userLogin: '',
        user: {},
        title: '英语-单词卡片',
        headerInfo: this.$route.meta,
        showMain: false,
        idex: 0,
        total: 1,
        name: '',
        wordsArr: [],
        words: {}
      }
    }
  },
  created () {
    this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
    this.data.type = this.$route.query.type
    this.data.page = this.$route.query.page
    this.data.id2 = this.$route.query.id2
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))    // 获取客户信息
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.leftFuc = this.goNext                 // 页面向左滑动事件
    this.$route.meta.touch.rightFuc = this.goUp                 // 页面向右滑动事件
    this.data.idex = parseInt(this.$route.query.idex)
    this.data.total = parseInt(this.$route.query.total)
    if (this.data.type === 'collectEnWords') {
      this.collectEnWords()
    } else {
      this.getWords()
    }
    this.$route.meta.title = '生词本 ' + (this.data.idex + 1) + '/' + this.data.total
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appEnWord',
        query: {
          title: this.$route.query.title,
          page: this.$route.query.page,
          type: this.$route.query.type,
          title2: this.$route.query.title2,
          id2: this.$route.query.id2
        }
      })
    },
    goUp () {
      if (this.data.idex > 0) {
        this.data.idex--
        this.data.name = this.data.wordsArr[this.data.idex]
        this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
      }
    },
    goNext () {
      if (this.data.idex < this.data.total - 1) {
        this.data.idex++
        this.data.name = this.data.wordsArr[this.data.idex]
        this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
      }
    },
    collectEnWords () {
      try {
        this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))    // 获取客户信息
        let arr = []
        for (var i in this.data.user.collectEnWords) {
          arr.push(this.data.user.collectEnWords[i])
        }
        this.data.words = arr.sort((a, b) => { return parseInt(a.order) - parseInt(b.order) })
        this.data.wordsArr = Object.keys(this.data.words)
        this.data.total = this.data.wordsArr.length
        if (this.data.total === 0) {
          this.$route.meta.isBack = true
          this.$push({
            path: '/appEnword',
            query: {
              type: 'collectEnWords'
            }
          })
        }
      } catch (err) {
        this.data.words = {}
        this.data.wordsArr = []
      }
      this.data.showMain = true
    },
    setCollect (item) {
      event.stopPropagation()
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))    // 获取客户信息
      if (this.data.user.collectEnWords[item.name]) {
        delete this.data.user.collectEnWords[item.name]
        localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
        if (this.data.type === 'collectEnWords') {
          this.data.idex--
          this.data.total--
          this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
          this.collectEnWords()
        }
      } else {
        if (Object.keys(this.data.user.collectEnWords).length === 100) {
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
        this.data.user.collectEnWords[item.name] = item
        localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
      }
    },
    playAudio (name) {
      if (name) {
        event.stopPropagation()
        let audio = document.getElementById("appAudio")
        audio.src = 'http://dict.youdao.com/speech?audio=' + name
        audio.play()
      }
    },
    getWords () {
      let param = {
        type: this.data.type,
        page: this.data.page,
        id2: this.data.id2
      }
      _getWords(param, (res) => {
        try {
          this.data.words = res
          this.data.wordsArr = Object.keys(res)
          this.data.name = this.data.wordsArr[this.data.idex]
          this.data.showMain = true
        } catch (err) {
          this.data.words = {}
          this.data.wordsArr = []
          this.data.name = ''
          this.data.showMain = false
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
  @import "stylus/appEnWordDetail.styl"
</style>
