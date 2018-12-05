<template>
  <div class="app">
    <!--非可刷新页面-->
    <transition :name="viewAnimate">
      <keep-alive>
        <router-view v-if="!$route.meta.isReload && $route.meta.keepAlive" class="router-view"></router-view>
      </keep-alive>
    </transition>

    <!--可刷新页面-->
    <transition :name="viewAnimate">
      <router-view v-if="!$route.meta.isReload && !$route.meta.keepAlive" class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
      direction: state => state.direction
    })
  },
  watch: {
    '$route' (to, from) {
      if (this.direction === 'forward') {
        this.viewAnimate = 'slide-left'
      } else {
        this.viewAnimate = 'slide-right'
      }
    }
  },
  data () {
    return {
      viewAnimate: 'slide-left'
    }
  },
  mounted () {
  },
  methods: {
    start (route) {
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/reset.styl"
  @import "components/stylus/App.styl"
</style>
