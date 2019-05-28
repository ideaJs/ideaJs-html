<!-- Created by macmzon@163.com-->
<template>
  <div class="appLogin">
    <div class="appName">登录</div>
    <div class="container">
      <img width="100px" height="100px" class="headerFace" :src="data.headerFace" />

      <Form ref="formInline" :model="data.formInline" :rules="data.ruleInline" inline>
        <FormItem prop="phone">
          <Input number :maxlength="11" size="large" v-model="data.formInline.phone" clearable placeholder="手机号">
          <Icon type="md-phone-portrait" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" size="large" v-model="data.formInline.password" clearable placeholder="密码">
          <Icon type="ios-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <appCaptcha :appCaptchaInfo="data.appCaptchaInfo"></appCaptcha>
      <!-- <div class="onRegiste">
        <span>未注册？马上去</span><span @click="onRegiste">注册</span>
      </div> -->
    </div>
  </div>
</template>
<script>
  import { Button, Input, Form, FormItem, Icon } from 'iview'
  import { Popup } from 'vux'
  import appCaptcha from'@/components/appConfig/appCaptcha.vue'
  import headerFace001 from '../../common/images/small-icon/headerFace001.png'
  import {getUsers} from '../../common/user/getUsers.js'
export default {
  name: 'appLogin',
  data () {
    return {
      showPopup: false,
      data: {
        headerFace: headerFace001,
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '用户名错误', trigger: 'blur' },
            { pattern: /^\w{6,18}$/, message: '用户名应为6-18位英文、数字和_', trigger: 'blur' }
          ],
          phone: [
            { required: true, type:'number', message: '手机号错误', trigger: 'blur' },
            { pattern: /^1[123456789]\d{9}$/, message: '手机号应为11位数字', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码错误', trigger: 'blur' },
            { pattern: /^\w{6,18}$/, message: '密码应为6-18位英文、数字和_', trigger: 'blur' }
          ]
        },
        appCaptchaInfo: {

        }
      }
    }
  },
  mounted () {
    this.data.appCaptchaInfo.start = this.start
  },
  methods: {
    start () {
      let phone = this.data.formInline.phone
      phone = getUsers(phone)
      if (phone) {
        if (phone.pwd === this.data.formInline.password) {
          document.getElementById('msg').innerHTML = ''
          this.$route.meta.isBack = false
          this.$push({
            path: '/appIndex',
            query: {
              type: '3'
            }
          })
        } else {
          document.getElementById('msg').innerHTML = '密码错误，请重试'
          setTimeout(() => {
            document.getElementById('msg').innerHTML = ''
          }, 1000)
        }
      } else {
        document.getElementById('msg').innerHTML = '手机号错误，请重试'
        setTimeout(() => {
          document.getElementById('msg').innerHTML = ''
        }, 1000)
      }
    },
    onRegiste () {
      this.$route.meta.isBack = false
      this.$push({
        path: '/appRegiste',
        query: {
          type: '3'
        }
      })
    }
  },
  components: {
    appCaptcha, Button, Input, Form, FormItem, Icon, Popup
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appLogin.styl"
</style>
