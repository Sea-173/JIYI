<template>
  <div class="team-center">
    <user-center-temp
      :active-index='activeIndex'
      :item-category="ActivityCenterCategory"
      :title="'活动中心'"
      @change-active-index="changeActiveIndex">
      <div>
        <div class="page-content" v-show="activeIndex==0">
          <el-table
            :data="ActivityData"
            border
            stripe
            style="width: 100%;">
            <el-table-column label="活动id" prop="activityID" sortable width="100px"/>
            <el-table-column label="活动主题" prop="theme"/>
            <el-table-column label="团队id" prop="teamID"/>
            <el-table-column label="活动地址" prop="address"/>
            <el-table-column label="活动时间" prop="activityTime"/>
            <el-table-column label="活动描述" prop="activityDescription"/>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="danger" size="small" @click="exit(scope.row)">退出活动</el-button>
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
  name: 'ActivityCenter',
  components: {
    'user-center-temp': UserCenterTemp
  },
  data () {
    return {
      form: {},
      dialogFormVisible: false,
      activeIndex: 0,
      ActivityData: [],
      id: window.sessionStorage.getItem('id'),
      para: {
        id: window.sessionStorage.getItem('id')
      },
      rules: {
        need: [
          {
            required: false,
            message: '这一项是必须输入的！'
          }
        ]
      },
      TeamCenterCategory: [
        {
          index: 0,
          item: '我参加的活动',
          // unit: '张',
          // showNum: 2,
          num: 0
        },
        {
          index: 1,
          item: '全部活动',
          // unit: '张',
          // showNum: 5,
          num: 0
        }
      ]
    }
  },
  created () {
    this.load()
    this.load1()
  },
  methods: {
    changeActiveIndex: function (index) {
      this.activeIndex = index
      // this.countOrderShowedNum();
    },
    load () {
      request.get('/PI/user/activity', {
        params: {'id': this.id}
      }).then(res => {
        console.log(res)
        this.ActivityData = res.teams
      })
    },
    exit (row) {
      row['id'] = this.id
      console.log(row)
      request.post('/PI/user/quitActivity', row).then(res => {
        console.log(res)
        if (res.code === 400) {
          this.$message.error('删除失败')
        } else {
          this.$message.success('删除成功')
        }
        this.load()
      })
    }
  }
}
</script>

<style scoped>

</style>
