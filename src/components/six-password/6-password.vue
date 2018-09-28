<template>
  <article>
    <section class="mask"></section>
    <section class="pwd-modal" @click="getFocus">
      <!-- <p class="close">X</p> -->
      <p class="title">输入查看密码</p>
      <ul>
        <li><i class="circle" v-if="password.length>=1"></i></li>
        <li><i class="circle" v-if="password.length>=2"></i></li>
        <li><i class="circle" v-if="password.length>=3"></i></li>
        <li><i class="circle" v-if="password.length>=4"></i></li>
        <li><i class="circle" v-if="password.length>=5"></i></li>
        <li><i class="circle" v-if="password.length>=6"></i></li>
      </ul>
      <input ref="inputs" :focus="isFocus" type="text" maxlength="6" v-model="password" @input="pwd" />
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
@import '../../styles/variables.less';
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
        display: flex;
        margin: 94rpx 38rpx 104rpx;
        li {
          width: 100%;
          height: 96rpx;
          line-height: 94rpx;
          border: 1rpx solid  #ECECEB;
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
          border-right: 1rpx solid  #ECECEB;
        }
      }
      input {
        text-indent: -9999rpx;
        margin-left: -9999rpx;
        opacity: 0;
      }
    }
</style>
