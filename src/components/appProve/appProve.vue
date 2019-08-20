<!-- Created by macmzon@163.com-->
<template>
  <div class="appProve">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="x-step">
        <div class="x-icon">
          <Icon type="ios-person"></Icon>
          <span>————</span>
          <Icon type="ios-camera"></Icon>
          <span>————</span>
          <Icon type="ios-mail"></Icon>
        </div>
        <div class="x-list">
          <span>填写信息</span>
          <span>证件照片</span>
          <span>认证结果</span>
        </div>
      </div>
      <Form ref="formData" :model="data.formData" inline>
        <FormItem prop="name">
          <Input type="text" :maxlength="30" size="large" v-model.trim="data.formData.name" clearable placeholder="请输入姓名(必填)">
            <Icon type="ios-person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="idCode">
          <Input type="text" :maxlength="18" size="large" v-model.trim="data.formData.idCode" clearable placeholder="请输入身份证号(必填)">
            <Icon type="ios-card-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="phone">
          <Input class="phone" number :maxlength="11" size="large" v-model.trim="data.formData.phone" clearable placeholder="请输入手机号(必填)">
          <Icon type="md-phone-portrait" slot="prepend"></Icon>
          </Input>
          <!-- <Button class="phoneCode" type="primary" @click="postCode()">发送验证码</Button> -->
        </FormItem>
      </Form>
      <div class="x-prove">
        <Button class="x-button" type="error" size="large" @click="submit()">下一步</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Input, Form, FormItem, Icon, Message } from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appProve',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        headerInfo: this.$route.meta,
        formData: {
          name: '',              // 姓名
          idCode: '',            // 身份证号码
          phone: '',             // 手机号
          idPhotoA: '',           // 身份证正面照片
          idPhotoB: '',           // 身份证背面照片
          status: '0',           // 认证状态，0 未认证，1 认证失败，2 认证成功 3 认证中
          error: '',             // 认证失败原因
          date: ''               // 认证成功日期
        },
        formRule: {
          name: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,30}$/,
            message: '姓名应为2-30位英文、数字、中文等'
          },
          idCode: {
            pattern: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
            message: '身份证号码应为15/18位数字和X'
          },
          phone: {
            pattern: /^1[1-9]\d{9}$/,
            message: '手机号应为11位数字'
          }        }
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
    }
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$push({
        path: '/appMember',
        query: {
          type: '3'
        }
      })
    },
    submit () {
      Message.destroy()
      let rule = this.data.formRule
      if (!rule.name.pattern.test(this.data.formData.name)) {
        Message.info({
          content: rule.name.message + '，请重新输入！',
          duration: 3,
          closable: true
        })
        return
      }
      if (!rule.idCode.pattern.test(this.data.formData.idCode)) {
        Message.info({
          content: rule.idCode.message + '，请重新输入！',
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
      this.data.formData.date = new Date().getTime()
      this.data.user.prove =  this.data.formData          // 客户信息
      localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
      this.$route.meta.isBack = false
      this.$push({
        path: '/appIdCard',
        query: {
          type: '3'
        }
      })
    }
  },
  components: {
    appHeader, Button, Input, Form, FormItem, Icon, Popup, Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appProve.styl"
</style>
