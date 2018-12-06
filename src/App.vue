<template>
  <div class="app">
    <transition :name="direction" keep-alive>
      <router-view v-if="!$route.meta.isReload"></router-view>
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/reset.styl"
  @import "components/appStylus/App.styl"
</style>
