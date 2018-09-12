<template>
  <article class="header-container">
    <header class="header-wrapper">
      <div class="search">
        <img src="/static/images/search.png" :class="isFocus ? 'active' : ''">
        <input type="text" @focus="getFocus(1)" @blur="getFocus(0)" placeholder="搜索喜欢的商品" placeholder-class="placeholderClass">
        <a class="cancle" v-if="isFocus" @click="getFocus(0)">取消</a>
      </div>
    </header>
  </article>
</template>

<script>
  // import store from '@/store/index'
  export default {
    data() {
      return {
      }
    },
    props: {
      isFocus: {
        type: Boolean,
        default: false
      }
    },
    // computed: {
    //   focus() {
    //     return store.state.isFocus
    //   }
    // },
    methods: {
      getFocus(type) {
        // store.commit('setIsFocus', type)
        // console.log(store.state.isFocus)
        this.$emit('getFocus', type)
      }
    },
    components: {
    }
  }
</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';
  .header-container {
    .header-wrapper {
      padding-bottom: 10rpx;
      border-bottom: 2rpx solid rgba(181, 181, 181, 0.4153);
      background: @white;
      .search {
        .btn(flex, 70rpx, rgba(240,240,240,0.8154), 35rpx, #959897, 24rpx);
        .list(row, flex-start, center);
        margin-left: 26rpx;
        margin-right: 38rpx;
        text-align: left;
        img {
          margin-left: 236rpx;
          margin-right: 20rpx;
          width: 28rpx;
          height: 28rpx;
          &.active {
            margin-left: 44rpx;
          }
        }
        input {
          flex: 1;
        }
        .placeholderClass {
          .font(24rpx, #959897);
        }
        .cancle {
          line-height: 36rpx;
          padding: 0 28rpx;
          .font(32rpx, #999999);
          border-left:1rpx solid rgba(141,141,141,1);
        }
      }
    }
  }
</style>
