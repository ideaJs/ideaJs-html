<!-- Created by macmzon@163.com-->
<template>
  <div class="appLogin">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <img width="100px" height="100px" class="headerFace" :src="data.headerFace" />
      <Form ref="formData" :model="data.formData" :rules="data.formRule" inline>
        <!-- 
        <FormItem prop="user">
          <Input type="text" size="large" v-model.trim="data.formData.user" clearable placeholder="用户名 (2-12位英文、数字、中文等)">
          <Icon type="ios-person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        -->
        <FormItem prop="phone">
          <Input number :maxlength="11" size="large" v-model="data.formData.phone" clearable placeholder="手机号">
          <Icon type="md-phone-portrait" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="pass">
          <Input type="password" size="large" v-model="data.formData.pass" clearable placeholder="密码 (6-12位英文、数字)">
          <Icon type="ios-lock" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <appCaptcha :appCaptchaInfo="data.appCaptchaInfo"></appCaptcha>
      <div class="onRegiste">
        <span>未注册？马上去</span><span @click="onRegiste">注册</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { Button, Input, Form, FormItem, Icon, Modal } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'
  import appCaptcha from'@/components/appConfig/appCaptcha.vue'
  import headerFace001 from '../../common/images/small-icon/headerFace001.png'
export default {
  name: 'appLogin',
  data () {
    return {
      showBack: false,
      data: {
        headerFace: headerFace001,
        headerInfo: this.$route.meta,
        formData: {
          user: '',
          phone: '',
          pass: ''
        },
        formRule: {
          user: [
            { required: true, message: '用户名应为2-12位英文、数字、中文等', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,12}$/, message: '用户名应为2-12位英文、数字、中文等', trigger: 'blur' }
          ],
          phone: [
            { required: true, type:'number', message: '手机号应为11位数字', trigger: 'blur' },
            { pattern: /^1[123456789]\d{9}$/, message: '手机号应为11位数字', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '密码应为6-12位英文、数字和_', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '密码应为6-12位英文、数字等', trigger: 'blur' }
          ]
        },
        appCaptchaInfo: {
        }
      }
    }
  },
  mounted () {
    this.data.url = this.$route.query.url || '/appMember'
    this.data.appCaptchaInfo.start = this.start
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
  },
  methods: {
    start () {
      // if (!/\S{2,12}/.test(this.data.formData.user)) return
      if (!/^1[123456789]\d{9}$/.test(this.data.formData.phone)) return
      if (!/^\w{6,12}$/.test(this.data.formData.pass)) return
      let usermsg = JSON.parse(localStorage.getItem(this.data.formData.phone))
      if (usermsg) {
        if (usermsg.pass === this.data.formData.pass) {
          localStorage.setItem('userLogin', this.data.formData.phone)
          document.getElementById('msg').innerHTML = ''
          this.$route.meta.isBack = false
          this.$push({
            path: this.data.url,
            query: {
              type: '3'
            }
          })
        } else {
          Modal.confirm({
            title: '信息提示',
            content: '密码错误，请重试',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
              this.$router.go(0)
            },
            onCancel: () => {
              this.$router.go(0)
            }
          })
        }
      } else {
        Modal.confirm({
          title: '信息提示',
          content: '手机号错误，请重试',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.$router.go(0)
          },
          onCancel: () => {
            this.$router.go(0)
          }
        })
      }
    },
    back () {
      this.$route.meta.isBack = true
      this.$back({
        path: this.data.url,
        query: {
          type: '3'
        }
      })
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
    appHeader, appCaptcha, Button, Input, Form, FormItem, Icon, Popup, Modal
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appLogin.styl"
</style>
