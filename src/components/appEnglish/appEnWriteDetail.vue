<!-- Created by macmzon@163.com-->
<template>
  <div class="appEnWriteDetail">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div v-if="this.data.WritesArr.length > 0" class="p-main">
        <div class="p-header">
          <div class="p-name">
            {{data.Writes[data.WritesArr[data.idex]].name}}
            <span @click="playAudio(data.Writes[data.WritesArr[data.idex]].name)" class="p-audio">
              <Icon type="md-volume-up" />
            </span>
            <div class="" v-for="item in data.Writes[data.WritesArr[data.idex]].meaning">
              {{item}}
            </div>
          </div>
        </div>
        <div class="p-article">
          <span class="" v-for="(item, idx) in data.Writes[data.WritesArr[data.idex]].example">
            {{item[0]}}
          </span>
        </div>
        <div class="p-example">
          <div class="">例句：</div>
          <div class="" v-for="(item, idx) in data.Writes[data.WritesArr[data.idex]].example">
            <div class="x-sentence">
              <span class="x-num">{{idx + 1 + '. '}}</span>
              <span class="">{{item[0]}}</span>
              <span @click="playAudio(item[0])" class="p-audio">
                <Icon type="md-volume-up" />
              </span>
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
      <audio style="display:none" id="appAudio" src=""></audio>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Modal } from 'iview'
import { Popup } from 'vux'
import { _getWrites } from '@/common/js/appEnglish/function'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appEnWriteDetail',
  data () {
    return {
      showBack: false,
      data: {
        userLogin: '',
        user: {},
        title: '英语-写作卡片',
        headerInfo: this.$route.meta,
        showMain: false,
        idex: 0,
        total: 1,
        name: '',
        WritesArr: [],
        Writes: {}
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
    this.getWrites()
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appEnWrite',
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
        this.data.name = this.data.WritesArr[this.data.idex]
        this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
      }
    },
    goNext () {
      if (this.data.idex < this.data.total - 1) {
        this.data.idex++
        this.data.name = this.data.WritesArr[this.data.idex]
        this.$route.meta.title = this.data.title + ' ' + (this.data.idex + 1) + '/' + this.data.total
      }
    },
    playAudio (name) {
      if (name) {
        event.stopPropagation()
        let audio = document.getElementById('appAudio')
        audio.src = 'http://dict.youdao.com/speech?audio=' + name
        audio.play()
      }
    },
    getWrites () {
      let param = {
        type: this.data.type,
        page: this.data.page,
        id2: this.data.id2
      }
      _getWrites(param, (res) => {
        try {
          this.data.Writes = res
          this.data.WritesArr = Object.keys(res)
          this.data.name = this.data.WritesArr[this.data.idex]
          this.data.showMain = true
        } catch (err) {
          this.data.Writes = {}
          this.data.WritesArr = []
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
  @import "stylus/appEnWriteDetail.styl"
</style>
