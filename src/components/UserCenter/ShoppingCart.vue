<template>
  <div class="shopping-cart">
  	<user-center-temp
	  	:active-index='activeIndex'
	  	:item-category="messageCategory"
  		:title="'我的购物车'"
  		@change-active-index="changeActiveIndex">
  		<div class="products">
  			<!-- 购物车列表的头部信息栏 -->
			<div class="header">
				<div class="header-container">
					<label class="all-selected-title header-title">
						<input type="checkbox" name=""  @click="selectAll(shops)" v-model="isSelectedAll"><span>全选</span>
					</label>
					<span class="product-name-title header-title">商品</span>
					<span class="product-price-title header-title">单价</span>
					<span class="product-num-title header-title">数量</span>
					<span class="subtotal-title header-title">小计</span>
					<span class="operation-title header-title">操作</span>
				</div>
			</div>
			<!-- 购物车中每个商家的列表 -->
			<ul class="shop-list">
				<!-- 以商家为列表，同一商家的商品放进同一个商家li里面 -->
				<li v-for="shop in shops" v-if="shop.products.length != 0">
					<!-- 商家信息 -->
					<div class="shop-info">
						<input type="checkbox" name="" @click="selectAll(shop)" v-model="isShopSelectedAll[shops.indexOf(shop)]">
						<span class="shop-title">{{ shop.title }}</span>
						<span v-if="shop.brand" class="shop-name">{{ shop.brand }}</span>
					</div>
					<!-- 每个商家内的商品列表 -->
					<ul class="product-list">
						<li v-for="product in shop.products"
							v-if="activeIndex ? getProduct(product.id).price1 < getProduct(product.id).price0 : 1">
							<input type="checkbox" name="" value="" v-model="product.isSelected">
							<span class="product-area">
                <img :src="getProduct(product.id).imgName" class="product-img">
<!--								<img :src="getProductImg(getProduct(product.id).imgName)" class="product-img">-->
								<span class="product-name">{{getProduct(product.id).name}} {{ getProduct(product.id).desc }}</span>
							</span>
							<span class="product-price info"
								:style="{'line-height': calReducedMoney(product)>0 ? '20px' : '40px'}">
								￥{{ getProduct(product.id).price1.toFixed(2) }}
								<br v-if="calReducedMoney(product)>0">
								<span class="reduced-money"
									:title="'比加入购物车时降价'+calReducedMoney(product)+'元'"
									v-if="calReducedMoney(product)>0">
									￥{{ calReducedMoney(product) }}
									<span class="down-arrow">↓</span>
								</span>
							</span>
							<span class="product-num info">
								<span class="add" @click="addProductNum(product, false)">-</span>
								<input type="text" name="" class="number" checked="checked"
									v-model="product.num">
								<span class="subtract" @click="addProductNum(product, true)">＋</span>
							</span>
							<span class="subtotal info">
								￥{{ (getProduct(product.id).price1*product.num).toFixed(2) }}
							</span>
							<span class="operation info">
								<span class="delete" @click="deleteProduct(getProduct(product.id))">删除</span>
<!--								<span class="add-to-focus">移到我的关注</span>-->
							</span>
						</li>
					</ul>
				</li>
			</ul>
			<summary-bar
				:width="'940px'"
				:total-money="totalMoney"
				:selected-products-num="selectedProductsNum"
				:is-selected-all="isSelectedAll"
				@select-all="selectAll(shops)"
        @generate-order="generateOrder">
			</summary-bar>
		</div>
		<!-- 汇总栏 -->
		<div class="summary-container" v-show="scrollBottom > 340">
			<summary-bar
				:width="'1200px'"
				:total-money="totalMoney"
				:selected-products-num="selectedProductsNum"
				:is-selected-all="isSelectedAll"
				@select-all="selectAll(shops)"
        @generate-order="generateOrder">
			</summary-bar>
		</div>
  	</user-center-temp>
  </div>
</template>

<script>
import UserCenterTemp from '@/components/UserCenter/UserCenterTemp'
import SummaryBar from '@/components/Bars/SummaryBar'
import inputProducts from '../../assets/database/products.js'
import request from '../../utils/requests'

