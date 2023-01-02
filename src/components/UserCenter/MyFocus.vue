<template>
  <div class="my-focus">
    <user-center-temp
      :active-index='activeIndex'
      :item-category="focusCategory"
      :title="'我的关注'"
      @change-active-index="changeActiveIndex">
      <!-- 我的收藏 列表 -->
      <div v-show="activeIndex == 0">
        <product-list
          @show-all-product=""
          :item="'我的收藏夹'"
          :all-product-list="favoriteList">
        </product-list>
      </div>
      <!-- 关注的商品 列表 -->
      <div v-show="activeIndex == 1">
        <product-list
          @show-all-product=""
          :item="'关注的商品'"
          :all-product-list="focusList">
        </product-list>
      </div>
      <!-- 关注的社团活动 列表 -->
      <div v-show="activeIndex == 2">
        <my-club/>
      </div>
      <!-- 关注的社团活动 列表 -->
      <div v-show="activeIndex == 3">
        <product-list
          :item="'关注的社团'"
          :all-product-list="clubList">
        </product-list>
      </div>
    </user-center-temp>
  </div>
</template>

<script>
import UserCenterTemp from '@/components/UserCenter/UserCenterTemp'
import FocusProductListBase from '@/components/UserCenter/FocusProductListBase'
import MyClub from '@/components/UserCenter/Myclub'
import request from '../../utils/requests'

