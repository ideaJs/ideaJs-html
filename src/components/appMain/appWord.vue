<!-- Created by macmzon@163.com-->
<template>
  <div class="appWord">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="">
        <div class="p-title col-list">
          词汇 <span class="p-num">{{data.wordsArr.length}}</span> 个 
          <span @click="goPage(0)" class="rightBtn">看卡片<Icon type="ios-arrow-forward" /></span>
        </div>
        <div class="">
          <div @click="goPage(data.wordsArr.indexOf(idex))" class="col-list" v-for="(item, idex) in data.words">
            <div class="">
              <span class="p-name">{{item.name}}</span>
              <span class="p-phonetic">{{item.phonetic}}</span>
              <span class="rightBtn"><Icon type="ios-arrow-forward" /></span>
            </div>
            <div class="p-meaning" v-for="dat in item.meaning">{{dat}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button, Icon } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
export default {
  name: 'appWord',
  data () {
    return {
      showBack: false,
      data: {
        title2: '课程-词汇',
        id2: '',
        headerInfo: this.$route.meta,
        wordsArr: [],
        words: {}
      }
    }
  },
  mounted () {
    this.$route.meta.title = this.$route.query.title2
    this.data.id2 = this.$route.query.id2
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.header.rightFuc = this.getMenu             // header右侧菜单按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    this.getWords()
  },
  methods: {
    start () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appDetail',
        query: {
          title: this.$route.query.title,
          id: this.$route.query.id
        }
      })
    },
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appDetail',
        query: {
          title: this.$route.query.title,
          id: this.$route.query.id
        }
      })
    },
    getWords () {
      this.$get('/api/' + this.data.id2, (res) => {
        this.data.words = res.data.data
        this.data.wordsArr = Object.keys(this.data.words)
      }, (res) => {
        console.log(res)
      })
    },
    goPage (idex) {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appWordDetail',
        query: {
          title: this.$route.query.title,
          id: this.$route.query.id,
          title2: this.$route.query.title2,
          id2: this.$route.query.id2,
          idex: idex,
          total: this.data.wordsArr.length
        }
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
    Button, Popup, appHeader, Icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appWord.styl"
</style>
