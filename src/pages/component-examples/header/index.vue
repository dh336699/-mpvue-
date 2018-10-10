<template>
  <article>
    <MHeader :lists="lists" @chooseType="chooseType"></MHeader>
  </article>
</template>

<script>
// import * as api from '@/common/urls'
// import lastPage from '@/components/lastPage'
  import Vue from 'vue'
// import {toast} from '@/common/msgAlert'
// import { transform13Time } from '@/utils/index'
  import MHeader from 'components/sixHeader'
  export default {
    data() {
      return {
        lists: [
          {id: 1, typeName: '全部', status: true},
          {id: 2, typeName: '水果'},
          {id: 3, typeName: '蔬菜'},
          {id: 4, typeName: '面食'},
          {id: 5, typeName: '饮料'},
          {id: 6, typeName: '套餐'},
          {id: 5, typeName: '果蔬'},
          {id: 6, typeName: '套餐'},
          {id: 5, typeName: '果蔬'},
          {id: 6, typeName: '套餐'}
        ]
      }
    },
    methods: {
      chooseType(val) {
        this.lists.forEach(item => {
          Vue.set(item, 'status', false)
        })
        Vue.set(val, 'status', true)
        console.log(val.id)
      }
    },
    components: {
      MHeader
    }
  }
</script>

<style lang='less' scoped>

</style>
