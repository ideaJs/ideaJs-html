<template>
  <div class="app">
    <div>
      <HeaderLine></HeaderLine>
    </div>
    <!--非可刷新页面-->
    <transition :name="$route.meta.direction">
      <keep-alive>
        <router-view v-if="!$route.meta.isReload && $route.meta.keepAlive" class="router-view"></router-view>
      </keep-alive>
    </transition>

    <!--可刷新页面-->
    <transition :name="$route.meta.direction">
      <router-view v-if="!$route.meta.isReload && !$route.meta.keepAlive" class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import HeaderLine from'@/components/config/headerLine.vue'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start (route) {
    }
  },
  components: {
    HeaderLine
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/reset.styl"
</style>
