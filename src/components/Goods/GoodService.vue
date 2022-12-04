<template>
  	<ul id="good-service">
  		<li v-for="item in items">
  			<i class="service-icon" :style="{backgroundImage: getIconPath(item.iconName)}"></i>
  			<p class="srevice-title"
  				:style="{color: goodServiceInfo.titleColor}">
  				{{ item.title }}
  			</p>
  			<p class="service-content"
  				:style="{color: goodServiceInfo.contentColor}">
  				{{ item.content }}
  			</p>
  			<span></span>
  		</li>
  	</ul>
</template>

<script>
	export default {
		name: 'GoodService',
		props: ['goodServiceInfo'],
		data () {
			return {
				// iconDir: '../assets/good-service-icons/',
        items: [
          {
            index: 0,
            title: '交易安全',
            content: '严格审核 买卖自由',
            iconName: 'food-safety'
          },
          {
            index: 1,
            title: '物流便捷',
            content: '多种物流 运输可控',
            iconName: 'cold-chain'
          },
          {
            index: 2,
            title: '专属平台',
            content: '校园交易 社团交友',
            iconName: 'natural'
          },
          {
            index: 3,
            title: '社团入驻',
            content: '百团大战 活动丰富',
            iconName: 'direct-purchase'
          },
          {
            index: 4,
            title: '无忧售后',
            content: '售后服务 绿色通道',
            iconName: 'after-sale'
          },
				],
			}
		},
		methods: {
			getIconPath: function (name) {
				var suffix = this.goodServiceInfo.iconSuffix ? this.goodServiceInfo.iconSuffix : '';
				return 'url(' + require('../../assets/img/good-service/icons/' + name + suffix + '.png') + ')';
			},
		},
	};
</script>

<style scoped>
	#good-service {
		width: 1200px;
		height: 100px;
		line-height: 25px;
	}
	#good-service li {
		box-sizing: border-box;
		/*border: 1px solid red;*/
		float: left;
		width: 240px;
		height: 100%;
		position: relative;
		padding-top: 30px;
		padding-left: 90px;
	}
	#good-service .service-icon {
		position: absolute;
		left: 40px;
		top: 36px;
		width: 32px;
		height: 32px;
		background-size: 32px;
	}
	#good-service .srevice-title {
		color: #666;
		font-size: 18px;
		/*font-weight: bold;*/
	}
	#good-service .service-content {
		color: #999;
		font-size: 12px;
	}
</style>
