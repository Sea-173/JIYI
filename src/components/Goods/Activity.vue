<template>
  <div id="good-fresh">
    <div class="fresh-container">
      <div class="fresh-header">
        <span class="logo-icon"></span>
      </div>
      <div class="fresh-content">
        <ul class="fresh-list">
          <li v-for="fresh in goodFreshList" :key="fresh">
            <div class="temp-container">
              <div class="fresh-img">
                <img :src="getImagePath(fresh.index)">
              </div>
              <div class="fresh-price">
                <span class="price">{{ fresh.price }}</span>
                <span class="quantity">{{ fresh.quantity }}</span>
              </div>
              <div class="buy-now">
                <span>点击查看</span>
              </div>
              <div class="fresh-title">
                <span>{{ fresh.title }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="fresh-footer">
        <span>更多闲置 &gt;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodFresh',
  data () {
    return {
      goodFreshList: [
        {
          index: 0,
          title: '数学社',
          price: '建模大赛'
        },
        {
          index: 1,
          title: '吉他社',
          price: '弹唱大赛'

        },
        {
          index: 2,
          title: '羽球社',
          price: '羽球比赛'

        },
        {
          index: 3,
          title: '音乐社',
          price: '纳新活动'

        },
        {
          index: 4,
          title: '摄影社',
          price: '摄影大赛'

        },
        {
          index: 5,
          title: '轮滑社',
          price: '纳新活动'
        },
        {
          index: 6,
          title: '龙舟社',
          price: '龙舟大赛'

        },
        {
          index: 7,
          title: '围棋社',
          price: '以棋会友'

        }
      ]
    }
  },
  methods: {
    getImagePath: function (name) {
      return require('@/assets/img/club-activities/activity-images/' + name + '.jpg')
    }
  }
}
</script>

<style scoped>
#good-fresh {
  width: 100%;
  height: 660px;
  margin-top: 60px;
  padding-top: 80px;
  background: url('../../assets/img/club-activities/good-fresh-bg-outer.jpg') no-repeat;
  background-size: 2800px; /* 这里不写百分比 */
  background-position: 50% 0%;  /*背景图片居中*/
  box-shadow: 0px 2px 20px #999;
  /*margin-bottom: 100px;*/
}
#good-fresh .fresh-container {
  width: 1210px;
  height: 820px;
  margin: 0px auto;
  /*background-color: #eee;*/
  /*background: url('../assets/club-activities/club-activities-bg-inner.jpg');*/
  position: relative;

}
/* 内容区域 */
#good-fresh .fresh-content {
  width: 100%;
  height: 460px;
  box-sizing: border-box;
  padding: 5px;
  /*border: 1px solid green;*/
}
#good-fresh .fresh-content .fresh-list {
  width: 100%;
}
#good-fresh .fresh-content .fresh-list li {
  box-sizing: border-box;
  /*border: 1px solid red;*/
  float: left;
  width: 290px;
  height: 270px;
  margin: 5px;
  position: relative;
  cursor: pointer;
}
#good-fresh .fresh-content .fresh-list li:hover>div.temp-container {
  /*animation: goodfreshup 0.2s ease forwards;*/
  top: -5px;
  box-shadow: 0 0 5px 2px #ccc;
}
#good-fresh .fresh-content .fresh-list li>div.temp-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 0 1px #eee;
  transition: top 0.3s;
}
/* 产品图片 */
#good-fresh .fresh-content .fresh-list li .fresh-img {
  width: 180px;
  height: 160px;
  position: absolute;
  top: 0px;
  left: 0px;

}
#good-fresh .fresh-content .fresh-list li .fresh-img img {
  width: 180px;
  height: 230px;
  /*background-color: red;*/
  /*border:1px solid red;*/
}
/* 产品价格 */
#good-fresh .fresh-content .fresh-list li .fresh-price {
  width: 90px;
  height: 90px;
  position: absolute;
  top: 20px;
  left: 190px;
  color: #fff;
  background: url('../../assets/img/club-activities/dialog-box.png') no-repeat;
  background-size: 90px;
}
#good-fresh .fresh-content .fresh-list li .fresh-price>span {
  display: inline-block;
  position: absolute;
  text-align: center;
  box-sizing: border-box;
  /*background-color: red;*/
}
#good-fresh .fresh-content .fresh-list li .fresh-price .price {
  height: 26px;
  line-height: 26px;
  width: 90px;
  left: 0px;
  top: 24px;
  font-size: 18px;
  font-weight: bold;
}
#good-fresh .fresh-content .fresh-list li .fresh-price .quantity {
  height: 20px;
  line-height: 20px;
  width: 70px;
  left: 10px;
  top: 50px;
  border-top: 2px solid rgba(255,255,255,0.5);
  font-size: 14px;
}
/* 立即选购 */
#good-fresh .fresh-content .fresh-list li .buy-now {
  position: absolute;
  top: 130px;
  right: 10px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  /*background-color: #eee;*/
}
#good-fresh .fresh-content .fresh-list li .buy-now span {
  box-sizing: border-box;
  border: 1px solid #12ab34;
  color: #12ab34; /*#b49966;*/
  border-radius: 150px;
  padding: 5px 10px;
  font-size: 14px;
  /*font-weight: bold;*/
}
#good-fresh .fresh-content .fresh-list li .buy-now span:hover {
  background-color: #12ab34;
  color: #fff;
  font-weight: bold;
}
/* 产品介绍title */
#good-fresh .fresh-content .fresh-list li .fresh-title {
  width: 260px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  bottom: 5px;
  left: 20px;
  overflow: hidden;
  text-align: center;
  font-weight: bold;
  /*background-color: red;*/
}
#good-fresh .fresh-content .fresh-list li .fresh-title span:hover {
  color: #12ab34;
  cursor: pointer;
}
/* 头部 */
#good-fresh .fresh-header {
  width: 100%;
  height: 80px;
  line-height: 80px;
  position: absolute;
  top: -80px;
  text-align: center;
}
#good-fresh .fresh-header .logo-icon {
  background: url('../../assets/img/main-view/logo3.png');
  background-size: 198px 64px;
  display: inline-block;
  margin-top: 8px;
  width: 198px;
  height: 64px;
  border-radius: 10px;
}
/* 底部 */
#good-fresh .fresh-footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
#good-fresh .fresh-footer span {
  padding: 5px 15px;
  border: 1px solid #12ab34;
  border-radius: 15px;
  color: #12ab34;
  font-size: 14px;
}
#good-fresh .fresh-footer span:hover {
  background-color: #12ab34;
  color: #fff;
  cursor: pointer;
}
</style>
