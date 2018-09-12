<template>
<div>
  <div class='last-page' v-if='last.lastPage == true && last.length != 0'><p></p><span>已显示全部</span><p></p></div>
  <div class='loading' v-if='last.lastPage == false && last.length != 0'>
    <img src='http://wmeimob-saas.oss-cn-shanghai.aliyuncs.com/mini/life/images/loading.png' />
    玩命加载中
  </div>
  <div class='last-page' v-if="last.type==='empty' && last.length === 0"><p></p><span>没有相关数据哦</span><p></p></div>
</div>  
</template>

<script>
export default {
  props: ['last'],
  name: 'lastPage',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style  lang="less" scoped>
.last-page{
  width:100%;
  height: 17px;
  font-size:12px;
  color: #bbb;
  margin:0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:11px;
  padding-bottom:11px;
  p{
    width:23px;
    height: 1px;
    border-bottom:1px solid #bbb;
  }
  span{
    float: left;
    margin:0 3px;
  }
}
.loading{
  padding:10px 0;
  text-align: center;
  display: flex;
  justify-content:center;
  align-items: center;
  font-size:12px;
  color: #bbb;
  img{
    animation: mymove .5s linear infinite;
    width:18px;
    height:18px;
    margin-right:10px;
  }
}
@-webkit-keyframes mymove {
  0%   {transform:rotate(0deg);}
  50%  {transform:rotate(180deg);}
  100% {transform:rotate(360deg);}
}

</style>