export default {
  name: 'MyFocus',
  components: {
    'user-center-temp': UserCenterTemp,
    'product-list': FocusProductListBase,
    'my-club': MyClub

  },
  data () {
    return {
      activeIndex: 0,
      // showAllProduct:
      focusCategory: [
        {
          index: 0,
          item: '我的收藏夹',
          showNum: 0
        },
        {
          index: 1,
          item: '关注的商品',
          showNum: 0
        },
        {
          index: 2,
          item: '关注的社团',
          showNum: 0
        },
        {
          index: 3,
          item: '关注的社团活动',
          showNum: 0
        }
      ],
      focusList: [
        {
          index: 0,
          imageName: '1-0.jpg',
          name: '跳绳',
          originalPrice: 20.90,
          currentPrice: 19.90,
          commentNum: 14,
          favorableRate: 98
        },
        {
          index: 1,
          imageName: '1-1.jpg',
          name: '林美钢笔',
          originalPrice: 59.90,
          currentPrice: 59.90,
          commentNum: 14,
          favorableRate: 98
        },
        {
          index: 2,
          imageName: '1-2.jpg',
          name: '拯救者y9000p',
          originalPrice: 5099.90,
          currentPrice: 5099.00,
          commentNum: 11,
          favorableRate: 98
        },
        {
          index: 3,
          imageName: '1-3.jpg',
          name: '苹果5件套',
          originalPrice: 59.90,
          currentPrice: 48.60,
          commentNum: 13,
          favorableRate: 98
        },
        {
          index: 4,
          imageName: '1-4.jpg',
          name: '苹果13手机壳',
          originalPrice: 48.90,
          currentPrice: 48.90,
          commentNum: 11,
          favorableRate: 98
        },
        {
          index: 5,
          imageName: '1-5.jpg',
          name: '苹果mag safe',
          originalPrice: 45.90,
          currentPrice: 42.90,
          commentNum: 12,
          favorableRate: 98
        }
      ],
      favoriteList: [
        {
          index: 0,
          imageName: '2-0.jpg',
          name: '排球',
          originalPrice: 97.90,
          currentPrice: 96.90,
          commentNum: 13,
          favorableRate: 98
        },
        {
          index: 1,
          imageName: '2-1.jpg',
          name: '李宁篮球',
          originalPrice: 68.90,
          currentPrice: 66.90,
          commentNum: 10,
          favorableRate: 98
        },
        {
          index: 2,
          imageName: '2-2.jpg',
          name: '李宁排球',
          originalPrice: 69.90,
          currentPrice: 59.90,
          commentNum: 14,
          favorableRate: 98
        },
        {
          index: 3,
          imageName: '2-3.jpg',
          name: '钢笔加墨盒',
          originalPrice: 69.90,
          currentPrice: 69.90,
          commentNum: 11,
          favorableRate: 98
        },
        {
          index: 4,
          imageName: '2-4.jpg',
          name: '蜂蜜记账本',
          originalPrice: 59.90,
          currentPrice: 58.00,
          commentNum: 12,
          favorableRate: 98
        },
        {
          index: 5,
          imageName: '2-5.jpg',
          name: '钢笔未拆封',
          originalPrice: 49.90,
          currentPrice: 46.90,
          commentNum: 15,
          favorableRate: 97
        },
        {
          index: 6,
          imageName: '2-6.jpg',
          name: '黑色笔袋',
          originalPrice: 34.80,
          currentPrice: 34.80,
          commentNum: 12,
          favorableRate: 99
        }

      ],
      clubList: [
        {
          index: 0,
          imageName: '1.png',
          name: '吉他社',
          originalPrice: 20.90,
          currentPrice: 20.90,
          commentNum: 29014,
          favorableRate: 98,
          clubActivity: '吉他大赛',
          activityDate: '2022/06/19',
          activityLocation: '安楼 101',
          isApplyed: '√ 已报名'
        },
        {
          index: 1,
          imageName: '2.png',
          name: '羽球社',
          originalPrice: 20.90,
          currentPrice: 20.90,
          commentNum: 29014,
          favorableRate: 98,
          clubActivity: '新生杯',
          activityDate: '2022/06/19',
          activityLocation: '人工草坪',
          isApplyed: '+ 去报名'
        }, {
          index: 2,
          imageName: '3.png',
          name: '数学社',
          originalPrice: 20.90,
          currentPrice: 20.90,
          commentNum: 29014,
          favorableRate: 98,
          clubActivity: '数学建模比赛',
          activityDate: '2022/06/19',
          activityLocation: '复楼 119',
          isApplyed: '√ 已报名'
        }
      ]
    }
  },
  methods: {
    // 获取降价商品数量
    getLowerPriceItems: function (productList) {
      var tempList = []
      for (var i = 0; i < productList.length; i++) {
        if (productList[i].currentPrice < productList[i].originalPrice) {
          tempList.push(productList[i])
        }
      }
      return tempList
    },
    // 改变展示项目的index
    changeActiveIndex: function (index) {
      this.activeIndex = index
    },
    // 获取每个选项展示的数字
    countItemsShowNum: function () {
      this.focusCategory[0].showNum = this.getLowerPriceItems(this.favoriteList).length
      this.focusCategory[1].showNum = this.getLowerPriceItems(this.focusList).length
    }
  },
  mounted () {
    this.countItemsShowNum()


    let mydata = {id: window.sessionStorage['id']}
    request.get('/PI/user/activity', {params: mydata}).then(res => {
      console.log(res)
      if (res.code === '200') {
        console.log(res.teams)//返回的api忘记把teams改成activities了

        let the_activities=[]
        let activity={
          index: 0,
          imageName: '1.png',
          name: '吉他社',
          originalPrice: 20.90,
          currentPrice: 20.90,
          commentNum: 29014,
          favorableRate: 98,
          clubActivity: '吉他大赛',
          activityDate: '2022/06/19',
          activityLocation: '安楼 101',
          isApplyed: '√ 已报名'
        }


        for (var i = 0; i < res.teams.length; i++) {
          console.log(res.teams[i].theme)
          //teamID,address,theme,activityTime,activityID,activityDescription

          activity.activityDate=res.teams[i].activityTime
          activity.name='6'
          activity.activityLocation=res.teams[i].address
          activity.index=res.teams[i].activityID
          activity.clubActivity=res.teams[i].theme+' '+res.teams[i].activityDescription

          the_activities.push(activity)
        }

        // eslint-disable-next-line camelcase
        this.clubList = the_activities

      }


    })



  }
}
</script>

<style scoped>
.my-focus {
  /*padding: 20px 0 0 20px;*/
}
</style>
