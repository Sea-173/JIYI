<template>
  <div class="my-order">
    <user-center-temp
      :active-index='activeIndex'
      :item-category="orderCategory"
      :title="'我的订单'"
      @change-active-index="changeActiveIndex">
      <!-- 订单列表 -->
      <ul class="order-list">
        <li v-for="item in order">
          <!-- 订单标题行 -->
          <div class="order-title">
            <span>日期：{{ item.orderTime }}</span>
            <span>订单号：{{ item.orderNumber }}</span>
            <span>收货人</span>
            <span>金额</span>
            <span>状态</span>
            <span>操作</span>
          </div>
           <!--  订单内容-->
          <div class="order-content">
            <!-- 订单内商品列表 -->
            <span class="product-area">
								<img :src="getProductImgPath(item.commodityPicture)" class="product-img">
								<span class="product-name">{{ item.commodityName }}</span>
            </span>
            <div class="order-info">
<!--                 :style="{height: getOrderInfoHeight(order)}"-->
<!--                 :class="{'waitting-for-payment': order.status == 1,-->
<!--								'waitting-for-product': order.status == 2,-->
<!--								'order-is-finished': order.status == 3}">-->
						  <span class="receiver">
							{{ item.customerName }}
						  </span>
              <span class="total-money">
							总额 ￥{{ item.commodityPrice }}
						  </span>
              <span class="order-status">
							运输中
						  </span>
              <span class="order-operation">
							<span> 查看物流 </span>
						  </span>
            </div>
          </div>
        </li>
      </ul>
    </user-center-temp>
  </div>
</template>

<script>
import UserCenterTemp from '@/components/UserCenter/UserCenterTemp'
import request from '../../utils/requests'

export default {
  name: 'MyOrder',
  components: {
    'user-center-temp': UserCenterTemp
  },
  data () {
    return {
      activeIndex: 0,
      orderCategory: [
        {
          index: 0,
          item: '所有订单',
          showNum: 0
        },
        {
          index: 2,
          item: '待收货',
          showNum: 0
        },
        {
          index: 3,
          item: '待评价',
          showNum: 0
        }
      ],
      orders: [
        {
          index: 0,
          // status: 1代表待付款，2代表待收货，3代表待评价
          status: 1,
          // date由数组内有6个数字表示
          date: [2022, 4, 11, 16, 27, 17],
          orderNum: 46163861496,
          receiver: '袁大明',
          // 一个订单内可以包含多个产品
          products: [
            {
              index: 0,
              name: '排球',
              imgName: '0-0.jpg',
              num: 2,
              price: 31.00
            },
            {
              index: 1,
              name: '李宁篮球',
              imgName: '0-1.jpg',
              num: 1,
              price: 39.90
            }
          ]
        },
        {
          index: 1,
          status: 2,
          date: [2022, 4, 11, 16, 27, 17],
          orderNum: 51861631496,
          receiver: '袁大明',
          products: [
            {
              index: 0,
              name: '钢笔带墨盒',
              imgName: '1-0.jpg',
              num: 1,
              price: 59.90
            },
            {
              index: 1,
              name: '蜂蜜记账本',
              imgName: '1-1.jpg',
              num: 2,
              price: 49.90
            }
          ]
        },
        {
          index: 2,
          status: 3,
          date: [2022, 3, 10, 16, 27, 17],
          orderNum: 24163861496,
          receiver: '袁大明',
          products: [
            {
              index: 0,
              name: 'DELL笔记本电脑',
              imgName: '2-0.jpg',
              num: 2,
              price: 6676.90
            }
          ]
        }
      ],
      order: [],
      id: window.sessionStorage.getItem('id'),
    }
  },
  created () {
    request.get('/CT/getOrders', {
      params: {'id': this.id}
    }).then(res => {
      this.order = res.orders
    })
  },
  methods: {
    //
    changeActiveIndex: function (index) {
      this.activeIndex = index
      // this.countOrderShowedNum();
    },
    filterOrderCategory: function (obj) {
      var tempOrderList = []
      if (this.activeIndex == 0) {
        return obj
      } else {
        for (var i = 0; i < obj.length; i++) {
          if (obj[i].status == this.activeIndex) {
            tempOrderList.push(obj[i])
          }
        }
        return tempOrderList
      }
    },
    // 将日期从数组形式转化为字符串形式
    getOrderDate: function (date) {
      return date[0] + '-' + date[1] + '-' + date[2] + ' ' + date[3] + ':' + date[4] + ':' + date[5]
    },
    getOrderTotalMoney: function (products) {
      var count = 0
      for (var i = 0; i < products.length; i++) {
        count += (products[i].price * products[i].num)
      }
      return count
    },
    getOrderStatus: function (status) {
      var statusStr
      if (status == 1) {
        statusStr = '待付款'
      } else if (status == 2) {
        statusStr = '待收货'
      } else if (status == 3) {
        statusStr = '已完成'
      }
      return statusStr
    },
    getOrderOperation: function (status) {
      var operation
      if (status == 1) {
        operation = '去付款'
      } else if (status == 2) {
        operation = '查看物流'
      } else if (status == 3) {
        operation = '去评价'
      }
      return operation
    },
    getOrderInfoHeight: function (order) {
      return order.products.length * 100 + 'px'
    },
    getProductImgPath: function (path) {
      if (path.startsWith('http')) {
        return path
      } else {
        return path ? require('../../assets/upload/' + path) : ''
      }
    },
    // 计算不同订单应该显示的数字
    countOrderShowedNum: function () {
      // 初始化计算，以及数据更新后计算
      let status
      for (let i = 0; i < this.orders.length; i++) {
        status = this.orders[i].status
        this.orderCategory[status].showNum++
      }
    }
  }
  // mounted () {
  //   this.countOrderShowedNum()
  // }
}
</script>

