<template>
  <article class="calendar-container">
    <section class="choose-date-title" :class="!weekIsShow? 'weekIsShow': ''">
      <p class="title">选择日期
        <img src="/static/images/delete_icon@2x.png" class="delete" @click="closeCalendar">
      </p>
      <div class="week" v-if="weekIsShow">
        <p>日</p>
        <p>一</p>
        <p>二</p>
        <p>三</p>
        <p>四</p>
        <p>五</p>
        <p>六</p>
      </div>
    </section>
    <section class="calendar" :style="{'height': scrollViewHeight + 'rpx'}">
      <!--<div class="title">{{year}}年{{month + 1}}月 至 {{year}}年{{month + 2}}月</div>-->
      <scroll-view scroll-y="true" :style="{'height': calendarHeight + 'rpx'}">
        <ul class="days">
          <div class="title">{{year}}-{{month}}</div>
          <li :style='{marginLeft: marginleft + "rpx"}' :class="{'currentItem' : one, 'no-selected': 1 <= today}" @click="chooseOne">1</li>
          <li :class="{'currentItem' : item.state, 'no-selected': item.selected === false}" v-for="item in currMonthDays" :key="item"
            @click="chooseDay(month, item)">
            <p v-if="!item.today">{{item.day}}</p>
            <p v-else-if="item.today">今天</p>
          </li>
          <div class="title">{{year}}-{{nextMonth}}</div>
          <li :style='{marginLeft: marginlefts + "rpx"}' :class="{'currentItem' : two, 'no-selected': nextToday <= 0}" @click="chooseTwo">1</li>
          <li :class="{'currentItem' : item.state, 'no-selected': item.selected === false}" v-for="item in nextMonthDays" :key="item"
            @click="chooseDay(nextMonth, item)">{{item.day}}</li>
        </ul>
      </scroll-view>
    </section>
  </article>

</template>

