<template>
  <article class="swiper-container">
    <swiper :style="{height: options.height, width: options.width}" @change="swiperChange" :autoplay="options.autoplay"
    :interval="options.interval" :circular="true" :indicator-dots="options.indicator" :current="current">
      <swiper-item v-for="item in list" :key="item">
        <image :src="item" :style="{height: options.height, width: options.width}" />
      </swiper-item>
    </swiper>
    <view class="dots" v-if="!options.indicator">
      <block v-for="item in list" :key="item">
        <view class="dot" :class="{active: index === current}"></view>
      </block>
    </view>
  </article>
</template>

<script>
  // import * as api from '@/common/urls'
  // import * as xx from '@/common/wx'
  // import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  // import lastPage from '@/components/lastPage'
  // import Vue from 'vue'
  // import { transform13Time } from '@/utils/index'
  export default {
    data() {
      return {
        current: 0
      }
    },
    props: {
      options: {
        type: Object,
        default: {
          height: '360rpx',
          width: '100%',
          autoplay: true,
          interval: 3000,
          indicator: true
        }
      },
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      swiperChange(e) {
        this.current = e.mp.detail.current
      }
    },
    components: {

    }
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';

  .swiper-container {
    .slide-image {
      width: 100%;
      height: 360rpx;
    }
    .dots {
      margin: 20rpx auto 0;
      .list(row, center, center);

      .dot {
        width: 16rpx;
        height: 6rpx;
        background: rgba(203, 202, 198, 1);
        border-radius: 6rpx;
        margin-right: 6rpx;

        /*选中以后的小圆点样式 */
        &.active {
          width: 30rpx;
          background: rgba(64, 59, 55, 1);
        }
      }
    }
  }

</style>