<style scoped>
.my-order {
  /*padding: 20px 0 0 20px;*/
}

/* 2.2 下面的订单列表 */
.my-order .order-list {
  /*width: 100%;*/
  padding: 0 20px;
  overflow: auto;
}

/* 每个订单 */
.my-order .order-list > li {
  box-sizing: border-box;
  border: 0.8px solid #ddd;
  margin: 20px 0;
}

/* 每个订单的头部 */
.my-order .order-list > li .order-title {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  box-sizing: border-box;
  border-bottom: 0.8px solid #ddd;
  background: #eee;
  /*color: #999;*/
  font-size: 13px;
  position: relative;
}

.my-order .order-list > li .order-title span {
  position: absolute;
}

.my-order .order-list > li .order-title span:nth-child(2) {
  left: 250px;
}

.my-order .order-list > li .order-title span:nth-child(3) {
  left: 530px;
}

.my-order .order-list > li .order-title span:nth-child(4) {
  left: 655px;
}

.my-order .order-list > li .order-title span:nth-child(5) {
  left: 780px;
}

.my-order .order-list > li .order-title span:nth-child(6) {
  left: 905px;
}

/* 每个订单的内容区 */
.my-order .order-list > li .order-content {
  /*border: 2px solid green;*/
  overflow: hidden;
  height: 100px;
}

/* 每个订单左侧商品列表 */
.my-order .order-list > li .order-content .product-list {
  height: 100%;
  width: 50%;
  float: left;
}

.my-order .order-list > li .order-content .product-list > li {
  height: 100px;
  line-height: 100px;
  box-sizing: border-box;
  border-bottom: 0.8px solid #ddd;
  border-right: 0.8px solid #ddd;
  position: relative;
}

/* 商品区域：包括图片和商品名 */
.product-area {
  position: relative;
  top: 15px;
  left: 15px;
  width: 370px;
  height: 70px;
  cursor: pointer;
  border-right: 0.8px solid #ddd;
}

.product-area:hover .product-name {
  color: #ef1234;
}

/* 商品图片 */
.product-img {
  /*display: inline;*/
  position: absolute;
  width: 70px;
  height: 70px;
  /*margin: 15px;*/
  box-sizing: border-box;
  border: 0.8px solid #ddd;
}

/* 商品名 */
.product-name {
  width: 280px;
  height: 60px;
  line-height: 30px;
  font-size: 13px;
  position: absolute;
  top: 5px;
  left: 85px;
}

/* 商品数量 */
.my-order .order-list > li .order-content .product-list > li .product-num {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: absolute;
  left: 420px;
  top: 30px;
  color: #999;
  /*background: red;*/
}

.my-order .order-list > li .order-content .product-list > li:last-child {
  border-bottom: none;
}

/* 每个右侧订单信息区域 */
.my-order .order-list > li .order-content .order-info {
  width: 50%;
  float: right;
}

.my-order .order-list > li .order-content .order-info > span {
  display: inline-block;
  box-sizing: border-box;
  padding-top: 20px;
  width: 118.8px;
  height: 100px;
  border-right: 0.8px solid #ddd;
  text-align: center;
  font-size: 13px;
}

.receiver {
  border-left: 0.8px solid #ddd;
}

.my-order .order-list > li .order-content .order-info > span:last-child {
  border-right: none;
}

/* 等待付款 & 等待收货 */
.my-order .order-list > li .order-content .waitting-for-payment .order-status,
.my-order .order-list > li .order-content .waitting-for-product .order-status {
  color: #f40;
}

.my-order .order-list > li .order-content .waitting-for-payment .order-operation span {
  color: #ef1234;
  border: 1px solid #ef1234;
  border-radius: 1px;
  padding: 5px 20px;
  font-weight: bold;
}

.my-order .order-list > li .order-content .waitting-for-payment .order-operation span:hover {
  color: #fff;
  background: #ef1234;
  cursor: pointer;
}

/* 订单已完成 */
.my-order .order-list > li .order-content .order-is-finished .order-status {
  color: #999;
}

.my-order .order-list > li .order-content .waitting-for-product .order-operation span,
.my-order .order-list > li .order-content .order-is-finished .order-operation span {
  font-weight: bold;
}

.my-order .order-list > li .order-content .waitting-for-product .order-operation span:hover,
.my-order .order-list > li .order-content .order-is-finished .order-operation span:hover {
  cursor: pointer;
  color: #ef1234;
}
</style>