<script>
  export default {
    data() {
      return {
        modal: false,
        modalTitle: '选择对接人',
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        nextMonth: new Date().getMonth(),
        currMonthDays: [],
        nextMonthDays: [],
        currOneDay: null,
        currOneDays: null,
        nextOneDay: null,
        marginleft: null,
        marginlefts: null,
        currentItem: null,
        one: false, // 当前月1号
        two: false, // 当前月2号
        today: '', // 当日日期,用于判断适合能选定,
        nextToday: '', // 下一日期,用于判断适合能选定,
        calendarHeight: 0,
        date: ''
      }
    },
    props: {
      scrollViewHeight: { // 日历主体的Scroll-View 的高度，需传入
        type: Number,
        default: 644
      },
      weekIsShow: { // 是否显示星期
        type: Boolean,
        default: true
      },
      today30day: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this._initMonth() // 月份前 + 0
      this._initCalendatHeight() // 动态计算日历高度
      if (!this.today30day) {
        this._getMonthDays()
      } else {
        this._getMonthDay()
      }
      this._oneToWeek()
    },
    methods: {
      closeCalendar() {
        this.$emit('closeCalendar')
      },
      chooseDay(month, item) {
        if (item.selected === false) {
          return
        }
        console.log(item)
        let day = new Date()
        let year = day.getFullYear()
        this.date = `${year}-${item.currMonth}-${item.day}`
        // console.log(this.date)
        this.closeCalendar()
        this.$emit('chooseDay', this.date)
      },
      _initMonth() {
        this.month = String(this.month + 1)
        this.nextMonth = String(this.nextMonth + 2)
        console.log(this.month)
        this.month = this.month.padStart(2, '0')
        this.nextMonth = this.nextMonth.padStart(2, '0')
      },
      _initCalendatHeight() {
        if (this.weekIsShow) {
          this.calendarHeight = this.scrollViewHeight - 156
        } else {
          this.calendarHeight = this.scrollViewHeight - 88
        }
      },
      _getMonthDays() {
        let days = new Date()
        // 获取当前日期
        let today = days.getDate()
        this.today = today
        let today30day = today + 30
        // 获取当前月份[0-11]
        let currMonth = days.getMonth()
        // 生成实际月份,因为比实际小1,所以加1
        days.setMonth(currMonth + 1)
        days.setDate(0)
        // 这里根据月份获取当前月有多少天,这个月份对应现实的月份,而不是[0-11]里的
        let currMonthDays = days.getDate()
        today30day = today30day - currMonthDays
        this.nextToday = today30day
        console.log(today30day) // 当前日期往后30天过后无法选中
        let arr1 = []
        for (let a = 0; a < currMonthDays; a++) {
          let time = 2
          let obj1 = {}
          time += a
          if (time === today) {
            obj1.currMonth = currMonth + 1 // 拼入字段当前月
            obj1.day = time // 拼入字段当前日
            obj1.state = false // 拼入字段当前选中状态
            obj1.today = true
            this.currMonthDays.push(obj1)
          } else if (time <= today) {
            obj1.currMonth = currMonth + 1 // 拼入字段当前月
            obj1.day = time // 拼入字段当前日
            obj1.state = false // 拼入字段当前选中状态
            obj1.selected = false
            this.currMonthDays.push(obj1)
          } else {
            obj1.currMonth = currMonth + 1 // 拼入字段当前月
            obj1.day = time // 拼入字段当前日
            obj1.state = false // 拼入字段当前选中状态
            this.currMonthDays.push(obj1)
          }
          obj1.currMonth = currMonth + 1 // 拼入字段当前月
          obj1.day = time // 拼入字段当前日
          obj1.state = false // 拼入字段当前选中状态
          arr1.push(obj1)
        }
        // 获取当月有多少天
        arr1.splice(-1, 1)
        this.currMonthDays = arr1
        console.log(currMonthDays, 'currMonthDays')

        // 获取下个月天数,此时月份是0-11,月份需加2,例如:当月月份是 0-11中的4,此时本月对应的是5,则下月是6
        days.setMonth(currMonth + 1)
        let nextMonth = days.getMonth() + 1
        // 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的
        days.setDate(0)
        // 返回下个月的天数
        let nextMonthDays = days.getDate()
        console.log(nextMonthDays, 'nextMonthDays')
        let arr2 = []
        for (let a = 0; a < nextMonthDays; a++) {
          let time = 2
          let obj2 = {}
          time += a
          if (time >= today30day) {
            obj2.selected = false // 灰色的无法选中的
            obj2.currMonth = nextMonth // 拼入字段下个月
            obj2.day = time // 拼入字段当前日
            obj2.state = false // 拼入字段当前选中状态
            arr2.push(obj2)
          } else {
            obj2.currMonth = nextMonth // 拼入字段下个月
            obj2.day = time // 拼入字段当前日
            obj2.state = false // 拼入字段当前选中状态
            arr2.push(obj2)
          }
        }
        arr2.splice(-1, 1)
        this.nextMonthDays = arr2
      },
      _getMonthDay() {
        let days = new Date()
        // 获取当前日期
        let today = days.getDate()
        this.today = today
        // 获取当前月份[0-11]
        let currMonth = days.getMonth()
        // 生成实际月份,因为比实际小1,所以加1
        days.setMonth(currMonth + 1)
        days.setDate(0)
        // 这里根据月份获取当前月有多少天,这个月份对应现实的月份,而不是[0-11]里的
        let currMonthDays = days.getDate()
        let arr1 = []
        for (let a = 0; a < currMonthDays; a++) {
          let time = 2
          let obj1 = {}
          time += a
          if (time === today) {
            obj1.currMonth = currMonth + 1 // 拼入字段当前月
            obj1.day = time // 拼入字段当前日
            obj1.state = false // 拼入字段当前选中状态
            obj1.today = true
            this.currMonthDays.push(obj1)
          } else if (time <= today) {
            obj1.currMonth = currMonth + 1 // 拼入字段当前月
            obj1.day = time // 拼入字段当前日
            obj1.state = false // 拼入字段当前选中状态
            obj1.selected = false
            this.currMonthDays.push(obj1)
          } else {
            obj1.currMonth = currMonth + 1 // 拼入字段当前月
            obj1.day = time // 拼入字段当前日
            obj1.state = false // 拼入字段当前选中状态
            this.currMonthDays.push(obj1)
          }
          obj1.currMonth = currMonth + 1 // 拼入字段当前月
          obj1.day = time // 拼入字段当前日
          obj1.state = false // 拼入字段当前选中状态
          arr1.push(obj1)
        }
        // 获取当月有多少天
        arr1.splice(-1, 1)
        this.currMonthDays = arr1
        console.log(currMonthDays, 'currMonthDays')

        // 获取下个月天数,此时月份是0-11,月份需加2,例如:当月月份是 0-11中的4,此时本月对应的是5,则下月是6
        days.setMonth(currMonth + 1)
        let nextMonth = days.getMonth() + 1
        // 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的
        days.setDate(0)
        // 返回下个月的天数
        let nextMonthDays = days.getDate()
        console.log(nextMonthDays, 'nextMonthDays')
        let arr2 = []
        for (let a = 0; a < nextMonthDays; a++) {
          let time = 2
          let obj2 = {}
          time += a
          obj2.currMonth = nextMonth // 拼入字段下个月
          obj2.day = time // 拼入字段当前日
          obj2.state = false // 拼入字段当前选中状态
          arr2.push(obj2)
        }
        arr2.splice(-1, 1)
        this.nextMonthDays = arr2
      },
      _oneToWeek() {
        let weekDay = [0, 1, 2, 3, 4, 5, 6]
        let day = new Date()
        day.setMonth(day.getMonth())
        day.setDate(1)
        let currOneDay = weekDay[day.getDay()]
        day.setMonth(day.getMonth() + 1)
        day.setDate(1)
        let nextOneDay = weekDay[day.getDay()]
        this.currOneDay = nextOneDay
        this.marginleft = currOneDay * 98

        let days = new Date()
        days.setMonth(days.getMonth())
        days.setDate(1)
        // console.log(days, 'DAYS1')// 当月
        days.setMonth(days.getMonth() + 1)
        days.setDate(1)
        let currOneDays = weekDay[days.getDay()]
        // console.log(days, 'DAYS2')// 次月
        let nextOneDays = weekDay[days.getDay()]
        this.currOneDays = nextOneDays
        this.marginlefts = currOneDays * 99
        // console.log(currOneDay)
        // console.log(nextOneDay)
      }
    },
    components: {}
  }

</script>

<style lang='less' scoped>
  .calendar-container {
    height: 100%;
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
        border-bottom: 2rpx solid #E5E5E5;
        box-sizing: border-box;
        .delete {
          position: absolute;
          margin-top: 10rpx;
          margin-left: 220rpx;
          width: 24rpx;
          height: 24rpx;
          border: 20rpx solid transparent;
        }
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
    .calendar {
      padding-left: 30rpx;
      padding-right: 30rpx;
      background: white;
      .title {
        padding-top: 20rpx;
        padding-bottom: 30rpx;
        text-align: center;
        font-size: 34rpx;
        color: #222222;
      }
      .days {
        white-space: pre-wrap;
        li {
          display: inline-block;
          width: 99rpx;
          height: 99rpx;
          line-height: 90rpx;
          font-size: 34rpx;
          color: #222222;
          text-align: center;
          .title {
            font-size: 28rpx;
            font-family: PingFang-SC-Medium;
            color: rgba(50, 56, 61, 1);
          }
          &.currentItem {
            background: #F3A68D;
            color: white;
            border-radius: 10rpx;
          }
          &.no-selected {
            color: #888888
          }
        }
      }
    }
  }

</style>
