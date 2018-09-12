<template>
<div>
   <div v-for="(guiges, index) in guiGeShow" :key="index" :class='guiGe.classDiv'>
      <p class="title">{{guiges.text}}</p>
      <ul class="guige" >
        <li v-for="(guige, guigeIdx) in guiges.data" 
        :key="guigeIdx"
        @click="guigeSelect(guige, index, guigeIdx)"
        :class="[guiGe.classLi, curr[index] == guigeIdx ? 'active':'']"
        >{{guige.text}}</li>
      </ul>
    </div>
</div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'good-rule',
    data() {
      return {
        guiGeShow: [],
        showChildren: [],
        curr: [],
        checkSkus: [],
        guigeIdArr: [],
        skuGoods: null
      }
    },
    props: {
      guiGe: {
        type: Array,
        default: true
      }
    },
    methods: {
      getSid (curr, ary) {
        if (curr.length !== ary.length) {
          return
        }
        let a = null
        let b = null
        for (let i = 0; i < ary.length; i++) {
          let index = curr[i]
          if (index == null) {
            return
          }
          if (a === null) {
            a = ary[i].data[index].child
          } else if (b === null) {
            b = ary[i].data[index].child
          }
          if (a !== null && b !== null) {
            a = this.getArrEqual(a, b)
            b = null
          }
        }
        console.log(a[0])
        if (a.length !== 1) {
          console.info('警告：出现多个sku')
        }
        return a[0]
      },
      getArrEqual (arr1, arr2) {
        let newArr = []
        for (let i = 0; i < arr2.length; i++) {
          for (let j = 0; j < arr1.length; j++) {
            if (arr1[j] === arr2[i]) {
              newArr.push(arr1[j])
            }
          }
        }
        return newArr
      },
      getNum (sid, skus) {
        for (let i = 0; i < skus.length; i++) {
          let item = skus[i]
          if (sid === item.specIds) {
            return item.stock
          }
        }
      },
      clone (obj) {
        let objStr = JSON.stringify(obj)
        return JSON.parse(objStr)
      },
      getData (curr, ary, skus) {
        if (curr == null || curr.length <= 1) {
          return
        }
        for (let i = 0; i < ary.length; i++) {
          let item = ary[i]
          for (let j = 0; j < item.data.length; j++) {
            let c = this.clone(curr)
            c[i] = j
            let sid = this.getSid(c, ary)
            let stock = this.getNum(sid, skus)
            item.data[j].stock = stock
        // console.log("c", JSON.stringify(item.data[j]))
          }
        }
        return ary
      },
      guigeSelect(item, index, indexA) {
        if (item.stock === 0) return
        this.checkSkus = []
        if (this.guigeIdArr[index] === (item.specId)) {
          Vue.set(this.guigeIdArr, index, '')
        } else {
          Vue.set(this.guigeIdArr, index, item.specId)
        }
        this.guigeString = this.guigeIdArr.join(',')
        for (var i = 0; i < this.guiGe.goodsSkus.length; i++) {
          if (this.guiGe.goodsSkus[i].specIds === this.guigeString) {
            this.skuGoods = this.guiGe.goodsSkus[i]
          }
        }
        if (item.num <= 0) {
          return
        }
        if (item.num <= 0) {
          return
        }
        if (this.record === index + '' + indexA) {
          Vue.set(this.curr, index, null)
          this.record = ''
        } else {
          Vue.set(this.curr, index, indexA)
          this.record = index + '' + indexA
        }
        this.getData(this.curr, this.guiGeShow, this.guiGe.goodsSkus)
        this.$emit('click', this.skuGoods)
      },
      init () {
        this.guiGe.goodsSpecs.forEach(item => {
          if (item.pid === 0) {
            this.guiGeShow.push({text: item.specName, id: item.specId, data: [], specId: item.specId})
          } else {
            this.showChildren.push(item)
          }
        })
        this.showChildren.forEach(item => {
          this.guiGeShow.forEach(itemA => {
            if (item.pid === itemA.id) {
              itemA.data.push({text: item.specName, child: [], specId: item.specId})
            }
          })
        })
        this.guiGeShow.forEach((item, index) => {
          item.data.forEach((itemA, indexA) => {
            this.guiGe.goodsSkus.forEach(itemB => {
              if (itemB.specIds.indexOf(itemA.specId) !== -1) {
                itemA.child.push(itemB.specIds)
              }
            })
          })
        })
      }
    },
    components: {
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang='less' scoped>
  
</style>
