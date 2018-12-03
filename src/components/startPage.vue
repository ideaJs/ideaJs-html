<!--启动页 Created by macmzon on 2018/11/2-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import {Loading} from 'element-ui'
export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Welcome'
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
//      this.$post('welcome', {name: 'welcome'}, {}, (res) => {
//        console.log(res)
//      })
      setTimeout(() => {
        this.$router.push({
          path: '/login',
          query: {
            type: '3'
          }
        })
      }, 3000)
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="stylus" scoped>
  .hello
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px

</style>
