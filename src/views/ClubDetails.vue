<template>
  <div class="product-details">
    <app-header/>
    <!-- 分类栏 -->
    <div class="category-wrapper">
      <div class="category">社团 > {{ clubInfo.name }} > 社团详情 </div>
    </div>
    <!-- 主要信息 -->
    <div class="main-area">
      <!-- 产品图片 -->
      <div class="img-area">
        <img :src="getClubImgPath(clubInfo.imgName)">
      </div>
      <div class="product-info">
        <div class="title">
          <h1 class="name">{{ clubInfo.name }}</h1>
        </div>
        <div class="main-details">
          <div>
            社长姓名：
            <span class="leader">{{ clubInfo.leader }}</span>
          </div>
          <div>
            社团宣言：
            <span class="desc">{{ clubInfo.desc }}</span>
          </div>
          <div>
            社团活动：
            <span class="act"><Strong>{{ clubInfo.act }}</Strong></span>
          </div>
          <div>
            社团商品：
          </div>
          <ul>
          <li class="commodityUnit">
            <img :src="getCommodityImgPath(clubInfo.commodityImg1)">
            <div class="commodityName">
              {{clubInfo.commodity1}}
            </div>
            <div class="commodityPrice">
              ￥{{clubInfo.price1}}
            </div>
          </li>
            <li class="commodityUnit">
              <img :src="getCommodityImgPath(clubInfo.commodityImg2)">
              <div class="commodityName">
                {{clubInfo.commodity2}}
              </div>
              <div class="commodityPrice">
                ￥{{clubInfo.price2}}
              </div>
            </li>
            <li class="commodityUnit">
              <img :src="getCommodityImgPath(clubInfo.commodityImg3)">
              <div class="commodityName">
                {{clubInfo.commodity3}}
              </div>
              <div class="commodityPrice">
                ￥{{clubInfo.price3}}
              </div>
            </li>
            <li class="commodityUnit">
              <img :src="getCommodityImgPath(clubInfo.commodityImg4)">
              <div class="commodityName">
                {{clubInfo.commodity4}}
              </div>
              <div class="commodityPrice">
                ￥{{clubInfo.price4}}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <el-button type="primary" round>加入社团</el-button>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/MainPage/AppHeader'
import AppFooter from '@/components/MainPage/AppFooter'
import MoreInfo from '@/components/Goods/MoreInfo'
import products from '../assets/database/products.js'
import clubs from '../assets/database/club.js'
export default {
  name: 'ClubDetails',
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
    'more-info': MoreInfo
  },
  data () {
    return {
      allProducts: products,
      allClubs: clubs,
      productNum: 1,
      discounts: ['满50减5', '满99减20', '满199减50', '满299减100']
    }
  },
  methods: {
    getClubImgPath: function (name) {
      return require('../assets/img/club-images/' + name)
    },
    getClubInfo: function (id) {
      return this.allClubs[id - 1]
    },
    getCommodityImgPath: function (name) {
      return require('../assets/img/commodity-images/' + name)
    }
  },
  computed: {
    clubInfo: function () {
      return this.getClubInfo(this.$route.params.id)
    }
  },
  mounted () {
    // console.log(this.recommendedIds);
  }
}
</script>

<style scoped>

.product-details {
  width: 100%;
  font-size: 14px;
}
/* 分类栏 */
.product-details .category-wrapper {
  width: 100%;
  background: #eee;
}
.product-details .category-wrapper .category {
  width: 1200px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  margin: 0 auto;
}
/* 主要信息 */
.product-details .main-area {
  width: 1200px;
  margin: 10px auto;
  margin-bottom: 0;
  position: relative;
}
.product-details .main-area::after {
  content: '';
  display: block;
  clear: both;
}
/* 商品图片 */
.product-details .main-area .img-area {
  width: 320px;
  height: 400px;
  float: left;
}
.product-details .main-area .img-area img {
  width: 320px;
  height: 400px;
  box-sizing: border-box;
  border: 1px solid #eee;
  /*box-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
}
.product-details .main-area .product-info {
  width: 680px;
  min-height: 360px;
  float: left;
  box-sizing: border-box;
  /*border: 1px solid green;*/
  padding: 0px 30px;
}
.product-details .main-area .product-info .title {
  height: 40px;
  line-height: 40px;
}
.product-details .main-area .product-info .main-details {
  font-size: 20px;
  color: #666;
  position: relative;
  width: 1000px;
  min-height: 360px;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0 10px 35px 0px;
}
.product-details .main-area .product-info .main-details>div {
  height: 36px;
  line-height: 36px;
  /*background: red;*/
  box-sizing: border-box;
  /*border: 1px solid red;*/
}
.product-details .main-area .product-info .main-details .commodityUnit{
  width: 180px;
  height: 260px;
  float: left;
}
.product-details .main-area .product-info .main-details img {
  width: 180px;
  height: 180px;
}
.product-details .main-area .product-info .main-details .commodityUnit:hover {
  box-shadow: 0px 0px 10px 2px #ddd;
  cursor: pointer;
  color: #12ab34;
}
.product-details .main-area .product-info .main-details .commodityName {
  width: 180px;
  text-align: center;
  font-size: 14px;
}
.product-details .main-area .product-info .main-details .commodityPrice {
  width: 180px;
  text-align: center;
}
</style>
