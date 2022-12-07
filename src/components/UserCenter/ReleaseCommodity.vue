<template>
    <div class="release commodity">
        <form>
            <label class="box account">
                <input type="text" name="" placeholder="社团名称" v-model="form.teamname">
            </label>
            <label class="box user-name">
                <input type="text" name="" placeholder="社长姓名">
            </label>
            <label class="box password">
                <input type="text" name="" placeholder="社团宣言" v-model="form.introduction">
            </label>
            <label class="box password-repeat">
                <textarea type="password" name="" rows=3 cols=41 placeholder="申请理由"></textarea>
            </label>
            <label class="upload">
                <el-upload
                    class="upload-demo"
                    action="api/upload"
                    :on-success="onSuccess"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :on-exceed="onExceed">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </label>
            <label class="box submit">
                <input @click="save" type="submit" name="" value="提交">
            </label>
        </form>
    </div>
</template>

<script>
import UserCenterTemp from '@/components/UserCenter/UserCenterTemp'

export default {
  name: 'Release',
  components: {
    'user-center-temp': UserCenterTemp
  },
  data () {
    return {
      form: {},
      activeIndex: 0,
      ReleaseCommodityCategory: [
        {
          index: 0,
          item: '发布商品',
          unit: '张',
          showNum: 2,
          num: 2
        },
        {
          index: 1,
          item: '礼品卡',
          unit: '张',
          showNum: 5,
          num: 5
        },
        {
          index: 2,
          item: '红包',
          unit: '个',
          showNum: 3,
          num: 3
        },
        {
          index: 3,
          item: '积分',
          unit: '',
          showNum: 199,
          num: 392
        }
      ],
      afterSaleList: [
        {
          index: 0
        }
      ]
    }
  },
  computed: {
    currentItem: function () {
      return this.ReleaseCommodityCategory[this.activeIndex]
    }
  },
  methods: {
    changeActiveIndex: function (index) {
      this.activeIndex = index
      // this.countOrderShowedNum();
    }
  }
}
</script>

<style scoped>

</style>
