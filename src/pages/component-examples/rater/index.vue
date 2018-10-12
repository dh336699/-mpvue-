<template>
  <article class="rater">
    <Rater @ratingScore="ratingScore"></Rater>
  </article>
</template>

<script>
// import * as api from '@/common/urls'
// import lastPage from '@/components/lastPage'
// import Vue from 'vue'
// import {toast} from '@/common/msgAlert'
// import { transform13Time } from '@/utils/index'
  import Rater from 'components/rater'
  export default {
    data() {
      return {
      }
    },
    methods: {
      ratingScore(val) {
        console.log(val, '评分')
      }
    },
    components: {
      Rater
    }
  }
</script>

<style lang='less' scoped>
.rater {
  min-height: 100%;
}
</style>
