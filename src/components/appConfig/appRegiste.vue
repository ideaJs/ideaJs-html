<!-- Created by macmzon@163.com-->
<template>
  <div class="appRegiste">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <Form ref="formData" :model="data.formData" :rules="data.formRule" inline>
        <FormItem prop="user">
          <Input type="text" size="large" v-model.trim="data.formData.user" clearable placeholder="用户名 (2-12位英文、数字、中文等)">
          <Icon type="ios-person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="phone">
          <Input class="phone" number :maxlength="11" size="large" v-model.trim="data.formData.phone" clearable placeholder="手机号 (必填)">
          <Icon type="md-phone-portrait" slot="prepend"></Icon>
          </Input>
          <!-- <Button class="phoneCode" type="primary" @click="postCode()">发送验证码</Button> -->
        </FormItem>
        <FormItem prop="email">
          <Input type="email" size="large" v-model.trim="data.formData.email" clearable placeholder="邮箱 (xx@xx.com等)">
          <Icon type="ios-mail" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="pass">
          <Input type="password" size="large" v-model.trim="data.formData.pass" clearable placeholder="密码 (6-12位英文、数字)">
          <Icon type="ios-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <appCaptcha :appCaptchaInfo="data.appCaptchaInfo"></appCaptcha>
      <div class="onLogin">
        <span>已注册？马上去</span><span @click="onLogin">登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button, Input, Form, FormItem, Icon, Modal } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
  import appCaptcha from'@/components/appConfig/appCaptcha.vue'
  import headerFace001 from '../common/images/small-icon/headerFace001.png'
export default {
  name: 'appRegiste',
  data () {
    return {
      showBack: false,
      data: {
        headerFace: headerFace001,
        headerInfo: this.$route.meta,
        formData: {
          user: '',
          phone: '',
          email: '',
          pass: ''
        },
        formRule: {
          user: [
            { required: true, message: '用户名应为2-12位英文、数字、中文等', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,12}$/, message: '用户名应为2-12位英文、数字、中文等', trigger: 'blur' }
          ],
          phone: [
            { required: true, type:'number', message: '手机号应为11位数字', trigger: 'blur' },
            { pattern: /^1[1-9]\d{9}$/, message: '手机号应为11位数字', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱格式应为xx@xx.com等', trigger: 'blur' },
            { pattern: /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/, message: '邮箱格式应为xx@xx.com等', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '密码应为6-12位英文、数字', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '密码应为6-12位英文、数字等', trigger: 'blur' }
          ]
        },
        appCaptchaInfo: {

        }
      }
    }
  },
  mounted () {
    this.data.appCaptchaInfo.start = this.start
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
  },
  methods: {
    start () {
      if (!/^[a-zA-Z0-9\u4E00-\u9FA5]{2,12}$/.test(this.data.formData.user)) return
      if (!/^1[1-9]\d{9}$/.test(this.data.formData.phone)) return
      if (!/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/.test(this.data.formData.email)) return
      if (!/^[a-zA-Z0-9]{6,12}$/.test(this.data.formData.pass)) return
      if (localStorage.getItem(this.data.formData.phone)) {
        Modal.confirm({
          title: '信息提示',
          content: '用户手机号已经注册，请返回登录！',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.$route.meta.isBack = true
            this.$push({
              path: '/appLogin',
              query: {
                type: '3'
              }
            })
          },
          onCancel: () => {
          }
        })
        return
      }
      this.data.formData.course = {}         // 已激活课程
      this.data.formData.collectEnWords = {} // 英语词汇收藏
      this.data.formData.learn = {}          // 在学小课程
      this.data.formData.jifen = 0           // 积分
      localStorage.setItem(this.data.formData.phone, JSON.stringify(this.data.formData))
      localStorage.setItem('userLogin', this.data.formData.phone)
      Modal.warning({
        title: '信息提示',
        content: '用户注册成功！',
        okText: '确定',
        onOk: () => {
          this.$route.meta.isBack = true
          this.$push({
            path: '/appMember',
            query: {
              type: '3'
            }
          })
        }
      })
    },
    onLogin () {
      this.$route.meta.isBack = true
      this.$push({
        path: '/appLogin',
        query: {
          type: '3'
        }
      })
    },
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: '/appMember',
        query: {
          type: '3'
        }
      })
    },
    postCode () {
      console.log('发送手机验证码')
    }
  },
  components: {
    appHeader, appCaptcha, Button, Input, Form, FormItem, Icon, Popup, Modal
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appRegiste.styl"
</style>
