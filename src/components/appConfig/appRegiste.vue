<!-- Created by macmzon@163.com-->
<template>
  <div class="appRegiste">
    <appHeader :headerInfo="headerInfo"></appHeader>
    <div class="">
      <Button type="primary" round @click.active="back()">上一页</Button>
      <Button type="success" round @click.active="start()">下一页</Button>
    </div>
  </div>
</template>

<script>
  import { Button } from 'iview'
  import appHeader from'@/components/appConfig/appHeader.vue'
export default {
  name: 'appRegiste',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    start () {
    }
  },
  components: {
    appHeader,
    Button
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
