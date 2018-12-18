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
          <li v-if="!today30day" :style='{marginLeft: marginleft + "rpx"}' :class="{'currentItem' : one,  'noOrder': currkeys === false}"
            @click="chooseOne">1</li>
          <li v-else :style='{marginLeft: marginleft + "rpx"}' :class="{'currentItem' : one, 'no-selected': 1 < today, 'noOrder': currkeys === false}"
            @click="chooseOne">1</li>
          <li :class="{'currentItem' : item.state, 'no-selected': item.selected === false, 'noOrder': item.time === false}" v-for="(item, index) in currMonthDays"
            :key="index +100" @click="chooseDay(month, item)">
            <p v-if="!item.today">{{item.day}}</p>
            <p v-else-if="item.today">今天</p>
          </li>
          <div class="title">{{year}}-{{nextMonth}}</div>
          <li v-if="!today30day" :style='{marginLeft: marginlefts + "rpx"}' :class="{'currentItem' : two, 'noOrder': Nextkeys === false}"
            @click="chooseTwo">1</li>
          <li v-else :style='{marginLeft: marginlefts + "rpx"}' :class="{'currentItem' : two, 'no-selected': 1 < nextToday, 'noOrder': Nextkeys === false}"
            @click="chooseTwo">1</li>
          <li :class="{'currentItem' : item.state, 'no-selected': item.selected === false, 'noOrder': item.time === false}" v-for="item in nextMonthDays"
            :key="item.day" @click="chooseDay(nextMonth, item)">{{item.day}}</li>
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
        date: '',
        Nextkeys: {}, // 下个月1号包含的当日预订信息
        currkeys: {} // 本月1号包含的当日预订信息
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
      },
      dateArraylist: { // 日期下时间的预定情况
        type: Map,
        default () {
          return new Map()
        }
      }
    },
    mounted() {
      console.log(this.dateArraylist)
      this._initMonth() // 月份前 + 0
      this._initCalendatHeight() // 动态计算日历高度
      if (!this.today30day) {
        this._getMonthDays()
      } else {
        this._getMonthDay()
      }
      this._oneToWeek() // 计算星期
    },
    methods: {
      closeCalendar() {
        this.$emit('closeCalendar')
      },
      chooseOne() {
        if (this.today >= 1 && !this.today30day) {
          return false
        } else if (this.currkeys === false) {
          return false
        }
        let day = new Date()
        let year = day.getFullYear()
        let currMonth = day.getMonth() + 1
        currMonth = this._initSelected(currMonth)
        this.date = `${year}-${currMonth}-01` // 返回的时间格式
        let currDayOrderInfo = {
          date: this.date,
          time: this.currkeys
        }
        this.closeCalendar()
        this.$emit('chooseDay', currDayOrderInfo)
        // console.log(this.date)
      },
      chooseTwo() {
        if (this.nextToday <= 0 && !this.today30day) {
          return false
        } else if (this.Nextkeys === false) {
          return false
        }
        let day = new Date()
        let year = day.getFullYear()
        let currMonth = day.getMonth() + 2
        currMonth = this._initSelected(currMonth)
        this.date = `${year}-${currMonth}-01`
        let currDayOrderInfo = {
          date: this.date,
          time: this.Nextkeys
        }
        this.closeCalendar()
        this.$emit('chooseDay', currDayOrderInfo)
        // console.log(this.date)
      },
      chooseDay(month, item) {
        if (item.selected === false) {
          return
        } else if (item.time === false) {
          console.log('return')
          return
        }
        console.log(item)
        let day = new Date()
        let year = day.getFullYear()
        item.day = this._initSelected(item.day)
        item.currMonth = this._initSelected(item.currMonth)
        console.log(item)
        this.date = `${year}-${item.currMonth}-${item.day}`
        // console.log(this.date)
        let currDayOrderInfo = {
          date: this.date,
          time: item.time
        }
        // return false
        this.closeCalendar()
        this.$emit('chooseDay', currDayOrderInfo)
      },
      _initMonth() {
        this.month = String(this.month + 1)
        this.nextMonth = String(this.nextMonth + 2)
        console.log(this.month)
        this.month = this.month.padStart(2, '0')
        this.nextMonth = this.nextMonth.padStart(2, '0')
      },
      _initSelected(date) {
        date = String(date)
        date = date.padStart(2, '0')
        return date
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
        // let currMonthDays = days.getDate()
        let currMonthDays = this.mGetDate()
        console.log(currMonthDays, 'currMonthDayscurrMonthDays')
        today30day = today30day - today
        this.nextToday = this.today
        console.log(today30day) // 当前日期往后30天过后无法选中
        let arr1 = []
        for (let a = 0; a < currMonthDays; a++) {
          let time = 2
          let obj1 = {}
          time += a
          for (let key of this.dateArraylist.keys()) {
            let mon = key.substr(5, 2)
            let keys = key.substr(key.length - 2, 2) // '2018-08-02' 截取日期，并和当前月的日期进行匹配，若相同，则给日期赋值当天的信息
            let curMonth = currMonth + 1 // 获取当前月
            curMonth = curMonth.toString()
            curMonth = curMonth.padStart(2, '0')
            // console.log(curMonth, 'Key')
            if (Number(keys) === time && Number(mon) === Number(curMonth)) {
              obj1.time = this.dateArraylist.get(key)
            } else if (Number(keys) === 1 && Number(mon) === Number(curMonth)) {
              this.currkeys = this.dateArraylist.get(key)
              // console.log(this.currkeys, 'this.currkeys')
            }
          }
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
        // console.log(this.currMonthDays)

        // 获取下个月天数,此时月份是0-11,月份需加2,例如:当月月份是 0-11中的4,此时本月对应的是5,则下月是6
        days.setMonth(currMonth + 2)
        days.setDate(0)
        let nextMonth = days.getMonth() + 1
        // 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的
        // 返回下个月的天数
        // let nextMonthDays = days.getDate()
        let nextMonthDays = this.nGetDate()
        console.log(nextMonthDays, 'nextMonthDays')
        let arr2 = []
        for (let a = 0; a < nextMonthDays; a++) {
          let time = 2
          let obj2 = {}
          time += a
          for (let key of this.dateArraylist.keys()) {
            let mon = key.substr(5, 2)
            let keys = key.substr(key.length - 2, 2) // '2018-08-02' 截取日期，并和当前月的日期进行匹配，若相同，则给日期赋值当天的信息
            let nexMonth = currMonth + 2 // 获取当前月
            // console.log(nexMonth, '当前月')
            nexMonth = nexMonth.toString()
            nexMonth = nexMonth.padStart(2, '0')
            if (Number(keys) === time && Number(mon) === Number(nexMonth)) {
              obj2.time = this.dateArraylist.get(key)
            } else if (Number(keys) === 1 && Number(mon) === Number(nexMonth)) {
              this.Nextkeys = this.dateArraylist.get(key)
              // console.log(this.Nextkeys, 'this.Nextkeys')
            }
          }
          if (time > this.today) {
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
        console.log(this.nextMonthDays)
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
        let currMonthDays = this.mGetDate()
        let arr1 = []
        for (let a = 0; a < currMonthDays; a++) {
          let time = 2
          let obj1 = {}
          time += a
          if (time === today) { // 用于判断当然日期是今天，日历显示为今天
            obj1.currMonth = currMonth + 1 // 拼入字段当前月
            obj1.day = time // 拼入字段当前日
            obj1.state = false // 拼入字段当前选中状态
            obj1.today = true // 显示今天
            this.currMonthDays.push(obj1)
          } else if (time <= today) { // 当天之前的日期是否可以选中
            obj1.currMonth = currMonth + 1 // 拼入字段当前月
            obj1.day = time // 拼入字段当前日
            obj1.state = false // 拼入字段当前选中状态
            obj1.selected = false // 当天之前的是否可以选中
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
        // 获取当月有多少天（因为是从二号开始算的，所以最后一天会比正常多一天）
        arr1.splice(-1, 1)
        this.currMonthDays = arr1
        console.log(currMonthDays, 'currMonthDays')

        // 获取下个月天数,此时月份是0-11,月份需加2,例如:当月月份是 0-11中的4,此时本月对应的是5,则下月是6
        days.setMonth(currMonth + 1)
        let nextMonth = days.getMonth() + 1
        // 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的
        days.setDate(0)
        // 返回下个月的天数
        let nextMonthDays = this.nGetDate()
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
      mGetDate() {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var d = new Date(year, month, 0)
        return d.getDate()
      },
      nGetDate() {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 2
        var d = new Date(year, month, 0)
        return d.getDate()
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
        this.marginlefts = currOneDays * 97
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
          width: 97rpx;
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
          &.noOrder {
            color: red
          }
        }
      }
    }
  }

</style>
