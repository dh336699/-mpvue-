<template lang="html">
  <div class="authorize">
    <div class="shadow">
      <div class="modal">
        <p>为了您更好的体验三二零小程序的全部功能，我们请求获取您的用户信息（微信头像、昵称）！</p>
        <button type="primary" name="button" open-type="getUserInfo" @getuserinfo="getUserInfo">允许</button>
      </div>
    </div>
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
        wx.redirectTo({
          url: '/pages/index/main'
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
            if (resLogin.code) {
              const data = {
                nickname: userInfo.nickName,
                headimgurl: userInfo.avatarUrl,
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
          wx.redirectTo({
            url: '/pages/index/main'
          })
        }).catch((msg) => {
          console.log(msg)
          wx.hideLoading()
          wx.setStorageSync('token', msg.data.data.token)
          wx.redirectTo({
            url: '/pages/index/main'
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
    background: #dddddd;
    .shadow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      background: fade(#000000, 50%);
      .modal {
        transform: translateY(-30%);
        padding:40rpx;
        width: 90vw;
        box-sizing: border-box;
        border-radius:12rpx;
        background: #FFFFFF;
        p {
          font-size: 18px;
          line-height: 30px;
          padding: 20px 0 40px;
        }
      }
    }
  }
</style>