export default {
  name: 'ShoppingCart',
  components: {
  	'user-center-temp': UserCenterTemp,
  	'summary-bar': SummaryBar
  },
  data () {
    return {
    	activeIndex: 0,
    	scrollBottom: 0,
    	messageCategory: [
    		{
    			index: 0,
    			item: '全部商品',
    			showNum: 0
    		},
    		{
    			index: 1,
    			item: '降价商品',
    			showNum: 0
    		}
    	],
    	// shops数组表示卖家列表，数组中每个对象表示一个卖家
    	shops: [
    		{
    			index: 1,
    			brand: 'Ambitiousness',
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
    			title: '个人卖家',
    			// isSelectedAll: false,
    			products: [
    			]
    		},
    		{
    			index: 4,
    			brand: '"',
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
    			brand: 'Melancholy',
    			title: '个人卖家',
    			// isSelectedAll: false,
    			products: [
    			]
    		}
    	],
    	// 所有商品
    	allProducts: inputProducts
    }
  },
  computed: {
  	// 计算勾选的商品总金额
  	totalMoney: function () {
  		var count = 0
  		for (var i = 0; i < this.shops.length; i++) {
  			var products = this.shops[i].products
  			for (var j = 0; j < products.length; j++) {
  				if (products[j].isSelected) {
	  				count += this.getProduct(products[j].id).price1 * products[j].num
	  			}
  			}
  		}
  		return count.toFixed(2)
  	},
  	// 计算购物车总商品数
  	selectedProductsNum: function () {
  		var count = 0
  		for (var i = 0; i < this.shops.length; i++) {
  			var products = this.shops[i].products
  			for (var j = 0; j < products.length; j++) {
  				if (products[j].isSelected) {
	  				count += products[j].num
  				}
  			}
  		}
  		return count
  	},
  	// 购物车中的商品是否全选
    isSelectedAll: {
    	get () {
    		for (var i = 0; i < this.shops.length; i++) {
	    		if (!this.isShopSelectedAll[i]) {
	    			return false
	    		}
	  		}
	  		return true
    	},
    	// 这里要加一个空的setter，因为用v-model绑定时会报错
    	set () {}
    },
  	// 卖家中的商品是否全选
  	isShopSelectedAll: function () {
  		var tempArr = []
  		for (var i = 0; i < this.shops.length; i++) {
  			tempArr[i] = true
  			var products = this.shops[i].products
  			for (var j = 0; j < products.length; j++) {
  				if (!products[j].isSelected) {
	  				tempArr[i] = false
	  				break
  				}
  			}
  		}
  		return tempArr
  	}

  },
  methods: {
    generateOrder () {
      console.log('GenerateOrder!')
      let userID = window.sessionStorage['id']
      for (var i = 0; i < this.shops.length; i++) {
        var products = this.shops[i].products
        for (var j = 0; j < products.length; j++) {
          if (products[j].isSelected) {
            console.log('商品id:' + products[j].id + 'userID:' + userID)

            let mydata = {
              sellerID: this.shops[i].sellerID,
              customerID: userID,
              commodityNumber: products[j].id
            }

            request.post(
              '/CT/addOrder?sellerID=' + this.shops[i].sellerID +
              '&customerID=' + userID +
              '&commodityNumber=' + products[j].id, mydata
            ).then(res => {
              console.log(res)

              if (res.code === 200) {
                console.log('生成订单成功')
              }
            })

            console.log('将删除购物车')
            console.log(products[j])
            this.deleteProduct(products[j])
          }
        }
      }
    },
    getMyShoppingCart: function () {
      let mydata = {id: window.sessionStorage['id']}
      console.log('id=' + mydata.id)
      let shopper = []
      let producets = []

      request.get('/PI/user/shoppingCart?id=' + window.sessionStorage['id']).then(res => {
        console.log(res)
        // console.log(res.commodities)
        if (res.code === '200') {
          console.log('获取成功')
          for (var i = 0; i < res.commodities.length; i++) {
            console.log(res.commodities[i].commodityName)
            let commodity = {
              'id': 1,
              'name': '高数',
              'desc': '高等数学习题册',
              'price0': 39.90,
              'price1': 39.90,
              'specification': '1本',
              'producingArea': '云南',
              'imgName': '1.jpg',
              'category': '书籍课本',
              'brand': '书籍课本',
              'saleNum': 3,
              'commentNum': 188
            }
            commodity.imgName = res.commodities[i].picture
            commodity.id = res.commodities[i].commodityNumber
            commodity.name = res.commodities[i].commodityName
            commodity.price0 = res.commodities[i].commodityPrice
            commodity.price1 = res.commodities[i].commodityPrice
            commodity.desc = res.commodities[i].commodityDescription
            commodity.brand = res.commodities[i].sellerName

            // producets.push(commodity)
            producets[commodity.id - 1] = commodity

            let split_produce = {
              id: 1,
              num: 1,
              isSelected: false
            }
            split_produce.id = res.commodities[i].commodityNumber

            let shop_split = {
              index: 1,
              brand: 'Ambitiousness',
              title: '个人卖家',
              // 购物车中每个卖家的商品列表
              products: []
            }
            shop_split.brand = res.commodities[i].sellerName
            shop_split.sellerID = res.commodities[i].sellerID

            var isContinue = 0
            for (var k = 0; k < shopper.length; k++) {
              if (shopper[k].brand === shop_split.brand) {
                shopper[k].products.push(split_produce)
                isContinue = 1
                break
              }
            }
            if (isContinue === 1) {
              continue
            }

            shop_split.index = shopper.length + 1
            shop_split.products.push(split_produce)
            shopper.push(shop_split)
          }
          console.log(producets)
          console.log(shopper)
          this.allProducts = producets
          this.shops = shopper
        }
      })
    },
  	changeActiveIndex: function (index) {
  		this.activeIndex = index
  	},
  	// 获取商品图片
  	getProductImg: function (name) {
  		return require('../../assets/img/product-images/' + name)
  	},
  	// 加减商品数量
  	addProductNum: function (product, bool) {
  		if (bool) {
  			product.num++
  		} else if (product.num > 1) {
  			product.num--
  		}
  	},
  	// 删除商品
  	deleteProduct: function (product) {
      let mydata = {
        userID: window.sessionStorage['id'],
        commodityNumber: product.id
      }
      mydata['userID'] = window.sessionStorage['id']
      mydata['commodityNumber'] = product.id
      console.log(mydata['userID'] + ' ' + mydata['commodityNumber'])
      request.post(
        '/CT/deleteFromShoppingCart?userID=' + mydata['userID'] +
        '&commodityNumber=' + product.id, mydata).then(res => {
        console.log(res)
        // request.post('/CT/deleteFromShoppingCart', mydata).then(res => {
        if (res.code === 400) {

        } else if (res.code === 200) {
          console.log('success')

          for (var i = 0; i < this.shops.length; i++) {
            console.log(this.shops[i].brand + ' ' + product.brand)
            if (this.shops[i].brand === product.brand) {
              console.log('找到了i:' + i)
              console.log(this.shops[i].products.length)
              if (this.shops[i].products.length === 1) {
                this.shops.splice(i, 1)
                break
              }
              for (var k = 0; k < this.shops[i].products.length; k++) {
                if (this.shops[i].products[k].id === product.id) {
                  this.shops[i].products.splice(k, 1)
                  console.log('删除k:' + product.id)
                }
              }
            }
          }
        }
      })
    },

  	// 全选购物车或者单个店家
  	selectAll: function (all) {
  		// 参数all可传入shops数组或者shops数组内的一个对象
  		// all传入shops数组表示购物车中商品全选
  		// all传入一个对象表示某个卖家中商品全选
  		if (all instanceof Array) {
  			var bool = !this.isSelectedAll
  			// var bool = false;
  			for (var i = 0; i < all.length; i++) {
	  			var products = all[i].products
	  			for (var j = 0; j < products.length; j++) {
	  				products[j].isSelected = bool
	  			}
	  		}
  		} else {
  			var index = this.shops.indexOf(all)
  			var bool = !this.isShopSelectedAll[index]
  			for (var i = 0; i < all.products.length; i++) {
  				all.products[i].isSelected = bool
  			}
  		}
  	},
  	// 计算降价金额
  	calReducedMoney: function (product) {
  		return (this.getProduct(product.id).price0 - this.getProduct(product.id).price1).toFixed(2)
  	},
  	// 根据商品id获取详细信息
  	getProduct: function (id) {
  		return this.allProducts[id - 1]
  	},
  	// 计算滚动条移动条下方与屏幕地面的距离；
  	calScrollBottom: function () {
  		var scrollTop = document.documentElement.scrollTop,
	  		// 滚动条与顶部的距离，可理解为滚动条移动条部分的顶部与屏幕顶部之间的距离；
	  		clientHeight = document.documentElement.clientHeight,
	  		// 屏幕可视高度，可理解为滚动条移动条部分的长度；
	  		scrollHeight = document.documentElement.scrollHeight
	  		// 滚动条可滚动的总高度，可理解为整条滚动条的长度；
	  	this.scrollBottom = scrollHeight - clientHeight - scrollTop
  	},
  	// 自动检测滚动条下拉距离，隐藏金额汇总栏
  	autoHideSummaryBar: function () {
  		var calScrollBottom = this.calScrollBottom
  		var fixHeaderAgain = this.fixHeaderAgain
	  	window.onscroll = function () {
	  		fixHeaderAgain()
	  		calScrollBottom()
	  	}
  	},
  	// 解决与固定表头的事件冲突
  	fixHeaderAgain: function () {
  		this.$emit('fix-header')
  	}
  },
  created () {},
  mounted () {
    this.getMyShoppingCart()
  	this.calScrollBottom()
  	this.autoHideSummaryBar()
  }
}
</script>

