<script>
import store from '@/store/index'
export default {
    // computed: {
    //   ...mapGetters({
    //     getToken: 'getToken'
    //   })
    // },
  data() {
    return {
      tokens: ''
    }
  },
  mounted() {
      // console.log('token', store.getters.getToken)
    this._getToken()
  },
  methods: {
    _getToken() {
      let token = store.getters.getToken
        // let tokens = wx.getStorageSync('token')
        // console.log(store.getters.getToken)
      if (!token) {
        console.log(11)
        wx.reLaunch({
          url: './pages/token/main'
        })
      }
    }
  }
}
</script>

<style>
  page {
    height: 100%;
    background: #EFEFF4;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
.placeholder {
  height: 50rpx;
  line-height: 50rpx;
  font-size: 36rpx;
  color: RGBA(187, 187, 187, 1);
}
  .choose {
    color: #BBBBBB;
  }

  .wx-switch-input{
    width:79rpx !important;
    height:48rpx !important;
  }
  /*白色样式（false的样式）*/
  .wx-switch-input::before{
    width:79rpx !important;
    height:48rpx !important;
  }
  /*绿色样式（true的样式）*/
  .wx-switch-input::after{
    width: 43rpx !important;
    height: 43rpx !important;
  }
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
