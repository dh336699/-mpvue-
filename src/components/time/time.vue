<template>
  <article class="time-container">
    <section class="choose-date-title" :class="!weekIsShow? 'weekIsShow': ''">
      <p class="title">选择出发时间
        <img src="/static/images/delete_icon@2x.png" class="delete" @click="closeCalendar">
      </p>
      <p class="date">{{dates}}</p>
    </section>
    <section class="time-range-wrapper">
      <scroll-view scroll-y="true" style="height: 500rpx">
        <ul>
          <li v-for="item in timeLists" :key="item" 
          @click="chooseTime(item.time)">{{item.time}}</li>
        </ul>
      </scroll-view>
    </section>
  </article>
</template>

<script>
  export default {
    data() {
      return {
        timeLists: [
          {time: '04:00'},
          {time: '05:00'},
          {time: '06:00'},
          {time: '07:00'},
          {time: '08:00'},
          {time: '09:00'},
          {time: '10:00'},
          {time: '11:00'},
          {time: '12:00'},
          {time: '13:00'},
          {time: '14:00'},
          {time: '15:00'},
          {time: '16:00'},
          {time: '17:00'},
          {time: '18:00'},
          {time: '19:00'},
          {time: '20:00'},
          {time: '21:00'},
          {time: '22:00'},
          {time: '23:00'}
        ]
      }
    },
    props: {
      dates: {
        type: String,
        default: ''
      }
    },
    methods: {
      chooseTime(time) {
        this.$emit('chooseTime', time)
      },
      closeCalendar() {
        this.$emit('closeCalendar')
      }
    },
    components: {}
  }
</script>

<style lang='less' scoped>
  .time-container {
    background: white;
    .choose-date-title {
      border-bottom: 2rpx solid #E5E5E5;
      background: white;
      &.weekIsShow {
        border-bottom: 0 none
      }
      .title {
        height: 88rpx;
        line-height: 78rpx;
        font-size: 34rpx;
        color: #32383D;
        text-align: center;
        box-sizing: border-box;
        .delete {
          position: absolute;
          margin-top: 10rpx;
          margin-left: 190rpx;
          width: 24rpx;
          height: 24rpx;
          border: 20rpx solid transparent;
        }
      }
      .date {
        line-height: 48rpx;
        font-size: 28rpx;
        font-family: PingFang-SC-Medium;
        color: rgba(50, 56, 61, 1);
        text-align: center;
      }
      .week {
        display: flex;
        justify-content: space-around;
        padding-left: 30rpx;
        padding-right: 30rpx;
        height: 76rpx;
        line-height: 76rpx;
        font-size: 34rpx;
        color: #222222;
        p {
          flex: 0 0 99rpx;
          text-align: center;
        }
      }
    }
    .time-range-wrapper {
      ul {
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        padding: 0 30rpx;
        height: 60rpx;
        background: white;
        li {
          display: inline-block;
          width: 25%;
          height: 44rpx;
          font-size: 28rpx;
          font-family: PingFang-SC-Medium;
          color: rgba(50, 56, 61, 1);
          text-align: center;
        }
      }
    }
  }

</style>
