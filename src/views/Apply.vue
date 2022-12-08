<template>
  <div class="apply">
    <fixed-bar class="welcome">欢迎入驻!</fixed-bar>
    <div class="container">
      <div class="apply-form">
        <div class="page-top">
          <span>社团入驻</span>
        </div>
        <div class="page-content">
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
      </div>
      <div class="side-image">
        <img src="../assets/img/login/login-register-side-image.png">
      </div>
    </div>
    <app-footer/>
  </div>
</template>

<script>
import FixedBar from '@/components/Bars/FixedBar'
import AppFooter from '@/components/MainPage/AppFooter'
import request from '../utils/requests'

export default {
  name: 'Apply',
  components: {
    'fixed-bar': FixedBar,
    'app-footer': AppFooter
  },
  data () {
    return {
      form: {}
    }
  },
  methods: {
    save () {
      request.post('/TE/insertTeam', this.form).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message.success('创建成功')
          this.$router.push('/home')
        } else {
          this.$message.error('创建失败')
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
.apply {
  color: #666;
  height: 440px;
}

.apply .container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  padding-top: 100px;
  /*background-color: red;*/
}

.apply .container .side-image {
  height: 400px;
  width: 400px;
  position: absolute;
  top: 100px;
  right: 40px;
  /*border: 1px solid #eee;*/
}

.apply .container .side-image img {
  height: 400px;
  width: 400px;
}

/* 登录表单页面 */
.apply .container .apply-form {
  /*background-color: #eee;*/
  /*margin: 0px auto;*/
  margin-left: 80px;
  margin-top: 0px;
  margin-bottom: 50px;
  width: 600px;
  height: 500px;
  box-shadow: 0 2px 10px #aaa;
  position: relative;
}

/* 注册页头部 */
.apply .page-top {
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}

/* 注册页内容区域 */
.apply .page-content .box {
  position: absolute;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  /*background-color: #ccc;*/
  background-position: 8px;
  background-size: 20px;
  background-repeat: no-repeat;
  left: 110px;
}

.apply .page-content .box input {
  height: 36px;
  width: 298px;
  border: 1px solid #ccc;
  /*border-left: none;*/
  box-sizing: border-box;
  outline: none;
  padding: 5px 10px;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 14px;
}

.apply .page-content .box textarea {
  font-size: 14px;
  resize: none;
  width: 298px;
}

.apply .page-content .account {
  top: 60px;
}

.apply .page-content .user-name {
  top: 120px;
}

.apply .page-content .password {
  top: 180px;
}

.apply .page-content .password-repeat {
  top: 240px;
}

.upload-demo {
  position: relative;
  left: 110px;
  top: 270px;
  width: 10px;
}

.el-upload--picture-card {
  width: 200px;
}

.apply .page-content .submit {
  top: 400px;
  background-color: #fff;
}

.apply .page-content .submit input {
  width: 299px;
  left: 0px;
  border: none;
  background-color: #12ab34;
  color: #fff;
}

.apply .page-content .submit input:hover {
  cursor: pointer;
  opacity: 0.9;
}

</style>
