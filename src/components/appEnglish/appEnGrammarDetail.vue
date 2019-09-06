<!-- Created by macmzon@163.com-->
<template>
  <div class="appEnGrammarDetail">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div v-if="this.data.grammarsArr.length > 0" class="p-main">
        <div class="p-header">
          <div class="p-name" v-html="data.grammarsArr[data.idex].name"></div>
        </div>
        <div class="p-meaning">
          <div class="">释义：</div>
          <div class="" v-for="item in data.grammarsArr[data.idex].meaning" v-html="item">
          </div>
        </div>
        <div class="p-example">
          <div class="">例句：</div>
          <div class="" v-for="(item, idx) in data.grammarsArr[data.idex].example">
            <div class="x-title">
              <span v-if="item.title" class="x-num">{{idx + 1 + '. '}}</span>
              <span class="" v-html="item.title"></span>
            </div>
            <div class="x-sentence">
              <span v-if="!item.title" class="x-num">{{idx + 1 + '. '}}</span>
              <span class="" v-html="item.sentence"></span>
              <span @click="playAudio(item.sentence)" class="p-audio">
                <Icon type="md-volume-up" />
              </span>
            </div>
            <div class="" v-html="item.meaning"></div>
          </div>
        </div>
      </div>
      <div class="p-bottom">
        <Button type="info" round @click.active="goUp()">上一个</Button>
        <Button type="error" round @click.active="goNext()">下一个</Button>
      </div>
      <audio style="display:none" id="appAudio" src=""></audio>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Modal } from 'iview'
import { Popup } from 'vux'
import { _getGrammars } from '@/common/js/appEnglish/function'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appEnGrammarDetail',
  data () {
    return {
      showBack: false,
      data: {
        userLogin: localStorage.getItem('userLogin'),     // 获取客户登录状态
        user: {},
        title: '英语-语法',
        headerInfo: this.$route.meta,
        showMain: false,
        name: '',
        type: this.$route.query.type,
        page: this.$route.query.page,
        id2: this.$route.query.id2,
        idex: parseInt(this.$route.query.idex) || 0,
        total: parseInt(this.$route.query.total) || 1,
        grammarsArr: []
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.leftFuc = this.goNext                 // 页面向左滑动事件
    this.$route.meta.touch.rightFuc = this.goUp                 // 页面向右滑动事件
    this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))  // 获取客户信息
      this.getGrammars()
    }
  },
  methods: {
    back () {
      this.$back({
        path: '/appEnGrammar',
        query: {
          title: this.$route.query.title,
          page: this.$route.query.page,
          type: this.$route.query.type,
          title2: this.$route.query.title2,
          id2: this.$route.query.id2
        }
      }, this)
    },
    goUp () {
      if (this.data.idex > 0) {
        this.data.idex--
        this.data.name = this.data.grammarsArr[this.data.idex]
        this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
      }
      window.scrollApp(0, 0)
    },
    goNext () {
      if (this.data.idex < this.data.total - 1) {
        this.data.idex++
        this.data.name = this.data.grammarsArr[this.data.idex]
        this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
      }
      window.scrollApp(0, 0)
    },
    playAudio (name) {
      if (name) {
        event.stopPropagation()
        let audio = document.getElementById('appAudio')
        audio.src = 'http://dict.youdao.com/speech?audio=' + name
        audio.play()
      }
    },
    getGrammars () {
      let param = {
        type: this.data.type,
        page: this.data.page,
        id2: this.data.id2
      }
      _getGrammars(param, (res) => {
        try {
          let arr = []
          for (var i in res) {
            arr.push(res[i])
          }
          this.data.grammarsArr = arr.sort((a, b) => { return parseInt(a.sort) - parseInt(b.sort) })
          this.data.name = this.data.grammarsArr[this.data.idex]
          this.data.showMain = true
        } catch (err) {
          this.data.grammarsArr = []
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
  @import "stylus/appEnGrammarDetail.styl"
</style>
