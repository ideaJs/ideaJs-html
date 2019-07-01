<!-- Created by macmzon@163.com-->
<template>
  <div class="appWordDetail">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div v-if="data.showMain" class="p-main">
        <div class="p-name">
          {{data.name}}
          <div>{{data.words[data.wordsArr[data.idex]].phonetic}}</div>
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
  name: 'appWordDetail',
  data () {
    return {
      showBack: false,
      data: {
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
  mounted () {
    this.data.idex = parseInt(this.$route.query.idex)
    this.data.total = parseInt(this.$route.query.total)
    this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
    this.data.id2 = this.$route.query.id2
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getMenu             // header右侧菜单按钮事件
    this.$route.meta.touch.leftFuc = this.goNext                 // 页面向左滑动事件
    this.$route.meta.touch.rightFuc = this.goUp                 // 页面向右滑动事件
    this.getWords()
  },
  methods: {
    start () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appWord',
        query: {
          title: this.$route.query.title,
          id: this.$route.query.id,
          title2: this.$route.query.title2,
          id2: this.$route.query.id2
        }
      })
    },
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appWord',
        query: {
          title: this.$route.query.title,
          id: this.$route.query.id,
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
    getWords () {
      this.$get('/api/' + this.data.id2, (res) => {
        this.data.words = res.data.data
        this.data.wordsArr = Object.keys(this.data.words)
        this.data.name = this.data.wordsArr[this.data.idex]
        this.data.showMain = true
      }, (res) => {
        console.log(res)
      })
    },
    getMenu () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appMenu',
        query: {
          type: '3'
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
  @import "stylus/appWordDetail.styl"
</style>
