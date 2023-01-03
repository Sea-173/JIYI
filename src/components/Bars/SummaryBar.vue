<template>
  	<div class="summary-bar" :style="{width: width}">
		<span class="left-part">
			<label class="select-all"><input type="checkbox" name="" v-model="isSelectedAll" @click="selectAll">全选</label>
			<span>删除选中的商品</span>
			<span>移到我的关注</span>
			<span>清空购物车</span>
		</span>
		<span class="right-part">
			<span>已选择{{ selectedProductsNum }}件商品</span>
			<span>总价:￥{{ totalMoney }}</span>
<!--			<button @click="generateOrder">去付款</button>-->
<!--      <button class="pay-it-now" @click="this.GenerateOrder">去付款</button>-->
		</span>
      <button class="generateOrder" @click="generateOrder">去付款</button>
	</div>
</template>

<script>
export default {
  name: 'SummaryBar',
  props: {
  	totalMoney: {
  		type: String,
  		default: 0
  	},
  	selectedProductsNum: {
  		type: Number,
  		default: 0
  	},
  	width: {
  		type: String,
  		default: '90%'
  	},
  	isSelectedAll: {
  		type: Boolean,
  		default: false
  	}
  },
  data () {
    return {

      shops: [
        {
          index: 1,
          brand: 'Ambitiousness',
          sellerID: 1,
          title: '个人卖家',
          // 购物车中每个卖家的商品列表
          products: [
            {
              id: 2,
              num: 1,
              isSelected: true
            },
            {
              id: 5,
              num: 2,
              isSelected: true
            }
          ]
        },
        {
          index: 2,
          brand: '君梦',
          sellerID: 2,
          title: '个人卖家',
          products: [
            {
              id: 12,
              num: 1,
              isSelected: false
            },
            {
              id: 15,
              num: 2,
              isSelected: false
            }
          ]
        },
        {
          index: 3,
          brand: '林疋',
          sellerID: 3,
          title: '个人卖家',
          // isSelectedAll: false,
          products: [
          ]
        },
        {
          index: 4,
          brand: '"',
          sellerID: 4,
          title: '个人卖家',
          // isSelectedAll: false,
          products: [
            {
              id: 32,
              num: 1,
              isSelected: false
            },
            {
              id: 34,
              num: 2,
              isSelected: false
            }
          ]
        },
        {
          index: 5,
          sellerID: 5,
          brand: 'Melancholy',
          title: '个人卖家',
          // isSelectedAll: false,
          products: [
          ]
        }
      ]

    }
  },
  methods: {
  	selectAll: function () {
  		this.$emit('select-all')
  	},
    generateOrder: function () {
      console.log('在组件内点击')
      this.$emit('generate-order')
    }
  },
  computed: {
  }
}
</script>

<style scoped>
	/* 汇总栏 */
	.summary-bar {
		margin: 0 auto;
		height: 50px;
		line-height: 50px;
		font-size: 13px;
		/*cursor: pointer;*/
	}
	.summary-bar .left-part {
		float: left;
	}
	.summary-bar .left-part>* {
		margin-right: 20px;
		cursor: pointer;
	}
	.summary-bar .left-part>*:hover {
		color: #ef1234;
	}
	.summary-bar .left-part input {
		vertical-align: -2px;
		margin-right: 3px;
	}
	.summary-bar .right-part {
		float: right;
	}
	.summary-bar .right-part>* {
		margin-left: 20px;
	}
	.summary-bar .right-part  .pay-it-now {
		background-color: #ef1234;
		display: inline-block;
		/*height: 80%;*/
		padding: 0 10px;
		color: #fff;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
	}
  .generateOrder{
    background-color: #129934;
    /*display: inline-block;*/
    /*height: 20%;*/
    /*position: relative;*/
    /*left: 400px;*/
    border:none;
    /*width: 60px;*/
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
</style>
