<template>
  <article class="shopcar-wrapper">
    <div class="shopcar" :class="{'active': small}" @click="orderConfirm">
      <img src="../../../static/assets/shopcar.png">
      <div v-if="num">{{num}}</div>
    </div>
    <div class="price-wrapper"  :class="{'active': small}">
      <span>￥{{amount}}</span>
      <span>&nbsp;&nbsp;&nbsp;优惠￥{{discountAmount}}</span>
    </div>
    <div class="add-shopcar" v-if="small" @click="addShopCard">加入购物车</div>
    <div class="paid-btn" :class="small ? '' : 'active'" v-bind:class="buyNow ? 'actives': ''"  @click="completeOrder">
      {{right}}
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  import {getCarGoodsCount} from '@/common/urls'
  import {toast} from '@/common/msgAlert'
  export default {
    data() {
      return {
        num: 0,
        discountAmount: 0,
        amount: 0
      }
    },
    props: {
      amount: {
        type: Number,
        default: 0
      },
      small: {
        type: Boolean,
        default: false
      },
      buyNow: {
        type: Boolean,
        default: false
      },
      right: {
        type: String,
        default: '去结算'
      }
    },
    mounted() {
      this._getCarGoodsCount()
    },
    methods: {
      addShopCard() {
        this.$emit('addShopCar')
      },
      orderConfirm() {
        if (!this.num) {
          toast('温馨提示', '购物车没有商品，请去挑选商品吧~')
          return
        }
        wx.navigateTo({
          url: '/pages/details/confirm-order/main'
        })
      },
      completeOrder() {
        this.$emit('completeOrder')
      },
      _getCarGoodsCount() {
        getCarGoodsCount().then((res) => {
          console.log(res, 'shopcard购物车')
          this.num = res.data.data.num
          this.amount = res.data.data.amount
          this.discountAmount = res.data.data.discountAmount
        })
      }
    }
  }
</script>

<style lang="less">
  .shopcar-wrapper {
    display: flex;
    align-items: center;
    position: fixed;
    bottom:0;
    padding-left: 40rpx;
    height: 98rpx;
    width:100%;
    box-sizing: border-box;
    background: white;
    .shopcar {
      position: relative;
      flex: 0 0  120rpx;
      margin-bottom: 70rpx;
      width: 120rpx;
      height: 120rpx;
      &.active {
        margin-right: 0
      }
      img {
        width: 120rpx;
        height: 120rpx;
      }
      div {
        position: absolute;
        top: 20rpx;
        left: 68rpx;
        width: 36rpx;
        height: 36rpx;
        background: #FF4343;
        color: white;
        font-size: 26rpx;
        border-radius: 50%;
        text-align: center;
      }
    }
    .price-wrapper {
      flex: 1;
      &.active {
        margin-left: -14rpx;
      }
      span:first-child {
        color: #F5A68A;
        font-size: 34rpx;
      }
      span:last-child {
        color: #888888;
        font-size: 26rpx;
      }
    }
    .add-shopcar {
      flex: 0 0 160rpx;
      font-size: 26rpx;
      height: 100%;
      line-height: 98rpx;
      text-align: center;
      color: RGBA(255, 255, 255, 1);
      background: RGBA(243, 195, 141, 1);
    }
    .paid-btn {
      flex: 0 0 240rpx;
      text-align: center;
      background: #F3A68D;
      color: white;
      font-size: 34rpx;
      height: 100%;
      line-height: 98rpx;
      font-family:PingFang-SC-Regular;
      &.active {
        flex: 0 0 240rpx;
        line-height: 98rpx;
        text-align: center;
        font-size: 26rpx;
        color: RGBA(255, 255, 255, 1);
      }
      &.actives {
        flex: 0 0 140rpx;
        line-height: 98rpx;
        text-align: center;
        font-size: 26rpx;
        color: RGBA(255, 255, 255, 1);
      }
    }
  }
</style>