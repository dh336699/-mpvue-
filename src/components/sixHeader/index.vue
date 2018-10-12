<template>
  <article class="six-header-wrapper">
    <section style="padding-left: 30rpx;padding-right: 32rpx;">
      <scroll-view :scroll-x="true">
        <ul>
          <li v-for="(item, index) in lists" :key="item.id" :class="item.status ? 'active' : ''" @click="chooseType(item, index)">{{item.typeName}}</li>
        </ul>
      </scroll-view>
    </section>
  </article>
</template>

<script>
  export default {
    props: {
      lists: {
        type: Array,
        default: []
      }
    },
    methods: {
      chooseType(item, index) {
        this.$emit('chooseType', item)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/styles/elements.less';
  .six-header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 88rpx;
    background: #FFFFFF;
    z-index: 2;
    // overflow: auto;
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88rpx;
      li {
        // flex: 1;
        min-width: 96rpx;
        height: 100%;
        line-height: 96rpx;
        font-size: 28rpx;
        color: #444444;
        text-align: center;
        font-family:PingFang-SC-Light;
        &.active {
          color: #4989F2;
          height: 100%;
          line-height: 94rpx;
          border-bottom: 4rpx solid #4989F2;
        }
      }

    }
  }
</style>