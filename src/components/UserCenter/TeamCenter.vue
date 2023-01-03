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
        <div class="page-content" v-show="activeIndex==1">
          <el-table
            :data="TeamData1"
            border
            stripe
            style="width: 100%;">
            <el-table-column label="社团id" prop="teamID" sortable width="100px"/>
            <el-table-column label="社团名" prop="teamName"/>
            <el-table-column label="社团宣言" prop="introduction"/>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button class="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row)">
                  <template #reference>
                    <el-button size="small" type="danger">
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
                <el-button class="edit" size="small" type='primary' @click="handleEdit(scope.row)">发布活动</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin: 10px 0; background-color: #00ACC1">
            <el-dialog :visible.sync="dialogFormVisible" title="编辑社团" width="25%">
              <el-form :model="form" :rules="rules" :show-message=true label-width="100px">
                <el-form-item label="社团名称" prop="need">
                  <el-input v-model="form.teamName" style="width: 80%"/>
                </el-form-item>
                <el-form-item label="社团宣言" prop="need">
                  <el-input v-model="form.introduction" style="width: 80%"/>
                </el-form-item>
                <el-form-item label="社长ID" prop="need">
                  <el-input v-model="form.teamLeader" style="width: 80%"/>
                </el-form-item>
              </el-form>
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="save">确认</el-button>
            </el-dialog>
          </div>
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
      form: {},
      dialogFormVisible: false,
      activeIndex: 0,
      TeamData: [],
      TeamData1: [],
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
    this.load1()
  },
  methods: {
    save () {
      request.post('/PI/user/updateTeam', this.form).then(res => {
        console.log(res)
        if (res.code === 400) {
          this.$message.error('编辑失败')
        } else {
          this.$message.success('编辑成功')
        }
        // this.load1()
      })
      this.dialogFormVisible = false
    },
    handleEdit (row) {
      this.form = row
      this.dialogFormVisible = true
    },
    handleDelete (row) {
      request.post('/PI/user/deleteTeam', row).then(res => {
        console.log(res)
        if (res.code === 400) {
          this.$message.error('删除失败')
        } else {
          this.$message.success('删除成功')
        }
        this.load1()
      })
    },
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
    load1 () {
      request.get('/PI/user/team-leader', {
        params: {'id': this.id}
      }).then(res => {
        this.TeamData1 = res.teams
      })
    },
    exit (row) {
      row['id'] = this.id
      console.log(row)
      request.post('/PI/user/quitTeam', row).then(res => {
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
