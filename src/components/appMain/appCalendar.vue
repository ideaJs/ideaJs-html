<!-- Created by macmzon@163.com-->
<template>
  <div class="appCalendar">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="dateMain">
        <div v-show="data.dateInline" class="dateInline">
          <scroller ref="dateInline" lock-y :scrollbar-x="false">
            <div class="weekBox inline-calendar">
              <div v-if="data.dateArr.length > 0" class="weekBox-item" v-for="date in data.dateArr">
                <table class="weekdate">
                  <thead class="">
                    <tr class="">
                      <th class="week" v-for="week in data.weeksList">{{week}}</th>
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr class="">
                      <td v-for="item in date" :data-date="item.formatedDate" :data-current="data.curDay" :data-today="data.today"
                        :class="(item.formatedDate === data.today ? 'is-today ' : ' ')
                          + (item.formatedDate === data.curDay ? 'current' : '')
                          + (parseInt(item.formatedDate.replace(/-/g, '')) > parseInt(data.today.replace(/-/g, '')) ? 'td-disabled' : '')">
                        <span class="vux-calendar-each-date" @click="changeDate(item)">{{item.day}}</span>
                        <div></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </scroller>
        </div>
        <div v-show="data.dateTable" class="dateTable">
          <swiper id="swipers" :height="data.swiperHeight" v-model="data.swiperIm" @on-index-change="changeSwiper" :show-dots="false">
            <swiper-item :name="getCurDate(im)" v-for="im in (data.monthNum + 1)" :key="'swiper_item' + im">
              <div :ref="'dateSwiper_' + im" :class="'dateSwiper dateSwiper_' + im">
                <inline-calendar
                  :ref="'calendar_' + im"
                  :class="'calendar_' + im"
                  @on-select-single-date="onDateChange"
                  @on-view-change="onViewChange"
                  :show.sync="data.showCalendar"
                  v-model="data.dayValue"
                  start-date="2000-01-01"
                  end-date="5000-12-31"
                  :render-month="getCurDate(im)"
                  :range="data.range"
                  :render-on-value-change="!data.dateTable"
                  :show-last-month="data.showLastMonth"
                  :show-next-month="data.showNextMonth"
                  :highlight-weekend="data.highlightWeekend"
                  :return-six-rows="data.return6Rows"
                  :hide-header="data.hideHeader"
                  :hide-week-list="data.hideWeekList"
                  :replace-text-list="data.replaceTextList"
                  :weeks-list="data.weeksList"
                  :render-function="data.buildSlotFn"
                  :disable-past="data.disablePast"
                  :disable-future="data.disableFuture"
                  :disable-weekend="data.disableWeekend"
                  :disable-date-function="disableDateFunction">
                </inline-calendar>
              </div>
            </swiper-item>
          </swiper>
        </div>
        <div class="upOrDown">
          <span class="">{{getCurDate(data.swiperIm + 1)[0] + ' - ' + getCurDate(data.swiperIm + 1)[1]}}</span>
          <span @click="dateUpOrDown()" class="">
            <Icon v-if="data.dateInline" type="ios-arrow-down" />
            <Icon v-if="data.dateTable" type="ios-arrow-up" />
          </span>
          <span ref="todayInit" @click="dateInit()" class="">今日</span>
        </div>
      </div>
      <div class="dataLists">
        <Tabs>
          <TabPane :label="data.title || '课程内容'" icon="ios-book">
            <div class="">
              <div v-if="data.dataArr.length > 0" class="">
                <div class="">
                  <div @click="goPage(idex)" class="col-list" v-for="(item, idex) in data.dataArr">
                    <div class="x-name">
                      <span class="p-name">{{item.name}}</span>
                      <span v-if="item.phonetic" class="p-phonetic">{{item.phonetic}}</span>
                      <span class="rightBtn"><Icon type="ios-arrow-forward" /></span>
                    </div>
                    <div class="p-meaning">
                      <div class="">
                        <span class="" v-for="dat in item.meaning">{{dat}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="x-unData" v-if="data.dataArr.length === 0">
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
import { Group, Cell, Popup, InlineCalendar, Swiper, SwiperItem, Scroller } from 'vux'
import { Button, Icon, Tabs, TabPane } from 'iview'
import { _getMenu } from '@/common/js/appMain/function'
import { _getCourse, _getWords, _getPhrases, _getOrals, _getReads, _getWrites, _getGrammars } from '@/common/js/appEnglish/function'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'AppCalendar',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: localStorage.getItem('userLogin'),     // 客户登录状态
        headerInfo: this.$route.meta,
        title: this.$route.query.title,
        type: this.$route.query.type,
        page: this.$route.query.page,
        id2: this.$route.query.id2,
        menu: '',
        course: '',
        dataArr: [],
        funcList: {
          word: _getWords,
          phrase: _getPhrases,
          oral: _getOrals,
          read: _getReads,
          write: _getWrites,
          grammar: _getGrammars
        },
        pathList: {
          word: '/appEnWordDetail',
          phrase: '/appEnPhraseDetail',
          oral: '/appEnOralDetail',
          read: '/appEnReadDetail',
          write: '/appEnWriteDetail',
          grammar: '/appEnGrammarDetail'
        },
        dateData: {},
        monthNum: 3, // 可查看历史月份数（不包含当前月份）
        curIm: 3, // 当前激活日期swiper下标
        swiperIm: 3, // 当前滚动定位swiper下标
        swiperHeight: '250px', // swiper高度
        dateInline: true,
        dateTable: true,
        showCalendar: true,
        dateArr: [],
        curDay: '',
        dayValue: '',
        today: '',
        listValue: '',
        range: false,
        showLastMonth: false,
        showNextMonth: false,
        highlightWeekend: false,
        return6Rows: true,
        hideHeader: true,
        hideWeekList: false,
        replaceTextList: {},
        replace: false,
        changeWeeksList: false,
        weeksList: ['日', '一', '二', '三', '四', '五', '六'],
        useCustomFn: false,
        buildSlotFn: (line, index, data) => {
          // console.log(JSON.stringify(data))
          return data.isLastMonth || data.isNextMonth ? '<button disabled class="dateDisabled"></button>' : ''
        },
        disablePast: false,
        disableFuture: true,
        disableWeekend: false
      },
      disableDateFunction (date) {
        if (date.formatedDate === '2000-01-01') {
          return true
        }
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
  },
  mounted () {
    if (this.data.type === '3') {
      this.data.curIm = this.data.monthNum
      this.data.swiperIm = this.data.monthNum
      this.dateInit()
    } else {
      let dateData = localStorage.getItem('dateData')
      dateData = dateData ? JSON.parse(dateData) : ''
      this.dateInit(dateData)
    }
  },
  activated () { // keep-alive 前进刷新页面数据；后退缓存数据
    if (this.$route.query.type === '3') {
      this.data.curIm = this.data.monthNum
      this.data.swiperIm = this.data.monthNum
      let dateData = localStorage.getItem('dateData')
      dateData = dateData ? JSON.parse(dateData) : ''
      if (dateData) {
        let arr = Object.keys(dateData)
        let time = (new Date(new Date().getTime() - this.data.monthNum * 30 * 24 * 60 * 60 * 1000).getMonth())
        arr.forEach((val) => {
          if (parseInt(val.split('-')[1]) < time) {
            delete dateData[val] // 删除超过monthNum个月的数据缓存
          }
        })
        localStorage.setItem('dateData', JSON.stringify(dateData))
      }
      this.dateInit()
    }
  },
  methods: {
    back () {
      this.$back({
        path: '/appMember',
        query: {
          type: '3'
        }
      }, this)
    },
    dateInit (dateData) {
      this.data.dateInline = true
      this.data.dateTable = true
      this.$nextTick(() => {
        let Im = dateData ? dateData.swiperIm : this.data.monthNum
        let calendar = this.$refs['calendar_' + (Im + 1)][0]
        this.data.curIm = Im
        this.data.dateArr = calendar.days
        this.data.today = calendar.today
        if (Im === this.data.monthNum && !dateData) {
          this.data.dayValue = calendar.today
          // console.log(this.data.dayValue)
          this.storageInit(calendar.today, Im)
        } else {
          this.data.dayValue = dateData ? dateData.courseDate : calendar.today
        }
        this.data.curDay = this.data.dayValue
        this.todayInit(this.data.dateArr, this.data.curDay)
        this.changeSwiper()
        this.data.swiperIm = Im
        this.getMenu()
      })
    },
    storageInit (day, Im) {
      let dateData = localStorage.getItem('dateData')
      if (dateData) {
        dateData = JSON.parse(dateData)
        dateData.courseDate = day || this.data.today
        dateData.swiperIm = Im
        localStorage.setItem('dateData', JSON.stringify(dateData))
      } else {
        let obj = {}
        obj.courseDate = day || this.data.today
        obj.swiperIm = Im
        localStorage.setItem('dateData', JSON.stringify(obj))
      }
    },
    changeDate (item) {
      if (parseInt(this.data.today.replace(/-/g, '')) < parseInt(item.formatedDate.replace(/-/g, ''))) {
        return
      }
      let month = this.data.curDay.split('-')[1]
      this.data.swiperIm = this.data.swiperIm + (item.month_str - month)
      this.data.curIm = this.data.swiperIm
      this.data.curDay = item.formatedDate
      this.data.dayValue = item.formatedDate
      this.storageInit(this.data.curDay, this.data.swiperIm)
      this.getMenu()
    },
    todayInit (dates, day) {
      if (dates.length > 0) {
        let num = 0
        let arr = dates[0].concat(dates[1], dates[2], dates[3], dates[4], dates[5])
        arr.forEach((val, ix) => {
          if (val.formatedDate === day) {
            num = ix + 1
          }
        })
        this.$nextTick(() => {
          let left = 0
          if (num % 7 === 0) {
            left = (parseInt((num - 1) / 7) * (((window.innerWidth * dates.length) - 10 + parseInt((num - 1) / 7) * 2) / 6)) + 2
          } else {
            left = (parseInt(num / 7) * (((window.innerWidth * dates.length) - 10 + parseInt(num / 7) * 2) / 6)) + 2
          }
          this.$refs.dateInline.reset({left: left})
        })
      }
    },
    getMenu () {
      _getMenu((res) => {
        let data = res.course
        let len = data.length
        this.data.menu = data[Math.floor(Math.random() * (len - 1))]
        this.getCourse(this.data.menu)
      })
    },
    getCourse (param) {
      let dateData = JSON.parse(localStorage.getItem('dateData'))
      let arr = dateData[dateData.courseDate]
      if (arr) {
        this.data.course = arr[0]
        this.data.dataArr = arr[1]
        return
      }
      _getCourse(param, (res) => {
        let data = res.list
        let len = data.length
        this.data.course = data[Math.floor(Math.random() * (len - 1))]
        this.data.course.id2 = this.data.course.id
        this.data.title = this.data.course.title
        this.getDatas(this.data.course, this.data.funcList[this.data.course.page])
      })
    },
    getDatas (param, typeFuc) {
      try {
        typeFuc(param, (res) => {
          try {
            let arr = []
            for (var i in res) {
              res[i].name && arr.push(res[i])
            }
            if (arr.length > 0) {
              this.data.dataArr = arr.sort((a, b) => { return parseInt(a.sort) - parseInt(b.sort) })
              let dateData = localStorage.getItem('dateData')
              dateData = JSON.parse(dateData)
              dateData[this.data.curDay] = [this.data.course, this.data.dataArr]
              localStorage.setItem('dateData', JSON.stringify(dateData))
            } else {
              this.getCourse(this.data.menu)
            }
          } catch (err) {
            this.getCourse(this.data.menu)
          }
        })
      } catch (err) {
        this.getCourse(this.data.menu)
      }
    },
    goPage (idex) {
      this.$push({
        path: this.data.pathList[this.data.course.page],
        query: {
          fromUrl: '/appCalendar',
          title: this.data.course.title,
          type: this.data.course.type,
          page: this.data.course.page,
          title2: this.data.course.title,
          id2: this.data.course.id,
          idex: idex,
          total: this.data.dataArr.length
        }
      }, this)
    },
    changeSwiper (index) {
      // console.log(index, this.data.swiperIm)
      let num = this.data.swiperIm
      if (index === 0) {
        num = 1
      } else {
        num = (index || num) + 1
      }
      let dateSwiper = this.$refs['dateSwiper_' + num][0]
      this.data.swiperHeight = dateSwiper ? dateSwiper.offsetHeight + 'px' : '250px'
      document.getElementById('swipers').style.height = this.data.swiperHeight
      document.getElementById('swipers').children[0].style.height = this.data.swiperHeight
      if (!index && index !== 0) {
        this.data.dateInline = true
        this.data.dateTable = false
      }
    },
    dateUpOrDown () {
      this.data.swiperIm = this.data.curIm
      this.data.dateInline = !this.data.dateInline
      this.data.dateTable = !this.data.dateTable
      this.todayInit(this.data.dateArr, this.data.curDay)
    },
    getCurDate (im) {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() - this.data.monthNum + im
      if (month < 1) {
        year--
        month = month + 12
      } else if (month > 12) {
        year++
        month = month - 12
      }
      return [year, month]
    },
    onDateChange (val) {
      if (this.data.curDay !== val) {
        // console.log(val)
        this.data.curIm = this.data.swiperIm
        this.data.curDay = val
        this.data.dateArr = this.$refs['calendar_' + (this.data.swiperIm + 1)][0].days
        this.storageInit(val, this.data.swiperIm)
        this.getMenu()
      }
    },
    onViewChange (val, count) {
      // console.log(val, count)
    }
  },
  components: {
    Group, Cell, Button, appHeader, Popup, InlineCalendar, Icon, Tabs, TabPane, Swiper, SwiperItem, Scroller
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appCalendar.styl"
</style>
