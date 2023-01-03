<template>
    <div class="release-commodity">
      <user-center-temp
        :active-index='activeIndex'
        :item-category="ReleaseCommodityCategory"
        :title="'发布商品'"
        @change-active-index="changeActiveIndex">
        <div v-show="activeIndex==0">
        <div class="releaselist">
        <div class="page-content">
        <form>
            <label class="box commodityName">
                <input type="text" name="" placeholder="商品名称" v-model="form.commodityName">
            </label>
            <label class="box commodityPrice">
                <input type="float" name="" placeholder="商品价格" v-model="form.commodityPrice">
            </label>
            <label class="box commodityDescription">
                <input type="text" name="" placeholder="商品描述" v-model="form.commodityDescription">
            </label>
          <label class="box releaseTeam">
            <input type="text" name="" placeholder="发布社团名称" v-model="form.releaseTeam">
          </label>
            <label class="release-upload">
                <el-upload
                    class="release-upload-demo"
                    action="api/upload"
                    :on-success="onSuccess"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :on-exceed="onExceed">
                    <el-button size="small" type="primary">上传商品图片</el-button>
                </el-upload>
            </label>
            <label class="box submit">
                <input @click="save" type="submit" name="" value="提交">
            </label>
        </form>
        </div>
        </div>
        </div>
        <div v-show="activeIndex==1">
          <el-table
            :data="myCommodity"
            border
            stripe
            style="width: 100%;">
            <el-table-column label="商品id" prop="commodityNumber" sortable width="100px"/>
            <el-table-column label="商品名称" prop="commodityName"/>
            <el-table-column label="商品价格" prop="commodityPrice"/>
            <el-table-column label="商品描述" prop="commodityDescription"/>
            <el-table-column label="卖家姓名" prop="sellerName"/>
            <el-table-column label="所属团队id" prop="teamID"/>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="deleteCommmodity(scope.row)">删除商品</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </user-center-temp>
    </div>
</template>

<script>
import UserCenterTemp from '@/components/UserCenter/UserCenterTemp'
import request from '../../utils/requests'

export default {
  name: 'Release',
  components: {
    'user-center-temp': UserCenterTemp
  },
  data () {
    return {
      form: {},
      activeIndex: 0,
      id: window.sessionStorage.getItem('id'),
      para: {
        id: window.sessionStorage.getItem('id')
      },
      ReleaseCommodityCategory: [
        {
          index: 0,
          item: '发布商品',
          // unit: '张',
          // showNum: 2,
          num: 0
        },
        {
          index: 1,
          item: '我的商品',
          // unit: '张',
          // showNum: 5,
          num: 0
        }
      ],
      myCommodity: []
    }
  },
  computed: {
    currentItem: function () {
      return this.ReleaseCommodityCategory[this.activeIndex]
    }
  },
  created () {
    this.getUserCommodity()
  },
  methods: {
    deleteCommmodity (row) {
      var commodityNumber = row.commodityNumber
      request.get('/CT/deleteCommodity', {
        params: {'commodityNumber': commodityNumber}
      }).then(res => {
        console.log(res)
        this.getUserCommodity()
      })
    },
    getUserCommodity () {
      console.log(this.id)
      request.get('/CT/getUserCommodities', {
        params: {'id': this.id}
      }).then(res => {
        this.myCommodity = res.commodities
      })
      console.log(this.myCommodity)
    },
    changeActiveIndex: function (index) {
      this.activeIndex = index
      // this.countOrderShowedNum();
    },
    save () {
      this.form.leader = this.id
      request.post('/CT/insertCommodity', this.form).then(res => {
        if (res.code === 200) {
          this.$message.success('发布成功')
          this.getUserCommodity()
          // this.$router.push('/home')
        } else {
          this.$message.error('发布失败')
        }
      })
    },
    onExceed (file, fileList) {
      this.$message.error('最多添加一张图片')
    },
    onSuccess (response, file, fileList) {
      this.$message.success('上传成功')
      this.form.picture = file.name
      this.form.leader = window.sessionStorage.getItem('id')
    },
    handleRemove (file, fileList) {
      this.form.picture = ''
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>
.release-commodity .releaselist {
  min-height: 250px;
  /*background: */
}

.release-commodity .page-content .box {
  position: absolute;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  /*background-color: #ccc;*/
  background-position: 8px;
  background-size: 20px;
  background-repeat: no-repeat;
  left: 200px;
}

.release-commodity .page-content .box input {
  height: 36px;
  width: 298px;
  border: 1px solid #ccc;
  /*border-left: none;*/
  box-sizing: border-box;
  outline: none;
  padding: 5px 10px;
  position: relative;
  left: 20px;
  top: 0px;
  font-size: 14px;
}

.release-commodity .page-content .box textarea {
  font-size: 14px;
  resize: none;
  width: 298px;
}

.release-commodity .page-content .box select {
  position: relative;
  font-size: 14px;
  resize: none;
  width: 298px;
  left: 0px;
  top: 0px;
}

.release-commodity .page-content .commodityName {
  top: 160px;
}

.release-commodity .page-content .commodityPrice {
  top: 230px;
}

.release-commodity .page-content .commodityDescription {
  top: 300px;
}

.release-commodity .page-content .releaseTeam {
  position: relative;
  top: 18px;
  left: 480px;
}

/*.release-commodity .page-content .teamChoice {*/
/*  position: relative;*/
/*  top: 10px;*/
/*  left: 500px;*/
/*}*/

.release-upload{
  position: relative;
}

.release-upload-demo {
  position: relative;
  left: 590px;
  top: 52px;
  height: 0px;
  width: 20px;
}

.release-commodity .page-content .submit {
  position: relative;
  top: 123px;
  left: 500px;
  background-color: #fff;
}

.release-commodity .page-content .submit input {
  width: 299px;
  left: 0px;
  border: none;
  background-color: #12ab34;
  color: #fff;
}

.release-commodity .page-content .submit input:hover {
  cursor: pointer;
  opacity: 0.9;
}

</style>
