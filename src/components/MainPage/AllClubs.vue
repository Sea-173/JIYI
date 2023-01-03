<template>
  <div>
    <app-header/>
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="content">
          <div class="rank">
            全部社团
          </div>
          <ul>
            <li v-for="(item, index) in teams">
              <router-link :to="{ path: '/all-clubs', query: {teamID: item.teamID} }">
                <el-link :underline="false">
                  <span class="filter">{{ index + 1 }}&nbsp;&nbsp;{{ title[index] }}</span>
                </el-link>
              </router-link>
            </li>
          </ul>
        </div>
      </el-aside>
      <el-container>
        <!-- 主要信息 -->
        <div class="main-area">
          <!-- 产品图片 -->
          <div class="img-area">
            <img :src="getpath(picture)">
          </div>
          <div class="product-info">
            <div class="title">
              <h1 class="name">{{ teamName }}</h1>
            </div>
            <div class="main-details">
              <div>
                社长姓名：
                <span class="leader">{{ teamLeader }}</span>
              </div>
              <div>
                社团宣言：
                <span class="desc">{{ introduction }}</span>
              </div>
              <div>
                社团活动：
                <div class="act">
                  <el-table
                    :data="activity"
                    max-height="200"
                    border
                    stripe
                    style="width: 650px"
                  >
                    <el-table-column label="活动ID" prop="activityID"/>
                    <el-table-column label="活动时间" prop="activityTime" width="200px"/>
                    <el-table-column label="活动地点" prop="address"/>
                    <el-table-column label="活动主题" prop="theme"/>
                    <el-table-column label="活动描述" prop="activityDescription" width="100px"/>
                    <el-table-column label="操作" width="100px">
                      <template #default="scope">
                        <el-button class="edit" size="small" @click="handleJoin(scope.row)">参加</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div>
                社团商品：
                <div class="commodity">
                  <el-table
                    :data="commodity"
                    max-height="200"
                    border
                    stripe
                    style="width: 650px"
                  >
                    <el-table-column label="商品ID" prop="commodityNumber" width="80px"/>
                    <el-table-column label="商品" prop="commodityName"/>
                    <el-table-column label="价格" prop="commodityPrice" width="60px"/>
                    <el-table-column label="描述" prop="commodityDescription" width="150px"/>
                    <el-table-column label="卖家" prop="sellerName"/>
                    <el-table-column label="操作" width="120px">
                      <template #default="scope">
                        <el-button class="edit" size="small" @click="addToShoppingCart(scope.row)">加入购物车</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
          <el-button type="primary" round class="join" @click="joinTeam">加入社团</el-button>
        </div>
      </el-container>
    </el-container>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/MainPage/AppHeader'
import AppFooter from '@/components/MainPage/AppFooter'
import request from '../../utils/requests'

export default {
  name: 'AllClubs',
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter
  },
  data () {
    return {
      teams: [],
      title: [],
      teamID: 0,
      picture: '',
      teamLeader: '',
      introduction: '',
      teamName: '',
      activity: [],
      commodity: []
    }
  },
  created () {
    this.load()
    this.load1()
  },
  watch: {
    '$route': {
      handler: 'load1',
      immediate: true
    }
  },
  methods: {
    getpath (path) {
      if (path.startsWith('http')) { return path } else { return path ? require('../../assets/upload/' + path) : '' }// path不为null就返回对应的路径
    },
    handleJoin (row) {
      this.all = {
        'id': window.sessionStorage.getItem('id'),
        'activityID': row.activityID
      }
      request.post('/PI/user/joinActivity', this.all).then(res => {
        if (res.code === 200) {
          this.$message.success('加入成功')
        } else {
          this.$message.error('加入失败')
        }
      })
    },
    addToShoppingCart (row) {
      this.all = {
        'userID': window.sessionStorage.getItem('id'),
        'commodityNumber': row.commodityNumber
      }
      request.post('/CT/addToShoppingCart', this.all).then(res => {
        if (res.code === 200) {
          this.$message.success('添加成功')
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    joinTeam () {
      this.all = {
        'id': window.sessionStorage.getItem('id'),
        'teamID': this.teamID
      }
      request.post('/PI/user/joinTeam', this.all).then(res => {
        if (res.code === 200) {
          this.$message.success('加入成功')
        } else {
          this.$message.error('加入失败')
        }
      })
    },
    load () {
      request.get('/TE/getAllTeams')
        .then(res => {
          this.teams = res.teams
          for (let item = 0; item < this.teams.length; item++) {
            if (this.teams[item].teamName.length > 13) {
              this.title[item] = this.teams[item].teamName.slice(0, 13) + '...'
            } else {
              this.title[item] = this.teams[item].teamName
            }
          }
        })
    },
    load1 () {
      this.teamID = this.$route.query.teamID
      request.get('/TE/getTeamInfo', {
        params: {'teamID': this.teamID}
      }).then(res => {
        this.picture = res.picture
        this.teamLeader = res.teamLeader
        this.teamName = res.teamName
        this.introduction = res.introduction
      })
      this.load2()
      this.load3()
    },
    load2 () {
      this.teamID = this.$route.query.teamID
      request.get('/TE/activity/all', {
        params: {'teamID': this.teamID}
      }).then(res => {
        this.activity = res.activities
      })
    },
    load3 () {
      this.teamID = this.$route.query.teamID
      request.get('/CT/getTeamCommodities', {
        params: {'teamID': this.teamID}
      }).then(res => {
        this.commodity = res.commodities
      })
    }
  }
}
</script>

<style scoped>
.act {
  margin-top: 10px;
  margin-bottom: 10px;
}

.commodity {
  margin-top: 10px;
  margin-bottom: 10px;
}

.rank {
  padding: 10px;
  margin-bottom: 20px;
  width: 90%;
  border-bottom: .1rem solid;
  border-bottom-color: #e6e6e6;
}

.join {
  position: relative;
  left: 450px;
  bottom: 20px;
}

li {
  margin-bottom: 5px;
}

li .el-link {
  margin-left: 10px;
  margin-right: 10px;
  color: #696969;
}

li .el-link:hover {
  color: #409eff;
}

/* 主要信息 */
.main-area {
  width: 1200px;
  position: relative;
}

.product-details .main-area::after {
  content: '';
  display: block;
  clear: both;
}

/* 商品图片 */
.img-area {
  width: 320px;
  height: 400px;
  float: left;
}

.img-area img {
  width: 320px;
  height: 400px;
  box-sizing: border-box;
  border: 1px solid #eee;
  /*box-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
}

.product-info {
  width: 680px;
  min-height: 360px;
  float: left;
  box-sizing: border-box;
  /*border: 1px solid green;*/
  padding: 0px 30px;
}

.title {
  height: 40px;
  line-height: 40px;
}

.main-details {
  font-size: 20px;
  color: #666;
  position: relative;
  width: 1000px;
  min-height: 360px;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0 10px 35px 0px;
}

.product-details .main-area .product-info .main-details > div {
  height: 36px;
  line-height: 36px;
  /*background: red;*/
  box-sizing: border-box;
  /*border: 1px solid red;*/
}

.product-details .main-area .product-info .main-details .commodityUnit {
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