<style scoped>
	.shopping-cart .products {
		min-height: 300px;
		/*background: */
		padding-bottom: 10px;
	}
	.shopping-cart .products input {
		width: 14px;
		height: 14px;
		outline: none;
	}
	/* 购物车列表头部栏 */
	.shopping-cart .products .header {
		height: 40px;
		padding-left: 20px;
		margin: 20px;
		background: #eee;
		font-size: 13px;
	}
	.shopping-cart .products .header .header-container {
		position: relative;
		height: 100%;
	}
	.shopping-cart .products .shop-list>li:last-child {
	}
	/* 统一设置样式 */
	.shopping-cart .products .header .header-title,
	.shopping-cart .products .shop-list>li .product-list>li .info {
		position: absolute;
		width: 80px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
		/*border: 1px solid red;*/
		box-sizing: border-box;
		background: transparent;
	}
	/* '商品' */
	.shopping-cart .products .header .product-name-title {
		left: 180px;
	}
	.shopping-cart .products .header .product-price-title,
	.shopping-cart .products .shop-list>li .product-list>li .product-price {
		left: 500px;
	}
	.shopping-cart .products .header .product-num-title,
	.shopping-cart .products .shop-list>li .product-list>li .product-num {
		left: 600px;
	}
	.shopping-cart .products .header .subtotal-title,
	.shopping-cart .products .shop-list>li .product-list>li .subtotal {
		left: 700px;
	}
	.shopping-cart .products .header .operation-title,
	.shopping-cart .products .shop-list>li .product-list>li .operation {
		left: 800px;
	}
	.shopping-cart .products .shop-list>li .product-list>li .info {
		top: 30px;
	}
	/* 统一设置样式 结束 */

	/* 全选checkbox */
	.shopping-cart .products .header .all-selected-title {
		text-align: left;
	}
	.shopping-cart .products .header .all-selected-title span {
		vertical-align: 2.5px;
		margin-left: 10px;
	}

	/*  */
	/* 商家列表 */
	.shopping-cart .products .shop-list>li {
		margin: 20px;
	}

	/* 店家信息 */
	.shopping-cart .products .shop-list>li .shop-info {
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		/*font-weight: bold;*/
		margin-left: 20px;
	}
	.shopping-cart .products .shop-list>li .shop-info>* {
		margin-right: 10px;
	}
	.shopping-cart .products .shop-list>li .shop-info input {
		vertical-align: -2px;
	}
	/* 卖家头衔 */
	.shopping-cart .products .shop-list>li .shop-info .shop-title {
		background: #ef1234;
		color: #fff;
		vertical-align: 1px;
		font-size: 12px;
		padding: 2px 5px;
		border-radius: 2px;
		box-shadow: 0px 2px 5px #666;
	}
	/* 卖家名称 */
	.shopping-cart .products .shop-list>li .shop-info .shop-name {
		font-weight: bold;
		font-size: 14px;
		color: #666;
	}
	/* 商品列表 */
	.shopping-cart .products .shop-list>li .product-list {
		box-sizing: border-box;
		border: 1px solid #ddd;
		padding: 20px 0;
	}
	.shopping-cart .products .shop-list>li .product-list>li {
		height: 100px;
		box-sizing: border-box;
		border-top: 1px dotted #eee;
		margin: 0 20px;
		position: relative;
		/*background: #aaa;*/
		/*margin: ;*/
	}
	.shopping-cart .products .shop-list>li .product-list>li:last-child {
		border-bottom: 1px dotted #eee;
	}
	/* 单件商品checkbox */
	.shopping-cart .products .shop-list>li .product-list>li input {
		position: absolute;
		top: 20px;
		/*left: 5px;*/
	}
	/* 商品区域：包括图片和商品名 */
	.shopping-cart .products .shop-list>li .product-list>li .product-area {
		position: absolute;
		width: 370px;
		height: 60px;
		top: 20px;
		left: 30px;
		cursor: pointer;
	}
	/* 商品图片 */
	.shopping-cart .products .shop-list>li .product-list>li img {
		position: absolute;
		width: 60px;
		height: 60px;
		box-sizing: border-box;
		border: 0.8px solid #ddd;
	}
	/* 商品名 */
	.shopping-cart .products .shop-list>li .product-list>li .product-name {
		position: absolute;
		width: 300px;
		height: 40px;
		line-height: 20px;
		font-size: 13px;
		overflow: hidden;
		top: 10px;
		left: 70px;
	}
	.shopping-cart .products .shop-list>li .product-list>li .product-area:hover .product-name {
		color: #ef1234;
	}
	.shopping-cart .products .shop-list>li .product-list>li .info {
		font-size: 12px;
	}
	/* 单价 */
	.shopping-cart .products .shop-list>li .product-list>li .product-price {
		line-height: 40px;
	}
	/*  降价金额*/
	.shopping-cart .products .shop-list>li .product-list>li .product-price .reduced-money {
		border: 1px solid rgba(239, 18, 52,0.3);
		box-sizing: border-box;
		color: #ef1234;
		border-radius: 1px;
		padding: 2px 2px;
	}
	.shopping-cart .products .shop-list>li .product-list>li .product-price .reduced-money .down-arrow {
		font-size: 14px;
	}
	/* 数量 */
	.shopping-cart .products .shop-list>li .product-list>li .product-num>* {
		display: inline-block;
		position: absolute;
		top: 10px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		box-sizing: border-box;
		border: 1px solid #ddd;
	}
	.shopping-cart .products .shop-list>li .product-list>li .product-num .add {
		width: 20px;
		left: 0;
		cursor: pointer;
	}
	.shopping-cart .products .shop-list>li .product-list>li .product-num .subtract {
		width: 20px;
		right: 0;
		cursor: pointer;
	}
	.shopping-cart .products .shop-list>li .product-list>li .product-num .number {
		width: 40px;
		left: 20px;
		border-left: none;
		border-right: none;
		font-size: 12px;
	}
	/* 小计 */
	.shopping-cart .products .shop-list>li .product-list>li .subtotal {
		font-weight: bold;
	}
	/* 操作 */
	.shopping-cart .products .shop-list>li .product-list>li .operation {
		line-height: 20px;
		text-align: left;
		left: 830px;
	}
	.shopping-cart .products .shop-list>li .product-list>li .operation span:hover {
		color: #ef1234;
		cursor: pointer;
	}
	/* 汇总栏 */
	.shopping-cart .summary-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		box-shadow: 0px -1px 5px rgba(0,0,0,0.3);
		z-index: 10;
	}
</style>
