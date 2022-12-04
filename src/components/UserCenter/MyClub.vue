<template>
  <slide-base
    :slide-content="slideContentArr"
    :slide-info="slideInfo"
    @play-one-step="updateOffset">
    <ul v-bind:style="{left: offset + 'px'}" class="slide-ul">
      <li>
        <ul class="slide-unit">
          <router-link v-for="club in getSlideClub.slice(10, 12)"
                       :to="{name: 'ClubDetails', params: {id: club.id}}"
                       tag="li">
            <div class="seckill-price">
              <span class="price1">{{ club.name }}</span>
            </div>
            <div class="club-img">
              <img :src="getClubImg(club.imgName)">
            </div>
            <div class="club-title">
              <p>{{ club.desc }}</p>
            </div>
            <div class="seckill-now">
              <p class="slide-up">进入主页</p>
            </div>
          </router-link>
        </ul>
      </li>
      <li v-for="content in slideContentArr">
        <ul class="slide-unit">
          <router-link v-for="club in content.clubs"
                       :to="{name: 'ClubDetails', params: {id: club.id}}"
                       tag="li">
            <div class="seckill-price">
              <span class="price1">{{ club.name }}</span>
            </div>
            <div class="club-img">
              <img :src="getClubImg(club.imgName)">
            </div>
            <div class="club-title">
              <p>{{ club.desc }}</p>
            </div>
            <div class="seckill-now">
              <p class="slide-up">进入主页</p>
            </div>
          </router-link>
        </ul>
      </li>
      <li>
        <ul class="slide-unit">
          <router-link v-for="club in getSlideClub.slice(0, 2)"
                       :to="{name: 'ClubDetails', params: {id: club.id}}"
                       tag="li">
            <div class="seckill-price">
              <span class="price1">{{ club.name }}</span>
            </div>
            <div class="club-img">
              <img :src="getClubImg(club.imgName)">
            </div>
            <div class="club-title">
              <p>{{ club.desc }}</p>
            </div>
            <div class="seckill-now">
              <p class="slide-up">进入主页</p>
            </div>
          </router-link>
        </ul>
      </li>
    </ul>
  </slide-base>
</template>

<script>
import SlideBase from '@/components/MainPage/SlideBase'
import clubs from '../../assets/database/club.js'

export default {
  name: 'SlideSeckill',
  props: [],
  data () {
    return {
      offset: -680,
      slideInfo: {
        slideNum: 1,
        playInterval: 2000,
        width: 600,
        height: 400,
        isAutoPlay: false,
        // sideBtnPositionX: -40,
        isAlwaysShowedSideBtn: true,
        bottomBtnColor: '#12ab34',
      },
      allClubs: clubs,
    }
  },
  components: {
    'slide-base': SlideBase,
  },
  computed: {
    getSlideClub: function () {
      var tempArr = [];
      for (var j = 0; j < 3; j++) {
        for (var i = 0; i < this.allClubs.length; i++) {
          tempArr.push(this.allClubs[i]);
        }
      }
      return tempArr;
    },
    // 将轮播的商品分为3个对象
    slideContentArr: function () {
      return [
        {
          index: 0,
          clubs: this.getSlideClub.slice(0,2),
        },
      ]
    },
  },
  methods: {
    // 获取轮播图路径
    getClubImg: function (name) {
      return require('../../assets/img/club-images/' + name) ;
    },
    updateOffset: function ($event) {
      this.offset = $event;
      // console.log($event);
    },
  },
  mounted () {
    console.log(this.getSlideClub.length);
  },
};
</script>

<style >
/* 轮播图轮播内容部分 */
ul.slide-ul {
  position: absolute;
  top: 30px;
  width: 5900px;
  height: 360px;
}
ul.slide-ul>li {
  width: 680px;  /*1100px*/
  height: 100%; /*360px*/
  float: left;
}
ul.slide-ul>li ul.slide-unit {
  margin: 0 auto;
  width: 1100px;
  height: 360px;
  /*background-color: red;*/
}
/* 每个商品的信息 */
ul.slide-ul>li ul.slide-unit>li {
  width: 216px;
  height: 360px;
  float: left;
  /*background-color: #fff;*/
  box-sizing: border-box;
  margin: 0 2px;
  position: relative;
  /*border: 1px solid red;*/
  cursor: pointer;
}
ul.slide-ul>li ul.slide-unit>li:hover {
  box-shadow: 0px 0px 10px 2px #ddd;
}
/* 价格 */
ul.slide-ul>li ul.slide-unit>li .seckill-price {
  position: absolute;
  top: -10px;
  left: 18px;
  height: 30px;
  line-height: 30px;
  width: 180px;
  background-color: #f40;
  border-radius: 0 0 15px 15px;
  color: #fff;
  text-align: center;
  font-size: 22px;
}
ul.slide-ul>li ul.slide-unit>li .seckill-price .price0 {
  text-decoration: line-through;
  font-size: 14px;
  opacity: 0.5;
}
/* 商品图片 */
ul.slide-ul>li ul.slide-unit>li .club-img {
  position: absolute;
  top: 40px;
  left: 18px;
  width: 180px;
  height: 180px;
  /*margin-top: 10px;*/
}
ul.slide-ul>li ul.slide-unit>li .club-img img {
  width: 180px;
  height: 240px;
}
/* 商品title */
ul.slide-ul>li ul.slide-unit>li .club-title {
  position: absolute;
  top: 300px;
  left: 18px;
  width: 170px;
  height: 60px;
  line-height: 30px;
  overflow: hidden;
  padding: 0 5px;
  text-align: center;
  /*border: 1px solid red;*/
}
ul.slide-ul>li ul.slide-unit>li .club-title p {

}
/* 商品好评率 */
ul.slide-ul>li ul.slide-unit>li .favorable-rating {
  position: absolute;
  bottom: 20px;
  left: 18px;
  width: 180px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #999;
  font-size: 14px;
  border-bottom: 3px solid #f40;
}

/* 立即秒杀 */
ul.slide-ul>li ul.slide-unit>li .seckill-now {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 216px;
  height: 50px;
  overflow: hidden;
}
ul.slide-ul>li ul.slide-unit>li .seckill-now .slide-up {
  position: absolute;
  bottom: -50px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #f40;
  color: #fff;
  font-size: 20px;
  transition: bottom ease-out 0.3s;
}
ul.slide-ul>li ul.slide-unit>li:hover .seckill-now .slide-up {
  bottom: 0;
}

/* 底部按钮 */
#fresh-seckill .seckill-content .slide .slide-bottom-btn li {
  background-color: #fff;
  opacity: 0.7;
  border: 2px solid #12ab34;
  box-shadow: none;
}
#fresh-seckill .seckill-content .slide-bottom-btn li.current-image {
  background-color: #12ab34;
}
</style>
