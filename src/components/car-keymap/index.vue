<template>
  <article class="keymap-container">
    <!--index.wxml-->
    <view v-if="isShow" class="vehicle-panel" style="height:5.733333rpx /* 430/75 */" :style="{ backgroundColor : backgroundColor}">
      <!--省份简写键盘-->
      <block v-if="keyBoardType === 1">
        <view class="vehicle-panel-row">
          <view hover-class="vehicle-hover" hover-start-time="10" hover-stay-time="100" class='vehicle-panel-row-button' :style="{ border : buttonBorder}"
            v-for="item in keyVehicle1" :key="item" @click='vehicleTap' :data-value="item">{{item}}</view>
        </view>
        <view class="vehicle-panel-row">
          <view hover-class="vehicle-hover" hover-start-time="10" hover-stay-time="100" class='vehicle-panel-row-button' :style="{ border : buttonBorder}"
            v-for="item in keyVehicle2" :key="item" @click='vehicleTap' :data-value="item">{{item}}</view>
        </view>
        <view class="vehicle-panel-row">
          <view hover-class="vehicle-hover" hover-start-time="10" hover-stay-time="100" class='vehicle-panel-row-button' :style="{ border : buttonBorder}"
           v-for="item in keyVehicle3" :key="item" @click='vehicleTap' :data-value="item">{{item}}</view>
        </view>
        <view class="vehicle-panel-row-last">
          <view hover-class="vehicle-hover" hover-start-time="10" hover-stay-time="100" class='vehicle-panel-row-button vehicle-panel-row-button-last'
            @click='vehicleTap' :data-value="item" v-for="item in keyVehicle4" :key="item" :style="{ border : buttonBorder}">{{item}}</view>
        </view>
      </block>
      <!--英文键盘  -->
      <block v-else>
        <view class="vehicle-panel-row">
          <view hover-class="vehicle-hover" hover-start-time="10" hover-stay-time="100" class='vehicle-panel-row-button vehicle-panel-row-button-number'
            @click='vehicleTap' :data-value="item" v-for="item in keyNumber" :key="item" :style="{ border : buttonBorder}">{{item}}</view>
        </view>
        <view class="vehicle-panel-row">
          <view hover-class="vehicle-hover" hover-start-time="10" hover-stay-time="100" class='vehicle-panel-row-button' :style="{ border : buttonBorder}"
            v-for="item in keyEnInput1" :key="item" @click='vehicleTap' :data-value="item">{{item}}</view>
        </view>
        <view class="vehicle-panel-row">
          <view hover-class="vehicle-hover" hover-start-time="10" hover-stay-time="100" class='vehicle-panel-row-button' :style="{ border : buttonBorder}"
            v-for="item in keyEnInput2" :key="item" @click='vehicleTap' :data-value="item">{{item}}</view>
          <view hover-class="vehicle-hover" :style="{ border : buttonBorder}" hover-start-time="10" hover-stay-time="100" class='vehicle-panel-row-button vehicle-panel-row-button-img'>
            <image src='/static/images/delete.png' class='vehicle-en-button-delete' @click='vehicleTap' data-value="delete" mode='aspectFit' />
          </view>
        </view>
        <view class="vehicle-panel-row-last">
          <view hover-class="vehicle-hover" hover-start-time="10" hover-stay-time="100" class='vehicle-panel-row-button vehicle-panel-row-button-last'
            @click='vehicleTap' :style="{ border : buttonBorder}" :data-value="item" v-for="item in keyEnInput3" :key="item">{{item}}</view>
          <view hover-class="vehicle-hover" :style="{ border : buttonBorder}" hover-start-time="10" hover-stay-time="100" class='vehicle-panel-row-button vehicle-panel-ok'
            @click='vehicleTap' data-value="ok">确定</view>
        </view>
      </block>
    </view>

  </article>
</template>

<script>
  export default {
    data() {
      return {
        keyVehicle1: '陕京津沪冀豫云辽',
        keyVehicle2: '黑湘皖鲁新苏浙赣',
        keyVehicle3: '鄂桂甘晋蒙吉闽贵',
        keyVehicle4: '粤川青藏琼宁渝',
        keyNumber: '1234567890',
        keyEnInput1: 'QWERTYUIOP',
        keyEnInput2: 'ASDFGHJKL',
        keyEnInput3: 'ZXCVBNM'
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      buttonBorder: { // 按键边框色
        type: String,
        default: '1px solid #ccc'
      },
      backgroundColor: { // 按键背景色
        type: String,
        default: '#fff'
      },
      keyBoardType: { // 1为省份键盘，其它为英文键盘
        type: Number,
        default: 1
      }
    },
    methods: {
      vehicleTap: function (event) {
        let val = event.mp.target.dataset.value
        switch (val) {
          case 'delete':
            this.$emit('triggerEvent', 'delete')
            // this.triggerEvent('delete')
            break
          case 'ok':
            this.$emit('triggerEvent', 'ok')
            // this.triggerEvent('ok')
            break
          default:
            this.$emit('inputchange', val)
            // this.triggerEvent('inputchange', val)
        }
      }
    },
    components: {}
  }
</script>

<style lang='less' scoped>
  .keymap-container {
    :host {
      width: 100%;
    }
    .vehicle-panel {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1000;
      background: white;
    }
    .vehicle-panel-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .vehicle-panel-row-last {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .vehicle-panel-row-button {
      background-color: #fff;
      margin: 5rpx/* 5/75 */;
      
      padding: 5rpx/* 5/75 */;
      
      width: 80rpx/* 80/75 */;
      
      height: 80rpx/* 80/75 */;
      
      text-align: center;
      line-height: 80rpx/* 80/75 */;
      
      border-radius: 10rpx/* 10/75 */;
      
    }
    .vehicle-panel-row-button-number {
      background-color: #eee;
    }
    .vehicle-panel-row-button-last {
      width: 90rpx/* 90/75 */;
      
      height: 90rpx/* 90/75 */;
      
      line-height: 90rpx/* 90/75 */;
      
    }
    .vehicle-hover {
      background-color: #ccc;
    }
    .vehicle-panel-row-button-img {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .vehicle-en-button-delete {
      width: 40rpx/* 40/75 */;
      
      height: 40rpx;
      
    }
    .vehicle-panel-ok {
      background-color: #30C1FF;
      color: #fff;
      width: 150rpx;
      height: 80rpx;
    }
  }

</style>
