<!--启动页 Created by macmzon on 2018/11/2-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'
  import { Button } from 'iview'
  export default {
    name: 'Welcome',
    data () {
      return {
        data: {

        }
      }
    },
    mounted () {
    },
    methods: {
      start () {
        this.$post('welcome', {name: 'welcome'}, {}, (res) => {
          console.log(res)
        })
        setTimeout(() => {
          this.$push({
            path: '/login',
            query: {
              type: '3'
            }
          })
        }, 3000)
      }
    },
    components: {
      Group,
      Cell,
      Button
    }
  }
</script>
<style lang="stylus" scoped>
  .hello
    background: #fff

</style>
