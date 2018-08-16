<template lang="html">
  <div class="authorize">
    <img src="/static/images/logo@2x.png" class="logo">
    <button type="primary" name="button" open-type="getUserInfo" @getuserinfo="getUserInfo">授权微信用户信息</button>
  </div>
</template>
<script>
  import {getToken} from '@/common/urls'
  export default {
    mounted() {
      let token = wx.getStorageSync('token')
      if (!token) {
        return
      } else {
        wx.switchTab({
          url: '/pages/shouye/main'
        })
      }
    },
    methods: {
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
      _getToken(data) {
        getToken(data).then((res) => {
          console.log(res)
          wx.hideLoading()
          wx.setStorageSync('token', res.data.data.token)
          wx.switchTab({
            url: '/pages/shouye/main'
          })
        }).catch((msg) => {
          console.log(msg)
          wx.hideLoading()
          wx.setStorageSync('token', msg.data.data.token)
          wx.switchTab({
            url: '/pages/shouye/main'
          })
        })
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