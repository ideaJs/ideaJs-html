<!-- Created by macmzon@163.com-->
<template>
  <div class="appAddress">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div class="p-active">
        <div class="active-title">
          默认地址
        </div>
        <Row>
          <Col span="15">
            <div class="active-user">
              <Icon v-if="data.address.active.user" type="ios-contact" />
              {{data.address.active.user}}
            </div>
          </Col>
          <Col span="9" style="text-align:right;">
            <div class="active-phone">
              <Icon v-if="data.address.active.phone" type="ios-call" />
              {{data.address.active.phone}}
            </div>
          </Col>
        </Row>
        <div class="active-address">
          <Icon v-if="data.address.active.address" type="ios-pin" />
          {{data.address.active.address}}
        </div>
      </div>
      <div class="tabBtns">
        <Tabs>
          <TabPane label="地址列表" icon="md-globe">
            <div class="address">
              <div class="p-list" v-for="(item, idex) in data.address.list" :key="idex">
                <Row>
                  <Col span="15">
                    <div class="p-user">
                      <Icon type="ios-contact" />
                      {{item.user}}
                    </div>
                  </Col>
                  <Col span="9" style="text-align:right;">
                    <div class="p-phone">
                      <Icon type="ios-call" />
                      {{item.phone}}
                    </div>
                  </Col>
                </Row>
                <div class="p-address">
                  <Icon type="ios-pin" />
                  {{item.address}}
                </div>
                <div class="p-manage">
                  <Col span="8">
                    <Button :type="item.id === data.address.active.id ? 'warning' : 'success'" shape="circle"  @click="setDefault(item)">
                      默认
                    </Button>
                  </Col>
                  <Col span="16" style="text-align: right;">
                    <Button class="p-edit" type="primary" shape="circle"  @click="editAddress(item, idex)">
                      <Icon type="ios-create" />
                    </Button>
                    <Button class="p-delete" type="warning" shape="circle" @click="delAddress(item, idex)">
                      <Icon type="ios-trash" />
                    </Button>
                  </Col>
                </div>
              </div>
              <div v-if="data.address.list.length === 0" class="x-unData">
                <Icon type="md-walk" />
                <div>暂无数据</div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <Modal class="address-model" v-model="data.showModel">
        <div slot="header">
          <Icon type="ios-information-circle"></Icon>
          <span>编辑地址</span>
        </div>
        <div class="edit-main" style="padding: 1rem 1.5rem">
          <Form ref="formData" v-if="data.showModel" :model="data.formData" inline>
            <FormItem prop="user">
              <Input type="text" :maxlength="30" size="large" v-model.trim="data.formData.user" clearable placeholder="请输入姓名(必填)">
                <span slot="prepend">姓&nbsp;&nbsp;&nbsp;名</span>
              </Input>
            </FormItem>
            <FormItem prop="phone">
              <Input class="phone" number :maxlength="11" size="large" v-model.trim="data.formData.phone" clearable placeholder="请输入手机号(必填)">
                <span slot="prepend">手机号</span>
              </Input>
              <!-- <Button class="phoneCode" type="primary" @click="postCode()">发送验证码</Button> -->
            </FormItem>
            <FormItem prop="address" class="x-address">
              <span style="padding-left: 8px">地&nbsp;&nbsp;&nbsp;址</span>
              <Input type="textarea" :maxlength="120" v-model.trim="data.formData.address" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入详细地址(必填)">
              </Input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button size="large" @click="cancelEdit()">取消</Button>
          <Button type="error" size="large" @click="saveAddress()">确定</Button>
        </div>
      </Modal>
      <div class="p-addAdress">
        <Button class="x-button" type="error" size="large" @click="addAddress()">添加地址</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Row, Col, Button, Tabs, TabPane, Icon, Modal, Input, Form, FormItem, Message } from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
import loopImg01 from '@/common/images/banner/study01.png'
import loopImg03 from '@/common/images/banner/english01.png'
export default {
  name: 'appAddress',
  data () {
    return {
      showBack: false,
      data: {
        showModel: false,
        user: {},
        userLogin: '',
        headerInfo: this.$route.meta,
        editIdex: 0,
        address: {
          active: {},
          list: []
        },
        formData: {
          id: '',
          user: '',
          phone: '',
          address: ''
        },
        formRule: {
          user: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{2,30}$/,
            message: '姓名应为2-30位英文、数字、中文等'
          },
          phone: {
            pattern: /^1[1-9]\d{9}$/,
            message: '手机号应为11位数字'
          },
          address: {
            pattern: /^[a-zA-Z0-9\u4E00-\u9FA5-：()-、，。]{6,120}$/,
            message: '地址应为6-120位英文、数字、中文、符号 ：() - 、，。等'
          }
        }
      }
    }
  },
  created () {
    this.data.userLogin = localStorage.getItem('userLogin') || ''     // 获取客户登录状态
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      this.data.user.addressList = this.data.user.addressList || this.data.address
      this.data.address = Object.assign(this.data.address, this.data.user.addressList)       // 获取客户信息
    }
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      Message.destroy()
      this.$route.meta.isBack = true
      this.$back({
        path: '/appSet',
        query: {
          type: '3'
        }
      })
    },
    setDefault (data, idex) {
      Message.destroy()
      this.data.address.active = data
      this.data.user.addressList.active = data
      localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
    },
    saveAddress () {
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
      if (!rule.phone.pattern.test(this.data.formData.phone)) {
        Message.info({
          content: rule.phone.message + '，请重新输入！',
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
      this.data.user.addressList.list[this.data.editIdex] = this.data.formData
      if (this.data.formData.id === this.data.address.active.id) {
        this.data.address.active = this.data.formData
        this.data.user.addressList.active = this.data.formData
      }
      localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
      if (this.data.user.addressList.list.length === 1) {
        this.setDefault(this.data.user.addressList.list[0], 0)
      }
      this.data.showModel = false
    },
    delAddress (data, idex) {
      Message.destroy()
      Modal.confirm({
        title: '信息提示',
        content: '确定要删除此地址吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.data.address.list.splice(idex, 1)
          if (data.id === this.data.address.active.id) {
            if (this.data.address.list.length > 0) {
              this.data.address.active = this.data.address.list[0]
            } else {
              this.data.address = {
                active: {},
                list: []
              }
            }
          }
          this.data.user.addressList = this.data.address
          localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
        },
        onCancel: () => {
        }
      })
    },
    editAddress (data, idex) {
      Message.destroy()
      data.phone = parseInt(data.phone)
      this.data.formData = Object.assign({}, data)
      this.data.editIdex = idex
      this.data.showModel = true
    },
    addAddress () {
      Message.destroy()
      this.data.formData = {
        id: new Date().getTime(),
        user: '',
        phone: '',
        address: ''
      }
      this.data.editIdex = this.data.user.addressList.list.length
      this.data.showModel = true
    },
    cancelEdit () {
      Message.destroy()
      this.data.formData = {
        id: new Date().getTime(),
        user: '',
        phone: '',
        address: ''
      }
      this.data.showModel = false
    }
  },
  filters: {
  },
  components: {
    appHeader, Row, Col, Button, Popup, Tabs, TabPane, Icon, Modal, Input, Form, FormItem, Message
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/appAddress.styl"
</style>
