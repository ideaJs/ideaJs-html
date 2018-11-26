<template>
  <div id="app">
    <!--非可刷新页面-->
    <transition :name="'slide-' + ($route.meta.direction === 'forward' ? 'in' : 'out')">
      <keep-alive>
        <router-view v-if="!$route.meta.isReload && $route.meta.keepAlive" class="router-view"></router-view>
      </keep-alive>
    </transition>

    <!--可刷新页面-->
    <transition :name="'slide-' + ($route.meta.direction === 'forward' ? 'in' : 'out')">
      <router-view v-if="!$route.meta.isReload && !$route.meta.keepAlive" class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
