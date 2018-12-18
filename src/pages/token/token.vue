<template lang="html">
  <div class="authorize">
    <!-- 登录授权页面，样式以及跳转路径，根据自己需要进行修改， -->
    <img src="/static/images/home_image1@2x.png" class="logo">
    <!-- <a href="/pages/component-examples/calendar/main">分包</a> -->
    <button type="primary" name="button" open-type="getUserInfo" @getuserinfo="getUserInfo">授权微信用户信息</button>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        token: 'getToken'
      })
    },
    mounted() {
      let token = this.token
      if (token) {
        wx.switchTab({
          url: '/pages/shouye/main'
        })
      }
    },
    methods: {
      ...mapMutations({
        setToken: 'setToken'
      }),
      ...mapActions({
        asyncToken: 'asyncToken'
      }),
      getUserInfo (e) {
        let _this = this
        let userInfo = e.target.userInfo ? e.target.userInfo : ''
        console.log(_this.$root.$mp.query.route)
        if (!userInfo) {
          wx.showToast({ title: '拒绝授权，将无法使用本小程序全部功能，请重新获取授权！', icon: 'none', mask: true })
          return
        }
        wx.login({
          success (resLogin) {
            console.log(userInfo, 'gender')
            if (resLogin.code) {
              const data = {
                nickname: userInfo.nickName,
                headimgurl: userInfo.avatarUrl,
                gender: userInfo.gender.toString(),
                code: resLogin.code
              }
              console.log(data)
              wx.showLoading({title: '加载中', mask: 'true'})
              _this._getToken(data)
            }
          }
        })
      },
      async _getToken(data) {
        const da = {
          code: data.code,
          mpid: 10087,
          nickname: data.nickname,
          headimgurl: data.headimgurl,
          gender: data.gender
        }
        this.asyncToken(da)
      }
    }
  }
</script>

<style lang="less" scoped>
  .authorize {
    width: 100vw;
    height: 100vh;
    background: white;
    text-align: center;
    .logo {
      margin: 198rpx 0 256rpx 0;
      width: 422rpx;
      height: 190rpx;
    }
    button {
      width:560rpx;
      height:88rpx;
      background:rgba(40,160,244,1);
      border-radius:44rpx;
      font-size:34rpx;
      font-family:PingFang-SC-Regular;
      color:rgba(255,255,255,1);
    }
  }
</style>