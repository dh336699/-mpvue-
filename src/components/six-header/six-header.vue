<template>
  <article class="six-header-wrapper">
    <ul>
      <li v-for="(item, index) in lists" :key="item.id" :class="item.status ? 'active' : ''" @click="chooseType(lists, item, index)">{{item.typeName}}</li>
    </ul>
  </article>
</template>

<script>
  export default {
    props: {
      lists: {
        type: Array,
        default: [
          {id: 1, typeName: '主食', status: true},
          {id: 2, typeName: '点心'},
          {id: 3, typeName: '粥品'},
          {id: 4, typeName: '饮料'},
          {id: 5, typeName: '果蔬'},
          {id: 6, typeName: '套餐'}
        ]
      }
    },
    methods: {
      chooseType(lists, item, index) {
        this.$emit('chooseType', lists, item.id)
        lists.forEach((list) => {
          list.status = false
        })
        lists[index].status = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .six-header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #FFFFFF;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 94rpx;
      padding-left: 30rpx;
      padding-right: 32rpx;
      border-bottom: 2rpx solid #E5E5E5;
      li {
        flex: 1;
        width: 96rpx;
        height: 100%;
        line-height: 96rpx;
        margin-left:10rpx;
        margin-right: 10rpx;
        font-size: 28rpx;
        color: #444444;
        text-align: center;
        font-family:PingFang-SC-Light;
        &.active {
          color: #F3A68D;
          height: 100%;
          line-height: 94rpx;
          border-bottom: 4rpx solid #F3A68D;
          box-sizing: border-box;
        }
      }

    }
  }
</style>