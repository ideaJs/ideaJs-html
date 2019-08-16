<!-- Created by macmzon@163.com-->
<template>
  <div class="appProveResult">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div v-if="!data.formData.status || data.formData.status === '0'" class="unProve">
        <div class="proveImg">
          <Icon type="ios-alert" />
        </div>
        <div class="proveTitle">未认证
        </div>
        <div class="proveMsg">您的身份信息还未认证，赶快去认证吧。
        </div>
        <div class="proveBtn">
          <Button type="error" size="large" @click="goProve()">去认证</Button>
        </div>
      </div>
      <div v-if="data.formData.status === '1'" class="proveFail">
        <div class="proveImg">
          <Icon type="ios-close-circle" />
        </div>
        <div class="proveTitle">认证失败
        </div>
        <div class="proveMsg" v-html="data.formData.error || '您的身份信息认证失败，请重新进行认证。'">
        </div>
        <div class="proveBtn">
          <Button type="error" size="large" @click="goProve()">重新认证</Button>
        </div>
      </div>
      <div v-if="data.formData.status === '2'" class="proveSuccess">
        <div class="proveImg">
          <Icon type="ios-checkmark-circle" />
        </div>
        <div class="proveTitle">认证成功
        </div>
        <div class="proveMsg">您的身份信息已经认证成功，感谢您的信任和支持。
        </div>
      </div>
      <div v-if="data.formData.status === '3'" class="onProve">
        <div class="proveImg">
          <Icon type="ios-compass" />
        </div>
        <div class="proveTitle">认证中
        </div>
        <div class="proveMsg">您的身份信息正在认证中，请耐心等候。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Input, Form, FormItem, Icon, Modal, Message } from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appProveResult',
  data () {
    return {
      showBack: false,
      data: {
        user: {},
        headerInfo: this.$route.meta,
        formData: {
          name: '',              // 姓名
          idCode: '',            // 身份证号码
          idPhotoA: ' ',           // 身份证正面照片
          idPhotoB: ' ',           // 身份证背面照片
          status: '0',           // 认证状态，0 未认证，1 认证失败，2 认证成功 3 认证中
          error: '',             // 认证失败原因
          date: ''               // 认证成功日期
        }
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.formData = this.data.user.prove
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
    goProve () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appProve',
        query: {
          type: '3'
        }
      })
    }
  },
  components: {
    appHeader, Button, Input, Form, FormItem, Icon, Popup, Modal, Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appProveResult.styl"
</style>
