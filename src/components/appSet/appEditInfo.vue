<!-- Created by macmzon@163.com-->
<template>
  <div class="appEditInfo">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="p-main">
        <Form ref="formData" :model="data.formData" inline>
          <FormItem v-if="this.data.idex !== -1" prop="type">
            <Input class="p-types" type="text" :maxlength="30" size="large" v-model.trim="data.formData.type[0]" clearable placeholder="请选择朋友圈类型(必选)">
              <span slot="prepend">类&nbsp;&nbsp;&nbsp;型</span>
            </Input>
            <popup-picker
              :show.sync="data.typeShow"
              :data="[['家人', '朋友', '同事', '客户', '同乡', '校友', '其他']]"
              v-model="data.formData.type"
              confirm-text="确定"
              cancel-text="取消"
              @on-change="changeType"></popup-picker>
          </FormItem>
          <FormItem prop="user">
            <Input type="text" :maxlength="30" size="large" v-model.trim="data.formData.user" clearable placeholder="请输入姓名(必填)">
              <span slot="prepend" class="p-red">姓&nbsp;&nbsp;&nbsp;名</span>
            </Input>
          </FormItem>
          <FormItem prop="type">
            <Input class="p-types" type="text" :maxlength="30" size="large" v-model.trim="data.formData.sex[0]" clearable placeholder="请选择性别(必选)">
              <span slot="prepend">性&nbsp;&nbsp;&nbsp;别</span>
            </Input>
            <popup-picker
              :show.sync="data.sexShow"
              :data="[['男', '女']]"
              v-model="data.formData.sex"
              confirm-text="确定"
              cancel-text="取消"
              @on-change="changeSex"></popup-picker>
          </FormItem>
          <FormItem prop="birthday">
            <Input class="p-birthday" type="text" :maxlength="30" size="large" v-model.trim="data.formData.birthday" clearable placeholder="请选择出生日期">
              <span slot="prepend">生&nbsp;&nbsp;&nbsp;日</span>
            </Input>
            <datetime v-model="data.formData.birthday"
                format="YYYY-MM-DD"
                :minYear="1500"
                :maxYear="3000"
                confirm-text="确定"
                cancel-text="取消"></datetime>
          </FormItem>
          <FormItem prop="label">
            <Input type="text" :maxlength="30" size="large" v-model.trim="data.formData.label" clearable placeholder="请输入标签">
              <span slot="prepend">标&nbsp;&nbsp;&nbsp;签</span>
            </Input>
          </FormItem>
          <FormItem prop="phone">
            <Input class="phone" number :maxlength="11" size="large" v-model.trim="data.formData.phone" clearable placeholder="请输入手机号(必填)">
              <span slot="prepend" class="p-red">手机号</span>
            </Input>
            <!-- <Button class="phoneCode" type="primary" @click="postCode()">发送验证码</Button> -->
          </FormItem>
          <FormItem prop="weixin">
            <Input type="text" :maxlength="20" size="large" v-model.trim="data.formData.weixin" clearable placeholder="请输入微信号">
              <span slot="prepend">微&nbsp;&nbsp;&nbsp;信</span>
            </Input>
          </FormItem>
          <FormItem prop="qq">
            <Input type="text" :maxlength="12" size="large" v-model.trim="data.formData.qq" clearable placeholder="请输入QQ号">
              <span slot="prepend">&nbsp;Q&nbsp;&nbsp;Q&nbsp;</span>
            </Input>
          </FormItem>
          <FormItem prop="company">
            <Input type="text" :maxlength="30" size="large" v-model.trim="data.formData.company" clearable placeholder="请输入公司">
              <span slot="prepend">公&nbsp;&nbsp;&nbsp;司</span>
            </Input>
          </FormItem>
          <FormItem prop="work">
            <Input type="text" :maxlength="30" size="large" v-model.trim="data.formData.work" clearable placeholder="请输入职业">
              <span slot="prepend">职&nbsp;&nbsp;&nbsp;业</span>
            </Input>
          </FormItem>
          <FormItem prop="title">
            <Input type="text" :maxlength="30" size="large" v-model.trim="data.formData.title" clearable placeholder="请输入职称">
              <span slot="prepend">职&nbsp;&nbsp;&nbsp;称</span>
            </Input>
          </FormItem>
          <FormItem prop="email">
            <Input type="email" size="large" v-model.trim="data.formData.email" clearable placeholder="请输入邮箱">
              <span slot="prepend">邮&nbsp;&nbsp;&nbsp;箱</span>
            </Input>
          </FormItem>
          <FormItem prop="address" class="x-address">
            <span style="padding-left: 8px" class="p-red">地&nbsp;&nbsp;&nbsp;址</span>
            <Input type="textarea" :maxlength="120" v-model.trim="data.formData.address" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入详细地址(必填)">
            </Input>
          </FormItem>
          <FormItem prop="sign" class="x-address">
            <span style="padding-left: 8px">签&nbsp;&nbsp;&nbsp;名</span>
            <Input type="textarea" :maxlength="120" v-model.trim="data.formData.sign" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入个性签名">
            </Input>
          </FormItem>
        </Form>
        <div class="p-error">{{data.error}}</div>
      </div>
      <div class="p-addFriends">
        <Button class="x-button" type="error" size="large" @click="saveFriends()">保存</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Icon, Modal, Input, Form, FormItem, Message } from 'iview'
