<template>
  <article>
    <KeyMap :isShow="isShow" :keyBoardType="keyBoardType" @triggerEvent="triggerEvent" @inputchange="inputchange"></KeyMap>
  </article>
</template>

<script>
// import * as api from '@/common/urls'
// import lastPage from '@/components/lastPage'
// import Vue from 'vue'
// import {toast} from '@/common/msgAlert'
// import { transform13Time } from '@/utils/index'
  import KeyMap from '@/components/car-keymap/car-keymap'
  export default {
    data() {
      return {
        isShow: true,
        keyBoardType: 2 // 1为省份键盘，其它为英文键盘
      }
    },
    methods: {
      inputchange(val) { // 输入其他事件走这里
        console.log(val, 'inputchange')
      },
      triggerEvent(val) { // 确定和删除事件走这里
        console.log(val, 'triggerEvent')
      }
    },
    components: {
      KeyMap
    }
  }
</script>

<style lang='less' scoped>

</style>
