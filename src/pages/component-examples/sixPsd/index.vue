<template>
  <article>
    <SixPsd :isInput="isInput"></SixPsd>
  </article>
</template>

<script>
// import * as api from '@/common/urls'
// import lastPage from '@/components/lastPage'
// import Vue from 'vue'
// import {toast} from '@/common/msgAlert'
// import { transform13Time } from '@/utils/index'
import SixPsd from 'components/six-password'
export default {
  data() {
    return {
      isInput: true
    }
  },
  components: {
    SixPsd
  }
}
</script>

<style lang='less' scoped>

</style>