import { Popup, Datetime, PopupPicker } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
import loopImg01 from '@/common/images/banner/study01.png'
import loopImg03 from '@/common/images/banner/english01.png'
export default {
  name: 'appEditInfo',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        userLogin: '',
        error: '',
        typeError: '',
        headerInfo: this.$route.meta,
        idex: '',
        type: '',
        typeShow: false,
        sexShow: false,
        typeName: [
          '家人', '朋友', '同事', '客户', '同乡', '校友', '其他'
        ],
        sexName: [
          '男', '女'
        ],
        typeImg: [
          'ios-home', 'ios-contacts', 'ios-football', 'ios-cafe', 'md-aperture', 'ios-school', 'ios-paw'
        ],
        formData: {
          type: ['家人'],           // 朋友圈类型
          id: new Date().getTime(), // 学号
          headImg: '',              // 头像
          user: '',                 // 用户名
          sex: ['男'],              // 性别
          birthday: '',             // 生日
          label: '',                // 标签
          phone: '',                // 手机号
          weixin: '',               // 微信
          qq: '',                   // QQ
          pass: '',                 // 通行证
          company: '',              // 公司
          work: '',                 // 职业
          title: '',                // 职称
          email: '',                // 邮箱
          address: '',              // 地址
          sign: ''                  // 签名
        },
        formRule: {
          user: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,30}$/,
            message: '姓名应为2-30位英文、数字、中文等'
          },
          label: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,30}$/,
            message: '标签应为2-30位英文、数字、中文等'
          },
          phone: {
            pattern: /^1[1-9]\d{9}$/,
            message: '手机号应为11位数字'
          },
          weixin: {
            pattern: /^[a-zA-Z0-9]{6,20}$/,
            message: '微信应为6-20位英文、数字'
          },
          qq: {
            pattern: /^[1-9][0-9]{4,11}$/,
            message: 'QQ应为5-12位数字'
          },
          company: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,30}$/,
            message: '公司应为2-30位英文、数字、中文等'
          },
          work: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,30}$/,
            message: '职业应为2-30位英文、数字、中文等'
          },
          title: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,30}$/,
            message: '职称应为2-30位英文、数字、中文等'
          },
          email: {
            pattern: /^([a-zA-Z0-9\u4E00-\u9FA5]+[_|\-|\.]?)*[a-zA-Z0-9\u4E00-\u9FA5]+@([a-zA-Z0-9\u4E00-\u9FA5]+[_|\-|\.]?)*[a-zA-Z0-9\u4E00-\u9FA5]+\.[a-zA-Z\u4E00-\u9FA5]{2,10}$/,
            message: '邮箱格式应为xx@xx.com等'
          },
          address: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5-：()-、，。]{6,120}$/,
            message: '地址应为6-120位英文、数字、中文、符号 ：() - 、，。等'
          },
          sign: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5-：()-、，。]{6,120}$/,
            message: '签名应为6-120位英文、数字、中文、符号 ：() - 、，。等'
          }
        }
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    this.data.url = this.$route.query.url
    this.data.type = this.$route.query.type
    this.data.idex = parseInt(this.$route.query.idex)
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      if (this.data.idex === -1) {
        this.data.formData = Object.assign(this.data.formData, this.data.user.userInfo) // 获取客户信息
      } else {
        this.data.formData = Object.assign(this.data.formData, this.data.user.friends[this.data.idex]) // 获取朋友信息
      }
    }
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      let data
      if (this.data.idex === -1) {
        data = this.data.user.userInfo
      } else {
        data = this.data.user.friends[this.data.idex] // 获取客户信息
      }
      if (data) {
        this.$back({
          path: '/appSeeInfo',
          query: {
            url: this.data.url,
            idex: this.data.idex
          }
        })
      } else {
        this.$back({
          path: '/appFriends',
          query: {
            type: '3'
          }
        })
      }
    },
    changeType () {
    },
    changeSex () {
    },
    saveFriends () {
      Message.destroy()
      let rule = this.data.formRule
      if (!rule.user.pattern.test(this.data.formData.user)) {
        Message.info({
          content: rule.user.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.label.pattern.test(this.data.formData.label) && this.data.formData.label !== '') {
        Message.info({
          content: rule.label.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.phone.pattern.test(this.data.formData.phone)) {
        Message.info({
          content: rule.phone.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.weixin.pattern.test(this.data.formData.weixin) && this.data.formData.weixin !== '') {
        Message.info({
          content: rule.weixin.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.qq.pattern.test(this.data.formData.qq) && this.data.formData.qq !== '') {
        Message.info({
          content: rule.qq.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.company.pattern.test(this.data.formData.company) && this.data.formData.company !== '') {
        Message.info({
          content: rule.company.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.work.pattern.test(this.data.formData.work) && this.data.formData.work !== '') {
        Message.info({
          content: rule.work.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.title.pattern.test(this.data.formData.title) && this.data.formData.title !== '') {
        Message.info({
          content: rule.title.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.email.pattern.test(this.data.formData.email) && this.data.formData.email !== '') {
        Message.info({
          content: rule.email.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.address.pattern.test(this.data.formData.address)) {
        Message.info({
          content: rule.address.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.sign.pattern.test(this.data.formData.sign) && this.data.formData.sign !== '') {
        Message.info({
          content: rule.sign.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (this.data.idex === -1) {
        this.data.user.userInfo = this.data.formData
      } else {
        this.data.user.friends[this.data.idex] = this.data.formData
      }
      localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
      Modal.warning({
        title: '信息提示',
        content: '信息保存成功！',
        okText: '确定',
        onOk: () => {
        }
      })
    }
  },
  filters: {
  },
  components: {
    Datetime, PopupPicker, appHeader, Button, Popup, Icon, Modal, Input, Form, FormItem, Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appEditInfo.styl"
</style>
