<template>
  <div class="more-info"  style="overflow-y: auto;overflow-x: hidden">
	<user-centter-temp
		class="selector-temp"
		:item-category="otherInfoCategory"
		:active-index="activeIndex"
		@change-active-index="changeActiveIndex">
		<div class="content">
			<div class="product-introduction"
				v-show="activeIndex==0">
				<p><span>品牌: <span class="brand">{{ product.companyName }}</span></span></p>
				<p>
					<span>商品名称: {{ product.name }}</span>
					<span>商品编号: {{ product.id }}</span>
				</p>
<!--				<p>-->
<!--					<span>商品重量: {{ product.weight }}</span>-->
<!--					<span>商品产地: {{ product.producingArea }}</span>-->
<!--				</p>-->
				<p>
					<span>商品分类: {{ product.category }}</span>
					<span>商品包装: 简装</span>
				</p>
			</div>
			<div class="product-packaging"
				v-show="activeIndex==1">
<!--				<p><span>存储条件</span><span>无</span></p>-->
<!--				<p><span>大概重量</span><span>无</span></p>-->
<!--				<p><span>包装清单</span><span>无</span></p>-->
			</div>
      <div class="product-comment"
           v-show="activeIndex==2" >
        <GoodMessage></GoodMessage>
      </div>
      <div class="product-comment"
           v-show="activeIndex==3">
        <p>卖家评价</p>
        <div>
          <div class="favorite-rating">
            <p>好评度</p>
            <p>{{ product.favoriteRating }}</p>
          </div>
          <div class="tags">
          						<span v-for="tag in commentTags">
          							{{ tag.desc }}({{ tag.count }})
          						</span>
          </div>

        </div>
      </div>
    </div>
  </user-centter-temp>
  </div>
</template>

<script>

import UserCenterTemp from '@/components/UserCenter/UserCenterTemp'
import GoodMessage from '@/components/Message/GoodMessage'

export default {
  name: 'MoreInfo',
  components: {
    GoodMessage,
    'user-centter-temp': UserCenterTemp,
  },
  props: {
    'product': Object,
  },
  data () {
    return {
      otherInfoCategory: [
        {
          index: 0,
          item: '商品介绍',
        },
        {
          index: 1,
          item: '规格与包装',
        },
        {
          index: 2,
          item: '留言',
        },
        {
          index: 3,
          item: '卖家评价',
        },
      ],
			activeIndex: 0,
			commentTags: [
				{
					index: 0,
					desc: '卖家诚信',
					count: 13,
				},
				{
					index: 1,
					desc: '交易顺利',
					count: 36,
				},
				{
					index: 2,
					desc: '交谈愉快',
					count: 9,
				},
				{
					index: 3,
					desc: '与照片一致',
					count: 17,
				},
				{
					index: 4,
					desc: '商品成色好',
					count: 14,
				},
				{
					index: 5,
					desc: '商家态度不好',
					count: 1,
				},
				{
					index: 6,
					desc: '商品很新',
					count: 6,
				},
				{
					index: 7,
					desc: '还会再来',
					count: 5,
				},
				{
					index: 8,
					desc: '高档时尚',
					count: 4,
				},

				{
					index: 9,
					desc: '实在卖家',
					count: 21,
				},

				{
					index: 10,
					desc: '包装完整',
					count: 33,
				},
				{
					index: 11,
					desc: '物流很快',
					count: 29,
				},
			]
		}
	},
	methods: {
		// 改变展示项目的index
		changeActiveIndex: function (index) {
			this.activeIndex = index;
		},
	},
};
</script>

<style scoped>
	.more-info {
		width: 960px;
		min-height: 460px;
		/*background-color: #eee;*/
		margin-left: 20px;
		float: left;
		position: relative;
		box-sizing: border-box;
		/*border-top: 1px solid #ddd;*/
		/*border-: 1px solid #ddd;*/
		/*overflow: hidden;*/
	}
	.more-info .selector-temp {
		position: absolute;
		width: 958px;
		min-height:600px;
		overflow: hidden;
		/*background-color: #eee;*/
		top: -20px;
		left: -20px;
	}
	.more-info .selector-temp .content {
		position: absolute;
		/*margin-left: 20px;*/
		top: 70px;
		left: 40px;
		width: 920px;
		min-height: 400px;
		/*background-color: blue;*/
		/*border: 1px solid #ddd;*/
		box-sizing: border-box;
		padding: 10px 0;
	}
	/* 商品介绍 */
	.more-info .selector-temp .content .product-introduction p:first-child {
		line-height: 60px;
	}
	.more-info .selector-temp .content .product-introduction p .brand {
		color: #1234ab;
	}
	.more-info .selector-temp .content .product-introduction p .brand:hover {
		cursor: pointer;
		color: #ef1234;
	}
	.more-info .selector-temp .content .product-introduction p:nth-child(n+2) {
		line-height: 30px;
	}
	.more-info .selector-temp .content .product-introduction p span {
		display: inline-block;
		width: 45%;
		font-size: 12px;
		padding-left: 20px;
	}
	/* 规格与包装 */
	.more-info .selector-temp .content .product-packaging p:first-child {
		margin-top: 20px;
	}
	.more-info .selector-temp .content .product-packaging p span {
		display: inline-block;
		width: 15%;
		font-size: 12px;
		line-height: 30px;
		/*float: */
		padding-left: 20px;
	}
	/* 商品评价 */
	.more-info .selector-temp .content .product-comment>p {
		height: 40px;
		width: 690px;
		line-height: 40px;
		font-size: 16px;
		font-weight: bold;
		background-color: #eee;
		padding-left: 20px;
	}
	.more-info .selector-temp .content .product-comment>div {
		overflow: hidden;
	}
	.more-info .selector-temp .content .product-comment .favorite-rating {
		float: left;
		width: 140px;
		height: 140px;
		/*background-color: red;*/
	}
	.more-info .selector-temp .content .product-comment .favorite-rating p:first-child {
		margin-top: 40px;
		line-height: 18px;
		text-align: center;
	}
	.more-info .selector-temp .content .product-comment .favorite-rating p:last-child {
		line-height: 40px;
		font-size: 40px;
		font-weight: bold;
		text-align: center;
		color: #ef1234;
	}
	.more-info .selector-temp .content .product-comment .tags {
		float: left;
		margin-left: 10px;
		width: 560px;
		height: 140px;
		padding: 20px 0;
	}
	.more-info .selector-temp .content .product-comment .tags span {
		/*display: inline-block;*/
		float: left;
		padding: 3px 8px;
		border: 1px solid #ddd;
		color: #999;
		font-size: 12px;
		margin: 5px 10px;
	}
	.more-info .selector-temp .content .product-comment .tags span:hover {
    cursor: pointer;
    color: #666;
    border: 1px solid #424242;

	}
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }
</style>
