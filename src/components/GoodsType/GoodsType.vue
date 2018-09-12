<template>
  <article class="goodsType-container">
    <p class="active">综合</p>
    <p>销量</p>
    <p>价格
      <img class="top-bottom" src="/static/images/Group 6@2x.png">
    </p>
    <p @click="cardOrList">
      <img v-if="isCard" class="layout" src="/static/images/Group 8@2x.png">
      <img v-else class="layout" src="/static/images/Group 82@2x.png">
    </p>
  </article>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      isCard: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      cardOrList() {
        this.isCard = !this.isCard
        this.$emit('cardOrList', this.isCard)
      }
    },
    components: {
    }
  }
</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';
  .goodsType-container {
    .list(row,flex-start, center);
    height: 80rpx;
    background: white;
    p {
      flex: 0 0 210rpx;
      .list(row, center, center);
      .font(32rpx, @gray);
      // padding-right: 72rpx;
      height: 48rpx;
      line-height: 48rpx;
      border-right: 2rpx solid #F0F0F0;
      text-align: center;
      &.active {
        .font(32rpx, @black);
      }
      .top-bottom {
        margin-left: 20rpx;
        .imgs(20rpx, 32rpx);
      }
      .layout {
        .imgs(42rpx, 42rpx);
      }
    }
    p:last-of-type {
      flex: 1;
      border-right: 0;
    }
  }
</style>
