<template>
  <article class="calendar-wrapper">
    <calendar :weekIsShow="weekIsShow" :scrollViewHeight="scrollViewHeight"
    :today30day="today30day"
    @closeCalendar="closeCalendar" @chooseDay="chooseDay"></calendar>
  </article>
</template>

<script>
// import * as api from '@/common/urls'
// import lastPage from '@/components/lastPage'
// import Vue from 'vue'
// import {toast} from '@/common/msgAlert'
// import { transform13Time } from '@/utils/index'
  import Calendar from 'components/calendar'
  export default {
    data() {
      return {
        scrollViewHeight: 930, // 日历在930rpx高度内滚动
        weekIsShow: true, // 日历上是否需要星期
        today30day: true // 时间可选范围30天以内还是不限于30天
      }
    },
    methods: {
      closeCalendar() {
        this.chooseDate = false
        this.isTime = false
      },
      chooseDay(currDayOrderInfo) {
        console.log(currDayOrderInfo, 'currDayOrderInfo')
        // this.dates = currDayOrderInfo.date
        // this.currDayOrderInfoTime = currDayOrderInfo.time
        // this.isTime = true
      }
    },
    components: {
      Calendar
    }
  }
</script>

<style lang='less' scoped>

</style>
