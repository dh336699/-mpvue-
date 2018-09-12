<template>
  <article class="rater-container">
    <div v-for="item in stars" :key="item" class="stars">
      <img :src="key > item ? (key - item === 0.5 ? halfStar : fullStar) : grayStar" class="rating" :style="{left: item*64 + 'rpx' }">
      <view class="item" :style="{left: item*64 + 'rpx' }" data-key="item+0.5" @click="selectLeft(item)"></view>
      <view class="item" :style="{left: item*64 + 22 + 'rpx' }" data-key="item+1" @click="selectRight(item)"></view>
    </div>
  </article>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      stars: {
        type: Array,
        default: [0, 1, 2, 3, 4]
      },
      grayStar: {
        type: String,
        defult: '/static/images/Shape@2x.png'
      },
      fullStar: {
        type: String,
        defult: '/static/images/Shape Copy 3@2x.png.png'
      },
      halfStar: {
        type: String,
        defult: '/static/images/Group 10@2x'
      },
      key: {
        type: Number,
        defult: 4.5
      }
    },
    methods: {
      selectLeft(item) {
        console.log(item + 0.5)
        this.key = item + 0.5
      },
      selectRight(item) {
        console.log(item + 1)
        this.key = item + 1
      }
    },
    components: {}
  }

</script>

<style lang='less' scoped>
  .rater-container {
    .stars {
      .rating {
        position: absolute;
        margin-top: -22rpx;
        margin-left: 328rpx;
        .imgs(44rpx, 44rpx);
        img {
          .imgs(44rpx, 44rpx);
        }
      }
      .item {
        position: absolute;
        margin-left: 328rpx;
        .imgs(22rpx, 44rpx);
      }
    }
  }

</style>
