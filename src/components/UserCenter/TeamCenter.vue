<template>
  <div class="team-center">
    <user-center-temp
      :active-index='activeIndex'
      :item-category="TeamCenterCategory"
      :title="'社团中心'"
      @change-active-index="changeActiveIndex">
      <div>
        <div class="page-content" v-show="activeIndex==0">
          <el-table
            :data="TeamData"
            border
            stripe
            style="width: 100%;">
            <el-table-column label="社团id" prop="teamID" sortable width="100px"/>
            <el-table-column label="社团名" prop="teamName"/>
            <el-table-column label="社长id" prop="teamLeader"/>
            <el-table-column label="社长姓名" prop="teamLeaderName"/>
            <el-table-column label="社团宣言" prop="introduction"/>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="exit(scope.row)">退出社团</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </user-center-temp>
  </div>
</template>

<script>
import UserCenterTemp from '@/components/UserCenter/UserCenterTemp'
import request from '../../utils/requests'

export default {
  name: 'TeamCenter',
  components: {
    'user-center-temp': UserCenterTemp
  },
  data () {
    return {
      activeIndex: 0,
      TeamData: [],
      id: window.sessionStorage.getItem('id'),
      para: {
        id: window.sessionStorage.getItem('id')
      },
      TeamCenterCategory: [
        {
          index: 0,
          item: '我参加的社团',
          // unit: '张',
          // showNum: 2,
          num: 0
        },
        {
          index: 1,
          item: '我管理的社团',
          // unit: '张',
          // showNum: 5,
          num: 0
        }
      ]
    }
  },
  created () {
    this.load()
  },
  methods: {
    changeActiveIndex: function (index) {
      this.activeIndex = index
      // this.countOrderShowedNum();
    },
    load () {
      request.get('/PI/user/team', {
        params: {'id': this.id}
      }).then(res => {
        this.TeamData = res.teams
      })
    },
    exit (row) {
      row["id"] = this.id
      console.log(row)
      request.post('/PI/user/quitTeam', row).then(res => {
          if (res.code === 400) {
            this.$message.error('删除失败')
          } else {
            this.$message.success('删除成功')
          }
          this.load()
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
