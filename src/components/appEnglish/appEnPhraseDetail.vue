<!-- Created by macmzon@163.com-->
<template>
  <div class="appEnPhraseDetail">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div v-if="data.showMain" class="p-main">
        <div class="p-name">
          {{data.words[data.wordsArr[data.idex]].name}}
          <div>{{data.phrase[data.phraseArr[data.idex]].phonetic}}</div>
        </div>
        <div class="p-meaning">
          <div class="">释义：</div>
          <div class="" v-for="item in data.phrase[data.phraseArr[data.idex]].meaning">
            {{item}}
          </div>
        </div>
        <div class="p-example">
          <div class="">例句：</div>
          <div class="" v-for="item in data.phrase[data.phraseArr[data.idex]].example">
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
        <Button type="error" round @click.active="goNext()">下一个</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
export default {
  name: 'appEnPhraseDetail',
  data () {
    return {
      showBack: false,
      data: {
        title: '英语-词汇',
        headerInfo: this.$route.meta,
        showMain: false,
        idex: 0,
        total: 1,
        name: '',
        phraseArr: [],
        phrase: {}
      }
    }
  },
  mounted () {
    this.data.idex = parseInt(this.$route.query.idex)
    this.data.total = parseInt(this.$route.query.total)
    this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
    this.data.type = this.$route.query.type
    this.data.page = this.$route.query.page
    this.data.id2 = this.$route.query.id2
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    this.getPhrase()
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appEnPhrase',
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
        this.data.name = this.data.phraseArr[this.data.idex]
        this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
      }
    },
    goNext () {
      if (this.data.idex < this.data.total - 1) {
        this.data.idex++
        this.data.name = this.data.phraseArr[this.data.idex]
        this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
      }
    },
    getPhrase () {
      this.data.phrase = require('../json/english/' + this.data.type + '/' + this.data.page + '/' + this.data.id2 + '.json')
      this.data.phraseArr = Object.keys(this.data.phrase)
      this.data.name = this.data.phraseArr[this.data.idex]
      this.data.showMain = true
    }
  },
  components: {
    Button, Popup, appHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appEnPhraseDetail.styl"
</style>
