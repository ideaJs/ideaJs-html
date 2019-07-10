<!-- Created by macmzon@163.com-->
<template>
  <div class="appSet">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div v-if="data.formData" class="p-main">
        <Form ref="formData" :model="data.formData" :rules="data.formRule" inline>
          <FormItem prop="user">
            <Input type="text" size="large" v-model.trim="data.formData.user" clearable placeholder="用户名 (2-12位英文、数字、中文等)">
              <span slot="prepend">用户名</span>
            </Input>
          </FormItem>
          <FormItem prop="phone">
            <Input class="phone" number :maxlength="11" size="large" v-model.trim="data.formData.phone" clearable placeholder="手机号">
              <span slot="prepend">手机号</span>
            </Input>
            <!-- <Button class="phoneCode" type="primary" @click="postCode()">发送验证码</Button> -->
          </FormItem>
          <FormItem prop="email">
            <Input type="email" size="large" v-model.trim="data.formData.email" clearable placeholder="邮箱 (xx@xx.com等)">
              <span slot="prepend">邮&nbsp;&nbsp;&nbsp;箱</span>
            </Input>
          </FormItem>
          <!-- 
          <FormItem prop="pass">
            <Input type="password" size="large" v-model.trim="data.formData.pass" clearable placeholder="密码 (6-12位英文、数字)">
              <span slot="prepend">密&nbsp;&nbsp;&nbsp;码</span>
            </Input>
          </FormItem>
          -->
          <FormItem prop="weixin">
            <Input type="text" size="large" v-model.trim="data.formData.weixin" clearable placeholder="微信">
              <span slot="prepend">微&nbsp;&nbsp;&nbsp;信</span>
            </Input>
          </FormItem>
          <FormItem prop="qq">
            <Input type="text" size="large" v-model.trim="data.formData.qq" clearable placeholder="QQ">
              <span slot="prepend">&nbsp;Q&nbsp;&nbsp;Q&nbsp;</span>
            </Input>
          </FormItem>
          <FormItem prop="address" class="p-address">
            <span style="padding-left: 8px">地&nbsp;&nbsp;&nbsp;址</span>
            <Input type="textarea" v-model.trim="data.formData.address" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入详细地址">
            </Input>
          </FormItem>
        </Form>
      </div>
      <div class="p-bottom">
        <Button type="warning" round @click="confirmBtn()">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button, Input, Form, FormItem, Icon, Modal } from 'iview'
  import { Popup } from 'vux'
  import appHeader from'@/components/appConfig/appHeader.vue'

  export default {
    name: 'appSet',
    data () {
      return {
        showBack: false,
        data: {
          headerInfo: this.$route.meta,
          formData: {
            user: '',
            phone: '',
            email: '',
            pass: '',
            weixin: '',
            qq: '',
            address: ''
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
              { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '密码应为6-12位英文、数字', trigger: 'blur' }
            ],
            weixin: [
              { required: true, message: '微信应为6-20位英文、数字', trigger: 'blur' },
              { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '微信应为6-20位英文、数字', trigger: 'blur' }
            ],
            qq: [
              { required: true, message: 'QQ应为5-12位数字', trigger: 'blur' },
              { pattern: /^\d{5,12}$/, message: 'QQ应为5-12位数字', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请输入详细地址 (只包含英文、数字、中文等)', trigger: 'blur' },
              { pattern: /^[a-zA-Z0-9\u4E00-\u9FA5-()（）]{6,120}$/, message: '请输入详细地址 (只包含英文、数字、中文等)', trigger: 'blur' }
            ]
          }
        }
      }
    },
    mounted () {
      this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
      this.data.formData = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.formData.phone = parseInt(this.data.formData.phone)
      /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
      this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
      this.$route.meta.header.rightFuc = this.getMenu             // header右侧菜单按钮事件
      this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    },
    methods: {
      back () {
        this.$route.meta.isBack = true
        this.$back({
          path: '/appMember',
          query: {
            type: '3'
          }
        })
      },
      getMenu () {
        this.$route.meta.isBack = false
        this.$push({
          path: '/appMember',
          query: {
            type: '3'
          }
        })
      },
      confirmBtn () {
        if (!/^[a-zA-Z0-9\u4E00-\u9FA5]{2,12}$/.test(this.data.formData.user)) return
        if (!/^1[1-9]\d{9}$/.test(this.data.formData.phone)) return
        if (!/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/.test(this.data.formData.email)) return
        // if (!/^[a-zA-Z0-9]{6,12}$/.test(this.data.formData.pass)) return
        if (!/^[a-zA-Z0-9]{6,20}$/.test(this.data.formData.weixin)) return
        if (!/^\d{5,12}$/.test(this.data.formData.qq)) return
        if (!/[a-zA-Z0-9\u4E00-\u9FA5-()（）]{6,120}/.test(this.data.formData.address)) return
        if (this.data.userLogin === this.data.formData.phone) {
          localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.formData))
        } else {
          localStorage.removeItem(this.data.userLogin)
          localStorage.setItem('userLogin', this.data.formData.phone)
          localStorage.setItem(this.data.formData.phone, JSON.stringify(this.data.formData))
        }
        Modal.warning({
          title: '信息提示',
          content: '信息设置成功！',
          okText: '确定',
          onOk: () => {
          }
        })
      }
    },
    components: {
      appHeader, Button, Popup, Input, Form, FormItem, Icon, Modal
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appSet.styl"
</style>