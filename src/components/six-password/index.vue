<template>
  <article>
    <section class="mask" v-if="isInput"></section>
    <section class="pwd-modal" v-if="isInput">
      <!-- <p class="close">X</p> -->
      <p class="title">输入查看密码</p>
      <ul>
        <li><i class="circle" v-if="password.length>=1"></i></li>
        <li><i class="circle" v-if="password.length>=2"></i></li>
        <li><i class="circle" v-if="password.length>=3"></i></li>
        <li><i class="circle" v-if="password.length>=4"></i></li>
        <li><i class="circle" v-if="password.length>=5"></i></li>
        <li><i class="circle" v-if="password.length>=6"></i></li>
        <input type="number" maxlength="6" v-model="password" @input="pwd" />
      </ul>
    </section>
  </article>
</template>

<script>
  export default {
    data() {
      return {
        password: '',
        isFocus: false
      }
    },
    props: {
      isInput: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      pwd() {
        let reg = /[^\d]/g
        this.password = this.password.replace(reg, '')
        console.log(this.password)
      },
      getFocus () {
        this.isFocus = true
      }
    },
    components: {}
  }
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      min-height: 100%;
      width: 100%;
      background:rgba(0,0,0,0.5);
      z-index: 10;
    }
    .pwd-modal {
      position: fixed;
      top: 258rpx;
      left: 54rpx;
      right: 54rpx;
      height: 504rpx;
      background: white;
      z-index: 99;
      border-radius: 8rpx;
      // .close {
      //   margin-top: 20rpx;
      //   margin-left: 20rpx;
      // }
      .title {
        margin-top: 50rpx;
        text-align: center;
      }
      ul {
        position: relative;
        display: flex;
        margin: 94rpx 38rpx 104rpx;
        li {
          width: 100%;
          height: 96rpx;
          line-height: 94rpx;
          border: 1rpx solid  gray;
          border-right: 0 none;
          box-sizing: border-box;
          text-align: center;
          font-size: 0;
          .circle {
            display: inline-block;
            vertical-align: middle;
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
            background: black;
          }
        }
        li:last-of-type {
          border-right: 1rpx solid  gray;
        }
        input {
          width:200%;
          min-height: 100%;
          position:absolute;
          // text-indent:-999em;
          left:-100%;
          top:0;
          z-index:1111111;
        }
      }
    }
</style>
